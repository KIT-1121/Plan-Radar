export type Region = "cn" | "global";

export type FilterKind = "usd" | "window" | "request" | "credits" | "free";

export interface PlanModel {
  name: string;
  quota?: string;
}

export interface PlanSpec {
  label: string;
  value: string;
}

export interface Plan {
  id: string;
  region: Region;
  provider: string;
  mark: string;
  name: string;
  tag: string;
  kind: FilterKind;
  price: string;
  priceUnit: string;
  quotaValue: string;
  quotaLabel: string;
  tokenEstimate?: string;
  multiplier?: string;
  ratio?: string;
  ratioFree?: boolean;
  specs: PlanSpec[];
  models: PlanModel[];
  moreModels?: string;
  source: string;
  updated: string;
}

export interface PlanFilter {
  key: "all" | FilterKind;
  label: string;
  count: number;
}

export const globalPlans: Plan[] = [
  {
    id: "opencode-go",
    region: "global",
    provider: "OpenCode",
    mark: "OC",
    name: "OpenCode Go",
    tag: "美元额度",
    kind: "usd",
    price: "$10",
    priceUnit: "/ 月",
    quotaValue: "$100",
    quotaLabel: "DeepSeek V4.1 Flash 额度",
    multiplier: "10×",
    specs: [
      { label: "5h 窗口", value: "$20（20%）" },
      { label: "周窗口", value: "$50（50%）" },
      { label: "月额度", value: "$100（100%）" },
      { label: "请求估算", value: "43K / 5h" },
    ],
    models: [
      { name: "DeepSeek V4.1 Flash", quota: "$100" },
      { name: "GLM-5.3", quota: "$15" },
      { name: "Kimi K3", quota: "$15" },
    ],
    moreModels: "+28 个",
    source: "https://opencode.ai/v2/docs/console/go/",
    updated: "11/01",
  },
  {
    id: "commandcode-goat",
    region: "global",
    provider: "CommandCode",
    mark: "CC",
    name: "GOAT",
    tag: "美元额度",
    kind: "usd",
    price: "$10",
    priceUnit: "/ 月",
    quotaValue: "$100",
    quotaLabel: "DeepSeek V4.1 Flash 额度",
    multiplier: "10×",
    specs: [
      { label: "月额度", value: "$100" },
      { label: "模型", value: "36 个" },
      { label: "请求估算", value: "75K / 月" },
      { label: "API", value: "支持" },
    ],
    models: [
      { name: "DeepSeek V4.1 Flash", quota: "$100" },
      { name: "GLM-5.3 Flash", quota: "$100" },
      { name: "Ling 3.1 Flash", quota: "$100" },
    ],
    moreModels: "+33 个",
    source: "https://commandcode.ai/pricing",
    updated: "11/01",
  },
  {
    id: "commandcode-go",
    region: "global",
    provider: "CommandCode",
    mark: "CC",
    name: "Go",
    tag: "美元额度",
    kind: "usd",
    price: "$1",
    priceUnit: "/ 月",
    quotaValue: "$10",
    quotaLabel: "DeepSeek V4.1 Flash 额度",
    multiplier: "10×",
    specs: [
      { label: "月额度", value: "$10" },
      { label: "模型", value: "28 个" },
      { label: "请求估算", value: "9K / 月" },
      { label: "API", value: "支持" },
    ],
    models: [
      { name: "DeepSeek V4.1 Flash", quota: "$10" },
      { name: "GLM-5.2", quota: "$10" },
      { name: "Qwen 3.8 27B", quota: "$10" },
    ],
    moreModels: "+19 个",
    source: "https://commandcode.ai/pricing",
    updated: "11/01",
  },
  {
    id: "claude-max",
    region: "global",
    provider: "Anthropic",
    mark: "AN",
    name: "Claude Max 5×",
    tag: "按窗口",
    kind: "window",
    price: "$100",
    priceUnit: "/ 月",
    quotaValue: "5× Pro",
    quotaLabel: "额度",
    ratio: "不可折算",
    specs: [
      { label: "5h 窗口", value: "5× Pro" },
      { label: "周窗口", value: "有" },
      { label: "模型", value: "6 个" },
      { label: "并发", value: "有" },
    ],
    models: [{ name: "Opus 5.5" }, { name: "Sonnet 5.5" }, { name: "Haiku 5.5" }],
    source: "https://claude.com/pricing",
    updated: "11/01",
  },
  {
    id: "chatgpt-plus",
    region: "global",
    provider: "OpenAI",
    mark: "OA",
    name: "ChatGPT Plus",
    tag: "按窗口",
    kind: "window",
    price: "$20",
    priceUnit: "/ 月",
    quotaValue: "Codex",
    quotaLabel: "额度",
    ratio: "不可折算",
    specs: [
      { label: "5h 窗口", value: "有" },
      { label: "模型", value: "GPT-6.1 Sol" },
      { label: "Codex", value: "支持" },
      { label: "并发", value: "有" },
    ],
    models: [
      { name: "GPT-6.1 Sol" },
      { name: "GPT-6 Astra" },
      { name: "GPT-5.6" },
    ],
    source: "https://chatgpt.com/pricing",
    updated: "11/01",
  },
  {
    id: "copilot-pro-plus",
    region: "global",
    provider: "GitHub",
    mark: "GH",
    name: "Copilot Pro+",
    tag: "按请求",
    kind: "request",
    price: "$39",
    priceUnit: "/ 月",
    quotaValue: "1,800",
    quotaLabel: "高级请求 / 月",
    ratio: "不可折算",
    specs: [
      { label: "请求 / 月", value: "1,800" },
      { label: "模型", value: "多模型" },
      { label: "IDE", value: "集成" },
      { label: "超额", value: "加购" },
    ],
    models: [{ name: "GPT-6.1 Sol" }, { name: "Claude" }, { name: "Gemini" }],
    source: "https://github.com/features/copilot/plans",
    updated: "11/01",
  },
];

