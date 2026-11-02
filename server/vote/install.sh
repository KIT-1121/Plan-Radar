#!/usr/bin/env bash
set -euo pipefail

APP_SRC="${1:-/tmp/plan-radar-vote-app.py}"
UNIT_SRC="${2:-/tmp/plan-radar-vote.service}"
APP_DIR=/opt/plan-radar-vote
DATA_DIR=/var/lib/plan-radar-vote
ENV_FILE=/etc/plan-radar-vote.env
SNIPPET=/etc/nginx/snippets/plan-radar-vote.conf
SITE=/etc/nginx/sites-available/plan-radar

if ! id -u planradar >/dev/null 2>&1; then
  useradd --system --no-create-home --shell /usr/sbin/nologin planradar
fi

install -d -m 0755 "$APP_DIR"
install -d -o planradar -g planradar -m 0750 "$DATA_DIR"
install -m 0644 "$APP_SRC" "$APP_DIR/app.py"

if [ ! -f "$ENV_FILE" ]; then
  SALT="$(openssl rand -hex 24)"
  umask 077
  cat > "$ENV_FILE" <<EOF
VOTE_SALT=$SALT
VOTE_DB=$DATA_DIR/votes.sqlite3
VOTE_HOST=127.0.0.1
VOTE_PORT=8787
EOF
  chmod 600 "$ENV_FILE"
fi

install -m 0644 "$UNIT_SRC" /etc/systemd/system/plan-radar-vote.service
systemctl daemon-reload
systemctl enable plan-radar-vote >/dev/null 2>&1 || true
systemctl restart plan-radar-vote

mkdir -p /etc/nginx/snippets
cat > "$SNIPPET" <<'EOF'
location ^~ /vote-api/ {
    proxy_pass http://127.0.0.1:8787/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 15s;
    proxy_connect_timeout 5s;
}
EOF

if [ -f "$SITE" ]; then
  if ! grep -q "plan-radar-vote.conf" "$SITE"; then
    cp -L "$SITE" "/root/plan-radar-nginx.bak-$(date +%Y%m%d%H%M%S)"
    python3 - "$SITE" <<'PY'
import sys

path = sys.argv[1]
text = open(path, encoding="utf-8").read()
needle = "server {"
index = text.find(needle)
if index == -1:
    raise SystemExit("server block not found")
insert_at = index + len(needle)
text = (
    text[:insert_at]
    + "\n    include /etc/nginx/snippets/plan-radar-vote.conf;"
    + text[insert_at:]
)
open(path, "w", encoding="utf-8").write(text)
PY
  fi
else
  echo "nginx site config not found: $SITE" >&2
  exit 1
fi

nginx -t
systemctl reload nginx
sleep 1
curl -fsS http://127.0.0.1:8787/health
echo "vote api installed"
