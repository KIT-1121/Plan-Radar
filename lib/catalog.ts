import type { ApiChannel } from "./api";
import type { Plan } from "./plans";

export interface ModelInfo {
  slug: string;
  name: string;
  provider: string;
  mark: string;
  family: string;
  note: string;
  aliases: string[];
}

export const modelCatalog: ModelInfo[] = [
  {
    slug: "gpt-6",
    name: "GPT-6",
    provider: "OpenAI",
    mark: "OA",
    family: "GPT-6 系列",
    note: "通用 / Codex",
    aliases: ["GPT-6"],
  },
  {
    slug: "gpt-6-astra",
    name: "GPT-6 Astra",
    provider: "OpenAI",
    mark: "OA",
    family: "GPT-6 系列",
    note: "长上下文",
    aliases: ["GPT-6 Astra"],
  },
  {
    slug: "gpt-5-6",
    name: "GPT-5.6",
    provider: "OpenAI",
    mark: "OA",
    family: "GPT-5 系列",
    note: "上一代",
    aliases: ["GPT-5.6"],
  },
  {
    slug: "gpt-6-sol",
    name: "GPT-6 Sol",
    provider: "OpenAI",
    mark: "OA",
    family: "GPT-6 系列",
    note: "API 价目",
    aliases: ["GPT-6 Sol"],
  },
  {
    slug: "claude-opus-5-5",
    name: "Claude Opus 5.5",
    provider: "Anthropic",
    mark: "AN",
    family: "Claude 5.5",
    note: "旗舰",
    aliases: ["Opus 5.5", "Claude Opus 5.5"],
  },
  {
    slug: "claude-sonnet-5-5",
    name: "Claude Sonnet 5.5",
    provider: "Anthropic",
    mark: "AN",
    family: "Claude 5.5",
    note: "均衡",
    aliases: ["Sonnet 5.5", "Claude Sonnet 5.5", "Claude"],
  },
  {
    slug: "claude-haiku-5-5",
    name: "Claude Haiku 5.5",
    provider: "Anthropic",
    mark: "AN",
    family: "Claude 5.5",
    note: "轻量",
    aliases: ["Haiku 5.5", "Claude Haiku 5.5"],
  },
  {
    slug: "gemini-4-argon",
    name: "Gemini 4 Argon",
    provider: "Google",
    mark: "GG",
    family: "Gemini 4",
    note: "长上下文 / 多模态",
    aliases: ["Gemini 4 Argon", "Gemini"],
  },
  {
    slug: "deepseek-v4-1-flash",
    name: "DeepSeek V4.1 Flash",
    provider: "DeepSeek",
    mark: "DS",
    family: "DeepSeek V4",
    note: "低成本",
    aliases: ["DeepSeek V4.1 Flash", "DeepSeek V4.1"],
  },
  {
    slug: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    provider: "DeepSeek",
    mark: "DS",
    family: "DeepSeek V4",
    note: "推理",
    aliases: ["DeepSeek V4 Pro"],
  },
  {
    slug: "glm-5-3",
    name: "GLM-5.3",
    provider: "智谱",
    mark: "GL",
    family: "GLM-5",
    note: "旗舰",
    aliases: ["GLM-5.3", "GLM"],
  },
  {
    slug: "glm-5-3-flash",
    name: "GLM-5.3-Flash",
    provider: "智谱",
    mark: "GL",
    family: "GLM-5",
    note: "轻量",
    aliases: ["GLM-5.3-Flash"],
  },
  {
    slug: "glm-5-2",
    name: "GLM-5.2",
    provider: "智谱",
    mark: "GL",
    family: "GLM-5",
    note: "上一代",
    aliases: ["GLM-5.2"],
  },
  {
    slug: "kimi-k3",
    name: "Kimi K3",
    provider: "Moonshot",
    mark: "MO",
    family: "Kimi K3",
    note: "长上下文",
    aliases: ["Kimi K3"],
  },
  {
    slug: "kimi-k3-1-pro",
    name: "Kimi K3.1 Pro",
    provider: "Moonshot",
    mark: "MO",
    family: "Kimi K3",
    note: "旗舰",
    aliases: ["Kimi K3.1 Pro"],
  },
  {
    slug: "kimi-k2-7-code",
    name: "Kimi K2.7 Code",
    provider: "Moonshot",
    mark: "MO",
    family: "Kimi K2",
    note: "代码",
    aliases: ["Kimi K2.7 Code"],
  },
  {
    slug: "qwen3-8-max",
    name: "Qwen3.8 Max",
    provider: "阿里",
    mark: "QW",
    family: "Qwen3.8",
    note: "旗舰",
    aliases: ["Qwen3.8 Max", "Qwen3.8"],
  },
  {
    slug: "qwen3-8-flash",
    name: "Qwen3.8 Flash",
    provider: "阿里",
    mark: "QW",
    family: "Qwen3.8",
    note: "轻量",
    aliases: ["Qwen3.8 Flash"],
  },
  {
    slug: "qwen3-7-plus",
    name: "Qwen3.7 Plus",
    provider: "阿里",
    mark: "QW",
    family: "Qwen3.7",
    note: "上一代",
    aliases: ["Qwen3.7 Plus"],
  },
  {
    slug: "seed-2-1",
    name: "Seed-2.1",
    provider: "字节跳动",
    mark: "TR",
    family: "Seed",
    note: "国内模型",
    aliases: ["Seed-2.1"],
  },
  {
    slug: "grok-4-7",
    name: "Grok 4.7",
    provider: "xAI",
    mark: "XA",
    family: "Grok 4",
    note: "长上下文",
    aliases: ["Grok 4.7"],
  },
  {
    slug: "minimax-m3",
    name: "MiniMax M3",
    provider: "MiniMax",
    mark: "MM",
    family: "MiniMax M3",
    note: "多模态",
    aliases: ["MiniMax M3"],
  },
  {
    slug: "minimax-m3-1-flash",
    name: "MiniMax M3.1 Flash",
    provider: "MiniMax",
    mark: "MM",
    family: "MiniMax M3",
    note: "轻量",
    aliases: ["MiniMax M3.1 Flash"],
  },
  {
    slug: "hy3",
    name: "Hy3",
    provider: "腾讯",
    mark: "TC",
    family: "Hy",
    note: "国内模型",
    aliases: ["Hy3", "Tencent Hy3"],
  },
  {
    slug: "ling-3-1-flash",
    name: "Ling 3.1 Flash",
    provider: "蚂蚁",
    mark: "AG",
    family: "Ling 3",
    note: "轻量",
    aliases: ["Ling 3.1 Flash"],
  },
];

