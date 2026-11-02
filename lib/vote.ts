export type VotePeriod =
  | "daily"
  | "weekly"
  | "monthly"
  | "quarterly"
  | "yearly";

export const votePeriods: { id: VotePeriod; label: string; hint: string }[] = [
  { id: "daily", label: "日榜", hint: "今天 00:00 起" },
  { id: "weekly", label: "周榜", hint: "本周一 00:00 起" },
  { id: "monthly", label: "月榜", hint: "本月 1 日起" },
  { id: "quarterly", label: "季榜", hint: "本季度起" },
  { id: "yearly", label: "年榜", hint: "今年 1 月 1 日起" },
];

export type VoteDimensionId =
  | "model_overall"
  | "model_code"
  | "model_context"
  | "model_multimodal"
  | "model_chinese"
  | "plan_recommend"
  | "api_stable"
  | "plan_value";

export interface VoteDimension {
  id: VoteDimensionId;
  label: string;
  hint: string;
  kind: "model" | "plan" | "api" | "value";
}

export const voteDimensions: VoteDimension[] = [
  {
    id: "model_overall",
    label: "综合口碑",
    hint: "不考虑价格，最愿意推荐的一个",
    kind: "model",
  },
  {
    id: "model_code",
    label: "代码能力",
    hint: "写代码、改 bug、跑 Agent 最顺手",
    kind: "model",
  },
  {
    id: "model_context",
    label: "长上下文",
    hint: "长文档、大仓库、整本资料",
    kind: "model",
  },
  {
    id: "model_multimodal",
    label: "多模态",
    hint: "看图、看视频、读界面",
    kind: "model",
  },
  {
    id: "model_chinese",
    label: "中文能力",
    hint: "中文写作、理解与本地语境",
    kind: "model",
  },
  {
    id: "plan_recommend",
    label: "最值得订阅",
    hint: "算上额度与价格，最想续费的一个",
    kind: "plan",
  },
  {
    id: "api_stable",
    label: "最稳 API",
    hint: "延迟、限流、可用性综合",
    kind: "api",
  },
  {
    id: "plan_value",
    label: "性价比",
    hint: "按额度 ÷ 月费直接计算，不参与投票",
    kind: "value",
  },
];

export interface VoteCandidate {
  id: string;
  name: string;
  provider: string;
  meta?: string;
}

export interface VoteRankItem {
  target: string;
  votes: number;
}

export interface VoteValueRow {
  id: string;
  name: string;
  provider: string;
  price: string;
  quota: string;
  ratio: number;
  note: string;
}