export const cnPlans: Plan[] = [
  {
    id: "glm-lite",
    region: "cn",
    provider: "智谱",
    mark: "GL",
    name: "GLM Coding Lite",
    tag: "5h 窗口",
    kind: "credits",
    price: "US$18",
    priceUnit: "起 / 月",
    quotaValue: "2,000",
    quotaLabel: "积分 / 5h",
    tokenEstimate: "≈ 200 万 tokens",
    ratio: "111 积分/$",
    specs: [
      { label: "5h 额度", value: "2,000 积分" },
      { label: "周额度", value: "10,000 积分" },
      { label: "模型", value: "GLM-5.3 系" },
      { label: "积分倍率", value: "6.9 / 24" },
    ],
    models: [{ name: "GLM-5.3" }, { name: "GLM-5.3-Flash" }],
    source: "https://docs.z.ai/devpack/overview",
    updated: "11/01",
  },
  {
    id: "trae-lite",
    region: "cn",
    provider: "字节跳动",
    mark: "TR",
    name: "Trae 会员 Lite",
    tag: "积分",
    kind: "credits",
    price: "¥49",
    priceUnit: "/ 月",
    quotaValue: "2,000",
    quotaLabel: "积分 / 月",
    tokenEstimate: "≈ 200 万 tokens",
    ratio: "40.8 积分/元",
    specs: [
      { label: "积分 / 月", value: "2,000" },
      { label: "并发", value: "2 个" },
      { label: "模型折扣", value: "5 折" },
      { label: "签到", value: "+3,000" },
    ],
    models: [{ name: "Seed-2.1" }, { name: "GLM" }, { name: "DeepSeek V4.1" }],
    source: "https://www.trae.cn/pricing",
    updated: "11/01",
  },
  {
    id: "trae-pro",
    region: "cn",
    provider: "字节跳动",
    mark: "TR",
    name: "Trae 会员 Pro",
    tag: "积分",
    kind: "credits",
    price: "¥99",
    priceUnit: "/ 月",
    quotaValue: "4,000",
    quotaLabel: "积分 / 月",
    tokenEstimate: "≈ 400 万 tokens",
    ratio: "40.4 积分/元",
    specs: [
      { label: "积分 / 月", value: "4,000" },
      { label: "并发", value: "10 个" },
      { label: "模型折扣", value: "5 折" },
      { label: "签到", value: "+3,000" },
    ],
    models: [{ name: "Seed-2.1" }, { name: "GLM" }, { name: "DeepSeek V4.1" }],
    source: "https://www.trae.cn/pricing",
    updated: "11/01",
  },
  {
    id: "trae-pro-plus",
    region: "cn",
    provider: "字节跳动",
    mark: "TR",
    name: "Trae 会员 Pro+",
    tag: "积分",
    kind: "credits",
    price: "¥239",
    priceUnit: "/ 月",
    quotaValue: "12,000",
    quotaLabel: "积分 / 月",
    tokenEstimate: "≈ 1,200 万 tokens",
    ratio: "50.2 积分/元",
    specs: [
      { label: "积分 / 月", value: "12,000" },
      { label: "并发", value: "10 个" },
      { label: "模型折扣", value: "5 折" },
      { label: "签到", value: "+3,000" },
    ],
    models: [{ name: "Seed-2.1" }, { name: "GLM" }, { name: "DeepSeek V4.1" }],
    source: "https://www.trae.cn/pricing",
    updated: "11/01",
  },
  {
    id: "trae-ultra",
    region: "cn",
    provider: "字节跳动",
    mark: "TR",
    name: "Trae 会员 Ultra",
    tag: "积分",
    kind: "credits",
    price: "¥699",
    priceUnit: "/ 月",
    quotaValue: "40,000",
    quotaLabel: "积分 / 月",
    tokenEstimate: "≈ 4,000 万 tokens",
    ratio: "57.2 积分/元",
    specs: [
      { label: "积分 / 月", value: "40,000" },
      { label: "并发", value: "20 个" },
      { label: "模型折扣", value: "5 折" },
      { label: "签到", value: "+3,000" },
    ],
    models: [{ name: "Seed-2.1" }, { name: "GLM" }, { name: "DeepSeek V4.1" }],
    source: "https://www.trae.cn/pricing",
    updated: "11/01",
  },
  {
    id: "qwen-code",
    region: "cn",
    provider: "阿里",
    mark: "QW",
    name: "Qwen Code",
    tag: "免费",
    kind: "free",
    price: "¥0",
    priceUnit: "/ 月",
    quotaValue: "2,000",
    quotaLabel: "请求 / 天",
    ratio: "免费",
    ratioFree: true,
    specs: [
      { label: "请求 / 天", value: "2,000" },
      { label: "模型", value: "Qwen3.8" },
      { label: "上下文", value: "256K" },
      { label: "价格", value: "免费" },
    ],
    models: [{ name: "Qwen3.8" }],
    source: "https://qwen.ai/",
    updated: "11/01",
  },
];

