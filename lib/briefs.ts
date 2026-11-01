export interface BriefItem {
  date: string;
  title: string;
  summary: string;
  href: string;
}

export interface Brief {
  key: string;
  label: string;
  title: string;
  description: string;
  items: BriefItem[];
}

export const briefs: Brief[] = [
  {
    key: "daily",
    label: "日报",
    title: "今天的 AI 编程市场",
    description: "每天 3 条套餐、额度、模型变化。",
    items: [
      {
        date: "11.01",
        title: "OpenCode Go 模型池到 30+ 个",
        summary: "新增 Gemini 4 Argon，$10/$100 额度不变。",
        href: "/updates/#opencode-go-gemini",
      },
      {
        date: "11.01",
        title: "CommandCode GOAT 新增 Ling 3.1 Flash",
        summary: "仍是 $10/$100，模型增加到 36 个。",
        href: "/updates/#commandcode-goat-ling",
      },
      {
        date: "10.31",
        title: "Trae 三档会员调价",
        summary: "Lite ¥49 / Pro ¥99 / Pro+ ¥239。",
        href: "/updates/#trae-pricing-1031",
      },
    ],
  },
  {
    key: "weekly",
    label: "周刊",
    title: "本周的三个变化",
    description: "把一周的价格和额度放在一起看。",
    items: [
      {
        date: "本周",
        title: "编程套餐的 $10/$100 额度战",
        summary: "OpenCode Go、CommandCode GOAT 都是 $10 换 $100，折算 10×。",
        href: "/plans/all/",
      },
      {
        date: "本周",
        title: "GLM 改成 5h + 周双窗口",
        summary: "2,000 积分/5h、10,000 积分/周，额度口径更细。",
        href: "/plans/glm-5-3/",
      },
      {
        date: "本周",
        title: "DeepSeek V4.1 Flash 成为默认额度单位",
        summary: "多个套餐用 $100 额度对标同一条价格线。",
        href: "/plans/deepseek-v4-1-flash/",
      },
    ],
  },
  {
    key: "monthly",
    label: "月刊",
    title: "10 月回顾",
    description: "调价、上新、API 价格，一个月看一次。",
    items: [
      {
        date: "10 月",
        title: "会员调价与模型池扩张",
        summary: "Trae 三档调价，OpenCode 扩模型，CommandCode 增 Ling。",
        href: "/updates/",
      },
      {
        date: "10 月",
        title: "API 按量价保持稳定",
        summary: "DeepSeek V4.1 Flash $0.30/$1.20，缓存读 $0.006。",
        href: "/api/deepseek-v4-1-flash/",
      },
      {
        date: "10 月",
        title: "积分套餐的 token 估算",
        summary: "Trae / GLM 用积分计价，统一换算还需要官方口径。",
        href: "/plans/all/",
      },
    ],
  },
];
