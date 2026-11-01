export interface ModelChip {
  id: string;
  name: string;
  count?: number;
  active?: boolean;
  pending?: boolean;
}

export const modelChips: ModelChip[] = [
  { id: "deepseek-v4.1-flash", name: "DeepSeek V4.1 Flash", count: 6, active: true },
  { id: "glm-5.3", name: "GLM-5.3", pending: true },
  { id: "kimi-k3", name: "Kimi K3", pending: true },
  { id: "claude-sonnet-5.5", name: "Claude Sonnet 5.5", pending: true },
  { id: "gpt-6", name: "GPT-6", pending: true },
];

export interface Offer {
  channel: string;
  provider: string;
  mark: string;
  type: string;
  price: string;
  quota: string;
  multiplier: string;
  effective: string;
  limit: string;
  updated: string;
}

export const deepseekOffers: Offer[] = [
  {
    channel: "OpenCode Go",
    provider: "OpenCode",
    mark: "OC",
    type: "订阅",
    price: "$10 / 月",
    quota: "$100 / 月",
    multiplier: "10×",
    effective: "官方 10%",
    limit: "5h / 周 / 月",
    updated: "11/01",
  },
  {
    channel: "CommandCode GOAT",
    provider: "CommandCode",
    mark: "CC",
    type: "订阅",
    price: "$10 / 月",
    quota: "$100 / 月",
    multiplier: "10×",
    effective: "官方 10%",
    limit: "月额度",
    updated: "11/01",
  },
  {
    channel: "CommandCode Go",
    provider: "CommandCode",
    mark: "CC",
    type: "订阅",
    price: "$1 / 月",
    quota: "$10 / 月",
    multiplier: "10×",
    effective: "官方 10%",
    limit: "月额度",
    updated: "11/01",
  },
  {
    channel: "OpenCode Console",
    provider: "OpenCode",
    mark: "OC",
    type: "按量",
    price: "—",
    quota: "按 token 计费",
    multiplier: "1×",
    effective: "官方 100%",
    limit: "无窗口",
    updated: "11/01",
  },
  {
    channel: "CommandCode Provider",
    provider: "CommandCode",
    mark: "CC",
    type: "按量",
    price: "$15 / 月 + 按量",
    quota: "按 token 计费",
    multiplier: "1×",
    effective: "官方 100%",
    limit: "无窗口",
    updated: "11/01",
  },
  {
    channel: "DeepSeek 官方 API",
    provider: "DeepSeek",
    mark: "DS",
    type: "按量",
    price: "—",
    quota: "按 token 计费",
    multiplier: "1×",
    effective: "官方 100%",
    limit: "无窗口",
    updated: "11/01",
  },
];

export interface PriceBar {
  label: string;
  width: number;
  value: string;
  accent?: boolean;
}

export const deepseekBars: PriceBar[] = [
  { label: "官方 API", width: 100, value: "100%" },
  { label: "OpenCode Console", width: 100, value: "100%" },
  { label: "OpenCode Go", width: 10, value: "10%", accent: true },
  { label: "CommandCode GOAT", width: 10, value: "10%", accent: true },
  { label: "CommandCode Go", width: 10, value: "10%", accent: true },
];
