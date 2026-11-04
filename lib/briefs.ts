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

export const briefsUpdatedAt = "2026.11.04";

export const briefs: Brief[] = [
  {
    key: "daily",
    label: "日报",
    items: [
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
        title: "Ballistic 募资 4.9 亿美元投 AI 安全",
        summary:
          "Ballistic Ventures 拟募 3.6 亿美元主基金和 1.3 亿美元副基金。",
        href: "https://techcrunch.com/2026/11/03/ted-schleins-ballistic-ventures-seeks-490m-for-new-funds-amid-ai-driven-cybersecurity-boom/",
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
      {
        date: "11.03",
        title: "Anthropic 警告已接近 RSI 能力",
        summary:
          "Anthropic 称已非常接近能自我改进的 RSI，AI 能力可能进入加速期。",
        href: "https://techcrunch.com/2026/11/02/anthropic-warns-that-its-very-close-to-rsi-capability-aka-self-building-ai/",
        source: "TechCrunch",
      },
      {
        date: "11.03",
        title: "纽约时报等起诉 Brave 抓取内容",
        summary:
          "媒体指 Brave 抓取受版权保护内容，并分发给 Anthropic、Perplexity 等客户。",
        href: "https://techcrunch.com/2026/11/02/new-york-times-and-other-outlets-sue-web-browser-brave-over-alleged-content-scraping/",
        source: "TechCrunch",
      },
      {
        date: "11.03",
        title: "OpenAI 试点数据中心让电计划",
        summary:
          "OpenAI 在佐治亚州试点，极端天气时让出最多 1000 兆瓦电力。",
        href: "https://www.theverge.com/ai-artificial-intelligence/1024604/openai-data-center-grid-protection-program",
        source: "The Verge",
      },
      {
        date: "11.03",
        title: "OpenAI 合并聊天与工作标签",
        summary:
          "ChatGPT 与 Codex 合并用量池，聊天和工作标签不再分开计费。",
        href: "https://techcrunch.com/2026/11/02/openai-is-finally-merging-chatgpts-chat-and-work-tabs/",
        source: "TechCrunch",
      },
      {
        date: "11.02",
        title: "OpenAI 想把数据中心改叫「AI 算力园区」",
        summary:
          "数据中心越来越不受欢迎，据报道 OpenAI 正考虑换个说法，把数据中心包装成「AI compute campus」。",
        href: "https://techcrunch.com/2026/11/01/openai-might-rebrand-its-data-centers-as-ai-compute-campuses/",
        source: "TechCrunch",
      },
      {
        date: "11.02",
        title: "AI 让 CEO 更轻松，普通员工呢？",
        summary:
          "Equity 播客讨论：为什么高管谈 AI 红利时总显得不接地气，效率收益到底落在谁手里。",
        href: "https://techcrunch.com/2026/11/01/ai-can-make-tech-ceos-lives-easier-what-about-everyone-else/",
        source: "TechCrunch",
      },
      {
        date: "11.02",
        title: "AI 圈最聪明的人都在看这张图",
        summary:
          "《华尔街日报》把递归自我改进（RSI）的曲线摆上台面：如果 AI 能改进 AI，进展速度可能超出常规预测。",
        href: "https://www.wsj.com/tech/ai/ai-anthropic-rsi-recursive-self-improvement-bff4e815",
        source: "WSJ",
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
