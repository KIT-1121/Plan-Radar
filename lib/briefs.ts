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

export const briefsUpdatedAt = "2026.11.06";

export const briefs: Brief[] = [
  {
    key: "daily",
    label: "日报",
    items: [
      {
        date: "11.06",
        title: "OpenAI 放弃数据中心项目保密协议",
        summary:
          "中期选举后 OpenAI 承诺不再对数据中心项目使用保密协议，并公布社区条款。",
        href: "https://www.theverge.com/ai-artificial-intelligence/1028454/openai-data-center-nda",
        source: "The Verge",
      },
      {
        date: "11.06",
        title: "Meta 警告数据中心反弹拖慢 AI 扩张",
        summary:
          "Meta 称社区与政治层面对数据中心的反对，可能威胁后续 AI 基础设施投资。",
        href: "https://techcrunch.com/2026/11/05/metas-warns-that-election-backlash-against-data-centers-could-make-ai-expansion-harder/",
        source: "TechCrunch",
      },
      {
        date: "11.06",
        title: "Perplexity 推出办公 AI 代理 Teammates",
        summary:
          "常驻式 Teammates 可在工作区内承担多个角色，并复用既有项目、技能和记忆。",
        href: "https://www.theverge.com/ai-artificial-intelligence/1028302/perplexity-teammates-ai-agents-work",
        source: "The Verge",
      },
      {
        date: "11.06",
        title: "Airbnb 明年上半年上线 AI 旅行代理",
        summary:
          "该代理将帮用户规划行程、比较选项、管理预订，并在入住期间提供协助。",
        href: "https://techcrunch.com/2026/11/05/airbnb-says-its-launching-an-ai-travel-agent-in-the-first-half-of-2027/",
        source: "TechCrunch",
      },
      {
        date: "11.05",
        title: "高通加码数据中心，手机业务下滑",
        summary:
          "手机销量下滑约 20%，高通把增长押在 AI 数据中心。",
        href: "https://www.theverge.com/ai-artificial-intelligence/1026867/qualcomm-earnings-data-centers",
        source: "The Verge",
      },
      {
        date: "11.05",
        title: "Uber：上季度仅 4 单由 AI 代订",
        summary:
          "Uber 称第三季度只有四单由第三方 AI 代理完成。",
        href: "https://techcrunch.com/2026/11/04/almost-no-one-uses-ai-agents-to-book-their-uber-company-says/",
        source: "TechCrunch",
      },
      {
        date: "11.05",
        title: "AI 政治行动委员会砸钱影响中期选举",
        summary:
          "AI 行业 PAC 投入数百万美元，中期选举结果参差。",
        href: "https://techcrunch.com/2026/11/04/ai-pacs-spent-millions-trying-to-shape-congress-heres-how-they-fared/",
        source: "TechCrunch",
      },
      {
        date: "11.04",
        title: "Anthropic 推出模型身份验证系统",
        summary:
          "FlashProve 可验证一条回答是否真来自声称的模型。",
        href: "https://techcrunch.com/2026/11/03/anthropic-is-working-on-a-system-to-prove-ai-models-identity/",
        source: "TechCrunch",
      },
      {
        date: "11.04",
        title: "数据中心用退役飞机发动机发电",
        summary:
          "电网接入要等数年，数据中心转向退役喷气发动机供电。",
        href: "https://techcrunch.com/2026/11/03/data-centers-are-turning-to-old-jet-engines-as-the-wait-for-power-grows/",
        source: "TechCrunch",
      },
      {
        date: "11.04",
        title: "Palantir 美国商业收入首超政府",
        summary:
          "美国商业收入首次超过政府收入，AI 需求推高增长。",
        href: "https://techcrunch.com/2026/11/03/hiding-inside-palantirs-skyrocketing-quarter-is-a-foreboding-signal/",
        source: "TechCrunch",
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
        summary:
          "大科技公司继续投入数千亿美元，但债务、负现金流和投资者疑虑开始上升。",
        href: "https://techcrunch.com/2026/10/30/cracks-are-emerging-in-the-ai-spending-boom/",
        source: "TechCrunch",
      },
      {
        date: "本周",
        title: "Anthropic IPO 或获「垃圾级」评级",
        summary:
          "信用评级机构预计其融资成本上升，AI 公司的高支出模式受到审视。",
        href: "https://techcrunch.com/2026/10/30/anthropic-expected-to-receive-high-junk-rating-from-credit-agencies-following-ipo-report-says/",
        source: "TechCrunch",
      },
      {
        date: "本周",
        title: "AI 抓取退出标准成形",
        summary:
          "OpenAI、Google、微软、Anthropic 同意采用统一信号，允许出版商拒绝被 AI 抓取。",
        href: "https://www.theverge.com/tech/1023763/openai-google-microsoft-ai-scraping-standard-opt-out",
        source: "The Verge",
      },
      {
        date: "本周",
        title: "Google 卫星 AI 服务器首次回传",
        summary:
          "Project Suncatcher 的 TPU 卫星在轨启动，Gemma 模型从太空发回首个响应。",
        href: "https://www.theverge.com/tech/1023528/google-project-suncatcher-ai-satellite-transmission",
        source: "The Verge",
      },
      {
        date: "本周",
        title: "缅因州数据中心争议左右参议院选情",
        summary:
          "数据中心的水电、税收与审批问题进入竞选辩论，成为中期选举里最具体的 AI 议题。",
        href: "https://www.theverge.com/ai-artificial-intelligence/1021080/maine-senate-race-susan-collins-ai-data-centers",
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
        title: "Apple Intelligence 进入中国",
        summary:
          "随 iOS 27.3 推出，首批包含通知摘要、实时翻译、视觉智能等功能。",
        href: "https://www.theverge.com/tech/1023974/apple-intelligence-china-ios-27-3",
        source: "The Verge",
      },
      {
        date: "10 月",
        title: "教皇呼吁「解除 AI 武装」",
        summary:
          "教皇良十四世称「机器是工具，不是人」，主张由人类引导、改变并在必要时拒绝 AI 应用。",
        href: "https://www.theverge.com/ai-artificial-intelligence/1023188/pope-leo-disarm-ai",
        source: "The Verge",
      },
      {
        date: "10 月",
        title: "Altman：理解数学家的不满，但不会停",
        summary:
          "OpenAI 持续向数学界投放 AI 生成结果，Altman 表示同情研究者的处境，却没有放慢的打算。",
        href: "https://www.theverge.com/ai-artificial-intelligence/1023054/altman-cheeky-pint-ai-math-interview",
        source: "The Verge",
      },
      {
        date: "10 月",
        title: "星巴克测试 AI 个性化菜单",
        summary:
          "免下车场景可能根据用户历史推荐饮品，CEO 称正在探索「个性化数字菜单」。",
        href: "https://www.theverge.com/ai-artificial-intelligence/1023440/starbucks-ai-personalized-menu-drive-thru",
        source: "The Verge",
      },
      {
        date: "10 月",
        title: "数据中心成为中期选举议题",
        summary:
          "从布鲁克林到加州，数据中心的水、电、气候和审批进入选战。",
        href: "https://techcrunch.com/2026/10/31/data-centers-are-now-a-midterm-issue-even-in-brooklyn/",
        source: "TechCrunch",
      },
    ],
  },
];
