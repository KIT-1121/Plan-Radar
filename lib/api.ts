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
}

export const apiChannels: ApiChannel[] = [
  {
    id: "opencode-console",
    name: "OpenCode Console",
    provider: "OpenCode",
    mark: "OC",
    price: "按量",
    priceNote: "$0.30 / $1.20 起",
    billing: "按 token",
    models: "80+ 个模型",
    markup: "官方价",
    specs: [
      { label: "模型", value: "80+ 个" },
      { label: "计费", value: "按 token" },
      { label: "加价", value: "无" },
    ],
    source: "https://opencode.ai/v2/docs/console/models/",
    updated: "11/01",
  },
  {
    id: "commandcode-provider",
    name: "CommandCode Provider",
    provider: "CommandCode",
    mark: "CC",
    price: "$15 / 月",
    priceNote: "$0.30 / $1.20 起",
    billing: "按 token",
    models: "39 个模型",
    markup: "官方价",
    specs: [
      { label: "模型", value: "39 个" },
      { label: "计费", value: "按 token" },
      { label: "加价", value: "无" },
    ],
    source: "https://commandcode.ai/pricing",
    updated: "11/01",
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
  },
];

export interface TokenPrice {
  model: string;
  input: string;
  output: string;
  cached: string;
  note?: string;
}

export const tokenPrices: TokenPrice[] = [
  {
    model: "DeepSeek V4.1 Flash",
    input: "$0.30",
    output: "$1.20",
    cached: "$0.006",
  },
  {
    model: "GLM-5.3",
    input: "$1.40",
    output: "$4.40",
    cached: "$0.26",
  },
  {
    model: "Kimi K3",
    input: "$3.00",
    output: "$15.00",
    cached: "$0.30",
  },
  {
    model: "Claude Sonnet 5.5",
    input: "$2.00",
    output: "$10.00",
    cached: "$0.20",
  },
  {
    model: "GPT-6 Sol",
    input: "$2.00",
    output: "$10.00",
    cached: "$0.20",
  },
  {
    model: "Gemini 4 Argon",
    input: "$2.00",
    output: "$10.00",
    cached: "$0.10",
    note: "五折至 11/30",
  },
];
