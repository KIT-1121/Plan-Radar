#!/usr/bin/env python3
"""Plan-Radar vote API.

Standard-library only: HTTP server + SQLite. Designed to sit behind nginx at
/vote-api/ and listen on 127.0.0.1.

One vote per IP hash, per dimension, per calendar day (Asia/Shanghai).
"""

from __future__ import annotations

import hashlib
import json
import os
import re
import sqlite3
from datetime import date, datetime, timedelta
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse
from zoneinfo import ZoneInfo

DB_PATH = os.environ.get("VOTE_DB", "/var/lib/plan-radar-vote/votes.sqlite3")
SALT = os.environ.get("VOTE_SALT", "dev-only-salt")
ALLOW_ORIGIN = os.environ.get("VOTE_ALLOW_ORIGIN", "")
HOST = os.environ.get("VOTE_HOST", "127.0.0.1")
PORT = int(os.environ.get("VOTE_PORT", "8787"))
TZ = ZoneInfo("Asia/Shanghai")

DIMENSIONS = {
    "model_overall",
    "model_code",
    "model_context",
    "model_multimodal",
    "model_chinese",
    "plan_recommend",
    "api_stable",
}
PERIODS = {"daily", "weekly", "monthly", "quarterly", "yearly"}
TARGET_RE = re.compile(r"^[a-z0-9][a-z0-9-]{0,63}$")


def period_start(period: str, today: date) -> date:
    if period == "daily":
        return today
    if period == "weekly":
        return today - timedelta(days=today.weekday())
    if period == "monthly":
        return today.replace(day=1)
    if period == "quarterly":
        month = 3 * ((today.month - 1) // 3) + 1
        return date(today.year, month, 1)
    return date(today.year, 1, 1)


def db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH, timeout=5)
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS votes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            dimension TEXT NOT NULL,
            target TEXT NOT NULL,
            ip_hash TEXT NOT NULL,
            vote_date TEXT NOT NULL,
            created_at TEXT NOT NULL,
            UNIQUE (ip_hash, dimension, vote_date)
        )
        """
    )
    conn.execute(
        "CREATE INDEX IF NOT EXISTS idx_votes_rank ON votes (dimension, vote_date)"
    )
    return conn


class Handler(BaseHTTPRequestHandler):
    server_version = "PlanRadarVote/1.0"

    def log_message(self, fmt, *args):  # keep journald quiet but useful
        print("%s - %s" % (self.address_string(), fmt % args), flush=True)

    def send_json(self, status: int, payload: dict):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        if ALLOW_ORIGIN:
            self.send_header("Access-Control-Allow-Origin", ALLOW_ORIGIN)
            self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(body)

    def client_ip(self) -> str:
        forwarded = self.headers.get("X-Real-IP")
        if not forwarded:
            chain = self.headers.get("X-Forwarded-For", "")
            forwarded = chain.split(",")[0].strip() if chain else ""
        return forwarded or self.client_address[0]

    def ip_hash(self) -> str:
        raw = f"{SALT}:{self.client_ip()}".encode("utf-8")
        return hashlib.sha256(raw).hexdigest()[:32]

    def do_OPTIONS(self):
        if ALLOW_ORIGIN:
            self.send_response(204)
            self.send_header("Access-Control-Allow-Origin", ALLOW_ORIGIN)
            self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            self.end_headers()
        else:
            self.send_response(405)
            self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        query = parse_qs(parsed.query)
        if parsed.path == "/health":
            self.send_json(200, {"ok": True})
            return
        if parsed.path == "/rankings":
            self.handle_rankings(query)
            return
        if parsed.path == "/status":
            self.handle_status(query)
            return
        self.send_json(404, {"ok": False, "error": "not_found"})

    def handle_rankings(self, query: dict):
        dimension = (query.get("dimension") or [""])[0]
        period = (query.get("period") or ["monthly"])[0]
        if dimension not in DIMENSIONS or period not in PERIODS:
            self.send_json(400, {"ok": False, "error": "bad_params"})
            return

        today = datetime.now(TZ).date()
        start = period_start(period, today).isoformat()
        conn = db()
        try:
            rows = conn.execute(
                """
                SELECT target, COUNT(*) AS votes
                FROM votes
                WHERE dimension = ? AND vote_date >= ?
                GROUP BY target
                ORDER BY votes DESC, target ASC
                LIMIT 100
                """,
                (dimension, start),
            ).fetchall()
        finally:
            conn.close()

        self.send_json(
            200,
            {
                "ok": True,
                "dimension": dimension,
                "period": period,
                "period_start": start,
                "items": [{"target": target, "votes": count} for target, count in rows],
            },
        )

    def handle_status(self, query: dict):
        dimension = (query.get("dimension") or [""])[0]
        if dimension not in DIMENSIONS:
            self.send_json(400, {"ok": False, "error": "bad_params"})
            return

        today = datetime.now(TZ).date().isoformat()
        conn = db()
        try:
            row = conn.execute(
                "SELECT target FROM votes WHERE ip_hash = ? AND dimension = ? AND vote_date = ?",
                (self.ip_hash(), dimension, today),
            ).fetchone()
        finally:
            conn.close()

        self.send_json(
            200,
            {
                "ok": True,
                "dimension": dimension,
                "voted": row is not None,
                "target": row[0] if row else None,
                "date": today,
            },
        )

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path != "/vote":
            self.send_json(404, {"ok": False, "error": "not_found"})
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            length = 0
        if length <= 0 or length > 4096:
            self.send_json(400, {"ok": False, "error": "bad_body"})
            return

        try:
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError):
            self.send_json(400, {"ok": False, "error": "bad_json"})
            return

        dimension = str(payload.get("dimension", ""))
        target = str(payload.get("target", ""))
        if dimension not in DIMENSIONS or not TARGET_RE.match(target):
            self.send_json(400, {"ok": False, "error": "bad_params"})
            return

        today = datetime.now(TZ).date().isoformat()
        now = datetime.now(TZ).isoformat(timespec="seconds")
        conn = db()
        try:
            conn.execute(
                "INSERT INTO votes (dimension, target, ip_hash, vote_date, created_at) VALUES (?, ?, ?, ?, ?)",
                (dimension, target, self.ip_hash(), today, now),
            )
            conn.commit()
        except sqlite3.IntegrityError:
            self.send_json(
                409,
                {
                    "ok": False,
                    "error": "already_voted",
                    "message": "今天已经投过这一项了，明天再来。",
                },
            )
            return
        finally:
            conn.close()

        self.send_json(200, {"ok": True, "dimension": dimension, "target": target, "date": today})


def main():
    data_dir = os.path.dirname(DB_PATH)
    if data_dir:
        os.makedirs(data_dir, exist_ok=True)
    conn = db()
    conn.close()
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"vote api listening on http://{HOST}:{PORT}, db={DB_PATH}", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
