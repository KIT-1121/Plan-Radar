#!/usr/bin/env node
/**
 * 套餐 / API / 模型单价快照与变更对比。
 *
 *   node scripts/prices-snapshot.mjs           # 打印当前快照，并与基线对比
 *   node scripts/prices-snapshot.mjs --write   # 把当前快照写成新基线
 *   node scripts/prices-snapshot.mjs --json    # 输出 JSON
 *
 * 快照只读 lib/*.ts 里的价格字段，不联网，不做判断；
 * 价格是否真的变了，仍以各官网为准。
 */

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const baselinePath = path.join(root, "data", "prices-baseline.json");
const args = process.argv.slice(2);
const asJson = args.includes("--json");
const write = args.includes("--write");

function read(file) {
  return fs.readFileSync(path.join(root, "lib", file), "utf8");
}

/** 从 plans.ts 里抽出 id / name / price / priceUnit / quotaValue / updated。 */
function readPlans() {
  const text = read("plans.ts");
  const out = [];
  const re =
    /id: "([^"]+)",[\s\S]{0,500}?name: "([^"]+)",[\s\S]{0,400}?price: "([^"]+)",\s*priceUnit: "([^"]+)",[\s\S]{0,200}?quotaValue: "([^"]*)"/g;
  let match;
  while ((match = re.exec(text))) {
    out.push({
      id: match[1],
      name: match[2],
      price: match[3],
      unit: match[4],
      quota: match[5],
    });
  }
  return out;
}

/** 从 api.ts 里抽出渠道价格。 */
function readChannels() {
  const text = read("api.ts");
  const out = [];
  const re =
    /id: "([^"]+)",\s*name: "([^"]+)",[\s\S]{0,400}?price: "([^"]+)",\s*priceNote: "([^"]*)"/g;
  let match;
  while ((match = re.exec(text))) {
    out.push({
      id: match[1],
      name: match[2],
      price: match[3],
      note: match[4],
    });
  }
  return out;
}

/** 从 api.ts 与 models-extra.ts 里抽出模型 token 单价。 */
function readTokenPrices() {
  const out = [];
  const pattern =
    /slug: "([^"]+)",\s*model: "([^"]+)",\s*input: "([^"]+)",\s*output: "([^"]+)",\s*cached: "([^"]+)"/g;
  const extraPattern =
    /slug: "([^"]+)",\s*name: "([^"]+)",[\s\S]{0,400}?price: \["([^"]+)", "([^"]+)", "([^"]+)"\]/g;

  let match;
  const apiText = read("api.ts");
  while ((match = pattern.exec(apiText))) {
    out.push({
      slug: match[1],
      name: match[2],
      input: match[3],
      output: match[4],
      cached: match[5],
    });
  }

  const extraText = read("models-extra.ts");
  while ((match = extraPattern.exec(extraText))) {
    out.push({
      slug: match[1],
      name: match[2],
      input: match[3],
      output: match[4],
      cached: match[5],
    });
  }

  return out;
}

function buildSnapshot() {
  const plans = readPlans();
  const channels = readChannels();
  const models = readTokenPrices();
  return {
    generatedAt: new Date().toISOString(),
    counts: {
      plans: plans.length,
      channels: channels.length,
      models: models.length,
    },
    plans,
    channels,
    models,
  };
}

function indexById(list, key = "id") {
  const map = new Map();
  for (const item of list) map.set(item[key], item);
  return map;
}

function compareSection(name, beforeList, afterList, key) {
  const out = [];
  const before = indexById(beforeList, key);
  const after = indexById(afterList, key);

  for (const [id, item] of after) {
    const old = before.get(id);
    if (!old) {
      out.push({ type: "added", section: name, id, name: item.name });
      continue;
    }
    for (const field of Object.keys(item)) {
      if (field === key || field === "name") continue;
      if (String(old[field]) === String(item[field])) continue;
      out.push({
        type: "changed",
        section: name,
        id,
        name: item.name,
        field,
        from: old[field],
        to: item[field],
      });
    }
  }

  for (const [id, item] of before) {
    if (!after.has(id)) {
      out.push({ type: "removed", section: name, id, name: item.name });
    }
  }

  return out;
}

function main() {
  const snapshot = buildSnapshot();

  let before = null;
  if (fs.existsSync(baselinePath)) {
    before = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
  }

  const changes = before
    ? [
        ...compareSection("套餐", before.plans ?? [], snapshot.plans, "id"),
        ...compareSection("API 渠道", before.channels ?? [], snapshot.channels, "id"),
        ...compareSection("模型单价", before.models ?? [], snapshot.models, "slug"),
      ]
    : [];

  if (write) {
    fs.mkdirSync(path.dirname(baselinePath), { recursive: true });
    fs.writeFileSync(
      baselinePath,
      JSON.stringify(snapshot, null, 2) + "\n",
      "utf8",
    );
  }

  if (asJson) {
    console.log(JSON.stringify({ snapshot, changes }, null, 2));
    return;
  }

  console.log(`套餐 ${snapshot.counts.plans} 个`);
  console.log(`API 渠道 ${snapshot.counts.channels} 个`);
  console.log(`模型单价 ${snapshot.counts.models} 个`);

  if (!before) {
    console.log("\n没有基线文件，先运行：node scripts/prices-snapshot.mjs --write");
    return;
  }

  if (!changes.length) {
    console.log("\n与基线相比：没有价格字段变化。");
    return;
  }

  console.log(`\n与基线相比：${changes.length} 处变化`);
  for (const change of changes) {
    if (change.type === "changed") {
      console.log(
        `- [${change.section}] ${change.name} ${change.field}: ${change.from} → ${change.to}`,
      );
    } else if (change.type === "added") {
      console.log(`- [${change.section}] 新增 ${change.name}`);
    } else {
      console.log(`- [${change.section}] 移除 ${change.name}`);
    }
  }
}

main();
