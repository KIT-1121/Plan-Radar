export interface BriefItem {
  date: string;
  title: string;
  summary: string;
  href: string;
  source: string;
}

export interface Brief {
  key: string;
  label: string;
  items: BriefItem[];
}

export const briefs: Brief[] = [
  {
    key: "daily",
    label: "日报",
    items: [
      {
        date: "10.31",
        title: "Apple：不会为了 AI 而 AI",
        summary: "新任 CEO John Ternus 为 Apple 的 AI 节奏辩护，强调产品体验优先。",
        href: "https://techcrunch.com/2026/10/31/apple-ceo-says-the-company-doesnt-want-to-ship-ai-for-ais-sake/",
        source: "TechCrunch",
      },
      {
        date: "10.31",
        title: "OpenAI 下调新一轮融资目标",
        summary: "最新一轮融资不及预期，市场对 AI 高估值和高支出的耐心在变化。",
        href: "https://techcrunch.com/2026/10/31/openai-reportedly-lowers-funding-target-for-new-round/",
        source: "TechCrunch",
      },
      {
        date: "10.30",
        title: "Google 的太空 AI 服务器传回第一段回应",
        summary: "搭载 TPU 的卫星在轨运行 Gemma 4，并生成了一首关于太空的俳句。",
        href: "https://www.theverge.com/tech/1023528/google-project-suncatcher-ai-satellite-transmission",
        source: "The Verge",
      },
    ],
  },
  {
    key: "weekly",
    label: "周刊",
    items: [
      {
        date: "本周",
        title: "AI 支出繁荣出现裂缝",
        summary: "大科技公司继续投入数千亿美元，但债务、负现金流和投资者疑虑开始上升。",
        href: "https://techcrunch.com/2026/10/30/cracks-are-emerging-in-the-ai-spending-boom/",
        source: "TechCrunch",
      },
      {
        date: "本周",
        title: "Anthropic IPO 或获高收益垃圾评级",
        summary: "信用评级机构预计其融资成本上升，AI 公司的高支出模式受到审视。",
        href: "https://techcrunch.com/2026/10/30/anthropic-expected-to-receive-high-junk-rating-from-credit-agencies-following-ipo-report-says/",
        source: "TechCrunch",
      },
      {
        date: "本周",
        title: "四大 AI 公司支持新的抓取退出标准",
        summary: "OpenAI、Google、微软、Anthropic 支持统一的 robots.txt AI 训练偏好信号。",
        href: "https://www.theverge.com/tech/1023763/openai-google-microsoft-ai-scraping-standard-opt-out",
        source: "The Verge",
      },
    ],
  },
  {
    key: "monthly",
    label: "月刊",
    items: [
      {
        date: "10 月",
        title: "AI 数据中心进入选举政治",
        summary: "缅因州参议院选战围绕数据中心的水、电和气候影响展开。",
        href: "https://www.theverge.com/ai-artificial-intelligence/1021080/maine-senate-race-susan-collins-ai-data-centers",
        source: "The Verge",
      },
      {
        date: "10 月",
        title: "Apple Intelligence 进入中国",
        summary: "随 iOS 27.3 推出，首批包含通知摘要、实时翻译、视觉智能等功能。",
        href: "https://www.theverge.com/tech/1023974/apple-intelligence-china-ios-27-3",
        source: "The Verge",
      },
      {
        date: "10 月",
        title: "AI 算力上天",
        summary: "Google Project Suncatcher 把 TPU 和 Gemma 4 送上轨道，探索太空数据中心。",
        href: "https://www.theverge.com/tech/1023528/google-project-suncatcher-ai-satellite-transmission",
        source: "The Verge",
      },
    ],
  },
];
