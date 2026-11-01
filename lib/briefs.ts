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
        date: "11.01",
        title: "AI 先让 CEO 更轻松，其他人呢？",
        summary: "Equity 讨论 AI 效率红利先落到管理层和股东，普通员工的收益仍不明确。",
        href: "https://techcrunch.com/2026/11/01/ai-can-make-tech-ceos-lives-easier-what-about-everyone-else/",
        source: "TechCrunch",
      },
      {
        date: "11.01",
        title: "数据中心成为中期选举议题",
        summary: "从布鲁克林到加州，数据中心的水、电、气候和审批进入选战。",
        href: "https://techcrunch.com/2026/10/31/data-centers-are-now-a-midterm-issue-even-in-brooklyn/",
        source: "TechCrunch",
      },
      {
        date: "11.01",
        title: "Binance 6.3B 被盗案指向朝鲜",
        summary: "FBI 指朝鲜黑客组织 TraderTraitor 参与；Binance 称已覆盖 95% 被盗资产。",
        href: "https://www.theverge.com/tech/1024176/north-korea-binance-crypto-heist",
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
        title: "数据中心成为中期选举议题",
        summary: "从布鲁克林到加州，数据中心的水、电、气候和审批进入选战。",
        href: "https://techcrunch.com/2026/10/31/data-centers-are-now-a-midterm-issue-even-in-brooklyn/",
        source: "TechCrunch",
      },
    ],
  },
  {
    key: "monthly",
    label: "月刊",
    items: [
      {
        date: "10 月",
        title: "AI 抓取退出标准成形",
        summary: "OpenAI、Google、微软、Anthropic 支持统一的 robots.txt AI 训练偏好信号。",
        href: "https://www.theverge.com/tech/1023763/openai-google-microsoft-ai-scraping-standard-opt-out",
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
