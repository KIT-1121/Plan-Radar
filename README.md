<div align="center">

<h1>Plan-Radar</h1>

<p><strong>AI 套餐比价站</strong></p>

<p>把各家 AI 编程套餐的月费、额度和模型放在一起。</p>

<p><strong>同样的钱，哪家给得更多？</strong></p>

</div>

---

## 数据来源

价格、额度与模型清单来自各套餐官网，最后核对 **2026.11.02**。

- **OpenCode** — [opencode.ai](https://opencode.ai/v2/docs/console/go/)
- **CommandCode** — [commandcode.ai](https://commandcode.ai/pricing)
- **Trae** — [trae.cn](https://www.trae.cn/pricing)
- **GLM Coding** — [docs.z.ai](https://docs.z.ai/devpack/overview)
- **Claude / ChatGPT / Copilot** — [claude.com](https://claude.com/pricing)、[chatgpt.com](https://chatgpt.com/pricing)、[github.com](https://github.com/features/copilot/plans)
- **Agent 会员套餐** — Cursor、Devin、Qoder、Kiro、CodeBuddy、WorkBuddy、Factory、Warp、Augment、Zed、JetBrains AI、Google AI、Grok、Replit 等，全部以各家官网定价页为准；`/plans/all/` 的卡片直接跳转官网。

数据仅作比价参考，最终以官网为准。GLM 的 `US$18` 取自官方 “from $18/month”；Qwen Code 的免费额度待核验。

## AI 科技简报

首页简报分日报、周刊、月刊，日报保证每个自然日至少 3 条。内容维护在
[`lib/briefs.ts`](lib/briefs.ts)。

每天更新一次，流程见 [`scripts/daily-briefs.md`](scripts/daily-briefs.md)：

```powershell
node scripts/fetch-news.mjs --days 3 --per-day 6
```

脚本从 TechCrunch、The Verge、Google 的 AI RSS 抓素材，按北京时间分组输出标题、
时间、链接和摘要，再由编辑步骤翻成中文写回 `lib/briefs.ts`。

发布由 `scripts/deploy.mjs` 完成（整体替换 `/var/www/plan-radar`，保留最近 3 份备份）：

```powershell
pnpm build
node scripts/deploy.mjs
```

