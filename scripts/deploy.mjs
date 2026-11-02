#!/usr/bin/env node
/**
 * 把 `out/` 静态产物部署到 Plan-Radar 服务器。
 *
 * 前置条件：
 *   - 已运行 `pnpm build`
 *   - 本机 `~/.ssh/plan_radar_deploy` 能免密登录 root@47.80.11.249
 *
 *   node scripts/deploy.mjs
 *
 * 可用环境变量覆盖：PLAN_RADAR_HOST / PLAN_RADAR_KEY / PLAN_RADAR_ROOT。
 * 服务器保留最近 3 份 `plan-radar.bak-*` 备份。
 */

import { execFileSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import path from "node:path";

const repo = path.resolve(import.meta.dirname, "..");
const outDir = path.join(repo, "out");
const host = process.env.PLAN_RADAR_HOST ?? "root@47.80.11.249";
const key = process.env.PLAN_RADAR_KEY ?? path.join(homedir(), ".ssh", "plan_radar_deploy");
const remoteRoot = process.env.PLAN_RADAR_ROOT ?? "/var/www/plan-radar";

if (!existsSync(path.join(outDir, "index.html"))) {
  console.error("out/index.html 不存在，先运行 pnpm build");
  process.exit(1);
}
if (!existsSync(key)) {
  console.error(`找不到部署密钥：${key}`);
  process.exit(1);
}

const stamp = new Date()
  .toLocaleString("sv-SE", { timeZone: "Asia/Shanghai" })
  .replace(/[-: ]/g, "")
  .slice(0, 12);
const remoteTar = `/tmp/plan-radar-${stamp}.tar.gz`;
const localTar = path.join(tmpdir(), `plan-radar-${stamp}.tar.gz`);

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

try {
  console.log(`打包 ${outDir}`);
  run("tar", ["-czf", localTar, "-C", outDir, "."]);

  console.log(`上传到 ${host}:${remoteTar}`);
  run("scp", [...sshOptions, localTar, `${host}:${remoteTar}`]);

  const remote = [
    "set -e",
    `rm -rf ${remoteRoot}.new`,
    `mkdir -p ${remoteRoot}.new`,
    `tar -xzf ${remoteTar} -C ${remoteRoot}.new`,
    `test -f ${remoteRoot}.new/index.html`,
    `mv ${remoteRoot} ${remoteRoot}.bak-${stamp}`,
    `mv ${remoteRoot}.new ${remoteRoot}`,
    `chown -R root:root ${remoteRoot}`,
    `rm -f ${remoteTar}`,
    `ls -dt ${remoteRoot}.bak-* 2>/dev/null | tail -n +4 | xargs -r rm -rf`,
    `echo "deployed ${stamp}"`,
  ].join("; ");

  run("ssh", [...sshOptions, host, remote]);
  console.log("完成：http://47.80.11.249/");
} finally {
  rmSync(localTar, { force: true });
}