export const allPlans: Plan[] = [...globalPlans, ...cnPlans];

export function getPlanById(id: string) {
  return allPlans.find((plan) => plan.id === id);
}

export const planFilters: PlanFilter[] = [
  { key: "all", label: "全部", count: 12 },
  { key: "usd", label: "可折算", count: 3 },
  { key: "credits", label: "积分", count: 5 },
  { key: "free", label: "免费", count: 1 },
  { key: "window", label: "按窗口", count: 2 },
  { key: "request", label: "按请求", count: 1 },
];

export type UpdateKind = "plan" | "api";

export interface Update {
  id: string;
  date: string;
  kind: UpdateKind;
  provider: string;
  strong: string;
  text: string;
  summary: string;
  details: string[];
  href: string;
  related: string;
  source: string;
}

export const updates: Update[] = [
  {
    id: "opencode-go-gemini",
    date: "11.01",
    kind: "plan",
    provider: "OpenCode",
    strong: "OpenCode Go",
    text: "新增 Gemini 4 Argon，模型池到 30+ 个",
    summary:
      "OpenCode Go 仍是 $10/月、含 $100 DeepSeek V4.1 Flash 额度，模型池扩到 30+ 个。",
    details: [
      "套餐：$10/月，含 $100 DeepSeek V4.1 Flash 额度。",
      "变化：新增 Gemini 4 Argon；模型池到 30+ 个。",
      "倍率：10×（$100 ÷ $10）。",
    ],
    href: "/updates/#opencode-go-gemini",
    related: "/plans/deepseek-v4-1-flash/",
    source: "https://opencode.ai/v2/docs/console/go/",
  },
  {
    id: "commandcode-goat-ling",
    date: "11.01",
    kind: "plan",
    provider: "CommandCode",
    strong: "GOAT",
    text: "保持 $10 / $100 额度，新增 Ling 3.1 Flash",
    summary:
      "GOAT 维持 $10/月、$100 额度，模型增加到 36 个，新增 Ling 3.1 Flash。",
    details: [
      "套餐：$10/月，$100 额度。",
      "模型：36 个；新增 Ling 3.1 Flash。",
      "请求估算：75K / 月；支持 API。",
    ],
    href: "/updates/#commandcode-goat-ling",
    related: "/plans/ling-3-1-flash/",
    source: "https://commandcode.ai/pricing",
  },
  {
    id: "trae-pricing-1031",
    date: "10.31",
    kind: "plan",
    provider: "Trae",
    strong: "会员 Lite / Pro / Pro+",
    text: "调整为 ¥49 / ¥99 / ¥239",
    summary:
      "Trae 会员三档价格调整，积分额度按档位分别是 2,000 / 4,000 / 12,000。",
    details: [
      "Lite：¥49/月，2,000 积分/月。",
      "Pro：¥99/月，4,000 积分/月。",
      "Pro+：¥239/月，12,000 积分/月。",
      "Ultra 仍为 ¥699/月，40,000 积分/月。",
    ],
    href: "/updates/#trae-pricing-1031",
    related: "/plans/seed-2-1/",
    source: "https://www.trae.cn/pricing",
  },
  {
    id: "glm-window-1028",
    date: "10.28",
    kind: "plan",
    provider: "GLM",
    strong: "GLM Coding",
    text: "额度改为 5h + 周双窗口",
    summary:
      "GLM Coding Lite 起价 US$18/月，额度拆成 5 小时窗口和周窗口。",
    details: [
      "Lite：US$18/月起。",
      "额度：2,000 积分/5h，10,000 积分/周。",
      "模型：GLM-5.3 / GLM-5.3-Flash。",
    ],
    href: "/updates/#glm-window-1028",
    related: "/plans/glm-5-3/",
    source: "https://docs.z.ai/devpack/overview",
  },
  {
    id: "api-deepseek-price-1101",
    date: "11.01",
    kind: "api",
    provider: "OpenCode Console",
    strong: "DeepSeek V4.1 Flash",
    text: "API 价目核对：$0.30 / $1.20，缓存读 $0.006",
    summary:
      "按量价与缓存读价格完成核对，OpenCode Console 仍按 token 计费。",
    details: [
      "输入：$0.30 / 1M tokens。",
      "输出：$1.20 / 1M tokens。",
      "缓存读：$0.006 / 1M tokens。",
      "渠道：OpenCode Console 按量计费。",
    ],
    href: "/updates/#api-deepseek-price-1101",
    related: "/api/deepseek-v4-1-flash/",
    source: "https://opencode.ai/v2/docs/console/models/",
  },
  {
    id: "api-claude-price-1101",
    date: "11.01",
    kind: "api",
    provider: "OpenCode Console",
    strong: "Claude Sonnet 5.5",
    text: "API 价目核对：$2.00 / $10.00，缓存读 $0.20",
    summary: "按量价与缓存读价格完成核对。",
    details: [
      "输入：$2.00 / 1M tokens。",
      "输出：$10.00 / 1M tokens。",
      "缓存读：$0.20 / 1M tokens。",
    ],
    href: "/updates/#api-claude-price-1101",
    related: "/api/claude-sonnet-5-5/",
    source: "https://opencode.ai/v2/docs/console/models/",
  },
  {
    id: "api-gpt-price-1101",
    date: "11.01",
    kind: "api",
    provider: "OpenCode Console",
    strong: "GPT-6.1 Sol",
    text: "API 价目核对：$2.00 / $10.00，缓存读 $0.20",
    summary: "按量价与缓存读价格完成核对。",
    details: [
      "输入：$2.00 / 1M tokens。",
      "输出：$10.00 / 1M tokens。",
      "缓存读：$0.20 / 1M tokens。",
    ],
    href: "/updates/#api-gpt-price-1101",
    related: "/api/gpt-6/",
    source: "https://opencode.ai/v2/docs/console/models/",
  },
  {
    id: "api-glm-price-1101",
    date: "11.01",
    kind: "api",
    provider: "OpenCode Console",
    strong: "GLM-5.3",
    text: "API 价目核对：$1.40 / $4.40，缓存读 $0.26",
    summary: "按量价与缓存读价格完成核对。",
    details: [
      "输入：$1.40 / 1M tokens。",
      "输出：$4.40 / 1M tokens。",
      "缓存读：$0.26 / 1M tokens。",
    ],
    href: "/updates/#api-glm-price-1101",
    related: "/api/glm-5-3/",
    source: "https://opencode.ai/v2/docs/console/models/",
  },
];
