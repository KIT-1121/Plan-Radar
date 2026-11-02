export interface ApiSpec {
  label: string;
  value: string;
}

export interface ApiChannel {
  id: string;
  name: string;
  provider: string;
  mark: string;
  price: string;
  priceNote: string;
  billing: string;
  models: string;
  markup: string;
  specs: ApiSpec[];
  source: string;
  updated: string;
  coversAll?: boolean;
  modelSlugs?: string[];
}

export const apiChannels: ApiChannel[] = [
  {
    id: "opencode-console",
    name: "OpenCode Console",
    provider: "OpenCode",
    mark: "OC",
    price: "按量",
    priceNote: "$0.10 / $0.50 起",
    billing: "按 token",
    models: "80+ 个模型",
    markup: "官方价",
    specs: [
      { label: "模型", value: "80+ 个" },
      { label: "计费", value: "按 token" },
      { label: "加价", value: "无" },
    ],
    source: "https://opencode.ai/v2/docs/console/models/",
    updated: "11/02",
    coversAll: true,
  },
  {
    id: "commandcode-provider",
    name: "CommandCode Provider",
    provider: "CommandCode",
    mark: "CC",
    price: "$15 / 月",
    priceNote: "$0.10 / $0.40 起",
    billing: "按 token",
    models: "39 个模型",
    markup: "官方价",
    specs: [
      { label: "模型", value: "39 个" },
      { label: "计费", value: "按 token" },
      { label: "加价", value: "无" },
    ],
    source: "https://commandcode.ai/pricing",
    updated: "11/02",
    coversAll: true,
  },
  {
    id: "deepseek-api",
    name: "DeepSeek 官方 API",
    provider: "DeepSeek",
    mark: "DS",
    price: "按量",
    priceNote: "$0.30 / $1.20",
    billing: "按 token",
    models: "DeepSeek V4.1 Flash",
    markup: "官方价",
    specs: [
      { label: "模型", value: "V4.1 Flash" },
      { label: "计费", value: "按 token" },
      { label: "加价", value: "无" },
    ],
    source: "https://platform.deepseek.com/",
    updated: "11/01",
    modelSlugs: ["deepseek-v4-1-flash"],
  },
];

export interface TokenPrice {
  slug: string;
  model: string;
  input: string;
  output: string;
  cached: string;
  note?: string;
}

export const tokenPrices: TokenPrice[] = [
  {
    slug: "gpt-6",
    model: "GPT-6.1 Sol",
    input: "$2.00",
    output: "$10.00",
    cached: "$0.10",
  },
  {
    slug: "gpt-6-astra",
    model: "GPT-6 Astra",
    input: "$10.00",
    output: "$50.00",
    cached: "$1.00",
  },
  {
    slug: "gpt-5-6",
    model: "GPT-5.6",
    input: "$4.00",
    output: "$20.00",
    cached: "$0.40",
    note: "gpt-5.6-sol",
  },
  {
    slug: "claude-opus-5-5",
    model: "Claude Opus 5.5",
    input: "$4.00",
    output: "$20.00",
    cached: "$0.20",
  },
  {
    slug: "claude-sonnet-5-5",
    model: "Claude Sonnet 5.5",
    input: "$2.00",
    output: "$10.00",
    cached: "$0.10",
  },
  {
    slug: "claude-haiku-5-5",
    model: "Claude Haiku 5.5",
    input: "$0.10",
    output: "$0.50",
    cached: "$0.01",
    note: "≤100K tokens；>100K 为 $0.50 / $2.50",
  },
  {
    slug: "gemini-4-argon",
    model: "Gemini 4 Argon",
    input: "$2.00",
    output: "$10.00",
    cached: "$0.10",
    note: "五折至 11/30",
  },
  {
    slug: "deepseek-v4-1-flash",
    model: "DeepSeek V4.1 Flash",
    input: "$0.30",
    output: "$1.20",
    cached: "$0.006",
    note: "峰值价，空闲时段 5 折",
  },
  {
    slug: "deepseek-v4-pro",
    model: "DeepSeek V4 Pro",
    input: "$1.32",
    output: "$3.96",
    cached: "$0.044",
    note: "峰值价，空闲时段 5 折",
  },
  {
    slug: "glm-5-3",
    model: "GLM-5.3",
    input: "$1.40",
    output: "$4.40",
    cached: "$0.26",
  },
  {
    slug: "glm-5-3-flash",
    model: "GLM-5.3-Flash",
    input: "$0.15",
    output: "$0.50",
    cached: "$0.03",
  },
  {
    slug: "glm-5-2",
    model: "GLM-5.2",
    input: "$1.40",
    output: "$4.40",
    cached: "$0.26",
  },
  {
    slug: "kimi-k3",
    model: "Kimi K3",
    input: "$3.00",
    output: "$15.00",
    cached: "$0.30",
  },
  {
    slug: "kimi-k3-1-pro",
    model: "Kimi K3.1 Pro",
    input: "$2.00",
    output: "$10.00",
    cached: "$0.20",
  },
  {
    slug: "kimi-k2-7-code",
    model: "Kimi K2.7 Code",
    input: "$0.95",
    output: "$4.00",
    cached: "$0.19",
  },
  {
    slug: "qwen3-8-max",
    model: "Qwen3.8 Max",
    input: "$2.00",
    output: "$6.00",
    cached: "$0.25",
  },
  {
    slug: "qwen3-8-flash",
    model: "Qwen3.8 Flash",
    input: "$0.15",
    output: "$0.47",
    cached: "$0.016",
  },
  {
    slug: "qwen3-7-plus",
    model: "Qwen3.7 Plus",
    input: "$0.40",
    output: "$1.60",
    cached: "$0.04",
  },
  {
    slug: "seed-2-1",
    model: "Seed-2.1",
    input: "$0.50",
    output: "$2.00",
    cached: "$0.05",
  },
  {
    slug: "grok-4-7",
    model: "Grok 4.7",
    input: "$2.00",
    output: "$6.00",
    cached: "$0.50",
  },
  {
    slug: "minimax-m3",
    model: "MiniMax M3",
    input: "$0.30",
    output: "$1.20",
    cached: "$0.06",
    note: "≤512K tokens；>512K 为 $0.60 / $2.40",
  },
  {
    slug: "minimax-m3-1-flash",
    model: "MiniMax M3.1 Flash",
    input: "$0.15",
    output: "$0.60",
    cached: "$0.015",
  },
  {
    slug: "hy3",
    model: "Hy3",
    input: "$0.14",
    output: "$0.58",
    cached: "$0.035",
  },
  {
    slug: "ling-3-1-flash",
    model: "Ling 3.1 Flash",
    input: "$0.10",
    output: "$0.40",
    cached: "$0.01",
  },
];
