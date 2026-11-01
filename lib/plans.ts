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
      { label: "模型", value: "GPT-6" },
      { label: "Codex", value: "支持" },
      { label: "并发", value: "有" },
    ],
    models: [{ name: "GPT-6" }, { name: "GPT-6 Astra" }, { name: "GPT-5.6" }],
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
    models: [{ name: "GPT-6" }, { name: "Claude" }, { name: "Gemini" }],
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

export const planFilters: PlanFilter[] = [
  { key: "all", label: "全部", count: 12 },
  { key: "usd", label: "可折算", count: 3 },
  { key: "credits", label: "积分", count: 5 },
  { key: "free", label: "免费", count: 1 },
  { key: "window", label: "按窗口", count: 2 },
  { key: "request", label: "按请求", count: 1 },
];

export interface Update {
  date: string;
  provider: string;
  strong: string;
  text: string;
  href: string;
}

export const updates: Update[] = [
  {
    date: "11.01",
    provider: "OpenCode",
    strong: "OpenCode Go",
    text: "新增 Gemini 4 Argon，模型池到 30+ 个",
    href: "/plans/all/",
  },
  {
    date: "11.01",
    provider: "CommandCode",
    strong: "GOAT",
    text: "保持 $10 / $100 额度，新增 Ling 3.1 Flash",
    href: "/plans/all/",
  },
  {
    date: "10.31",
    provider: "Trae",
    strong: "会员 Lite / Pro / Pro+",
    text: "调整为 ¥49 / ¥99 / ¥239",
    href: "/plans/all/",
  },
  {
    date: "10.28",
    provider: "GLM",
    strong: "GLM Coding",
    text: "额度改为 5h + 周双窗口",
    href: "/plans/all/",
  },
];
