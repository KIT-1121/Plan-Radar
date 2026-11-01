# Plan-Radar

AI 套餐比价站。把国内与国外 AI 编程套餐的月费、额度、模型和限制放在一起，
用来回答一个简单问题：**同样的钱，哪家给得更多？**

当前是 v2 原型：静态 HTML/CSS/JS，无构建步骤。

## 页面

| 文件 | 页面 | 内容 |
| --- | --- | --- |
| `index.html` | 首页 | 网站说明、最近更新、只看三件事 |
| `cn.html` | 国内套餐 | 6 个套餐的详情卡：价格 / 额度 / 模型 / 限制 |
| `global.html` | 国外套餐 | 6 个套餐的详情卡；可切表格 |
| `models.html` | 按模型比价 | DeepSeek V4.1 Flash 的 6 个渠道，官方价 vs 套餐价 |
| `sponsor.html` | Star / 赞助 | GitHub、赞助渠道、内容纠错 |

## 两种视图

- **按套餐**：一张卡看一个套餐。不同套餐字段不同，例如 OpenCode 有 5h / 周 / 月
  三窗口，Copilot 只有请求数。
- **按模型**：一个模型看所有套餐 / API 渠道。例如 DeepSeek V4.1 Flash：
  官方 API $0.30 / $1.20 每 1M tokens；OpenCode Go 与 CommandCode GOAT 都是
  $10 → $100 额度，等于官方价的 10%。

## 本地预览

直接打开 `index.html`，或在目录内启动静态服务器：

```bash
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 数据

价格来自各套餐官网，最后核对 2026-11-01。原型中的额度与价格为静态数据；
GLM 的 `US$18` 取自官方 “from $18/month”，Qwen Code 的免费额度待核验。

## 目录

```text
.
├── index.html
├── cn.html
├── global.html
├── models.html
├── sponsor.html
├── assets/
│   ├── style.css
│   └── app.js
└── shots/          # 页面截图
```

## 状态

原型阶段。下一步：补齐 Kimi / MiniMax / Cursor / Windsurf，接入官网价格采集，
再把静态页面换成可运行的前端。