export const modelContexts: Record<string, string> = {
  "gpt-6": "1M",
  "gpt-6-astra": "1M",
  "gpt-5-6": "400K",
  "gpt-6-sol": "1M",
  "claude-opus-5-5": "200K",
  "claude-sonnet-5-5": "200K",
  "claude-haiku-5-5": "200K",
  "gemini-4-argon": "1M",
  "deepseek-v4-1-flash": "1M",
  "deepseek-v4-pro": "1M",
  "glm-5-3": "200K",
  "glm-5-3-flash": "200K",
  "glm-5-2": "128K",
  "kimi-k3": "1M",
  "kimi-k3-1-pro": "1M",
  "kimi-k2-7-code": "256K",
  "qwen3-8-max": "1M",
  "qwen3-8-flash": "1M",
  "qwen3-7-plus": "128K",
  "seed-2-1": "256K",
  "grok-4-7": "500K",
  "minimax-m3": "1M",
  "minimax-m3-1-flash": "1M",
  hy3: "256K",
  "ling-3-1-flash": "128K",
};

export function getModel(slug: string) {
  return modelCatalog.find((model) => model.slug === slug);
}

export function plansForModel(slug: string, plans: Plan[]) {
  const model = getModel(slug);
  if (!model) return [];
  return plans.filter((plan) =>
    plan.models.some((item) => model.aliases.includes(item.name)),
  );
}

export function apisForModel(slug: string, channels: ApiChannel[]) {
  return channels.filter(
    (channel) => channel.coversAll || channel.modelSlugs?.includes(slug),
  );
}
