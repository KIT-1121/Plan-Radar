#!/usr/bin/env node
/**
 * 安装 / 更新投票 API：
 *   node scripts/deploy-vote.mjs
 *
 * 需要与 deploy.mjs 相同的 SSH key（默认 ~/.ssh/plan_radar_deploy）。
 * 首次运行会创建 planradar 用户、SQLite 目录、systemd 服务，并把
 * /vote-api/ 反向代理片段 include 进 nginx 站点配置。
 */

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";

const repo = path.resolve(import.meta.dirname, "..");
const host = process.env.PLAN_RADAR_HOST ?? "root@47.80.11.249";
const key = process.env.PLAN_RADAR_KEY ?? path.join(homedir(), ".ssh", "plan_radar_deploy");
const voteDir = path.join(repo, "server", "vote");

for (const file of ["app.py", "plan-radar-vote.service", "install.sh"]) {
  if (!existsSync(path.join(voteDir, file))) {
    console.error(`缺少 ${file}`);
    process.exit(1);
  }
}
if (!existsSync(key)) {
  console.error(`找不到部署密钥：${key}`);
  process.exit(1);
}

const sshOptions = [
  "-i",
  key,
  "-o",
  "BatchMode=yes",
  "-o",
  "StrictHostKeyChecking=accept-new",
  "-o",
  "ConnectTimeout=20",
];

function run(command, args) {
  execFileSync(command, args, { stdio: "inherit" });
}

run("scp", [
  ...sshOptions,
  path.join(voteDir, "app.py"),
  path.join(voteDir, "plan-radar-vote.service"),
  path.join(voteDir, "install.sh"),
  `${host}:/tmp/`,
]);

run("ssh", [
  ...sshOptions,
  host,
  "mv /tmp/app.py /tmp/plan-radar-vote-app.py; mv /tmp/plan-radar-vote.service /tmp/plan-radar-vote.service; mv /tmp/install.sh /tmp/plan-radar-vote-install.sh; bash /tmp/plan-radar-vote-install.sh /tmp/plan-radar-vote-app.py /tmp/plan-radar-vote.service",
]);

console.log("投票 API 已部署：https://47.80.11.249/vote-api/health");
