# Plan-Radar

AI 套餐比价站。把国内与国外 AI 编程套餐的月费、额度、模型和限制放在一起，
用来回答一个简单问题：**同样的钱，哪家给得更多？**

当前是 **Next.js 16 + TypeScript** 实现，构建为静态站点（`out/`），
可以直接放到 Nginx 或任意静态服务器上。

## 页面

| 路由 | 页面 | 内容 |
| --- | --- | --- |
| `/` | 首页 | 网站说明、最近更新、只看三件事 |
| `/cn/` | 国内套餐 | 6 个套餐的详情卡：价格 / 额度 / 模型 / 限制 |
| `/global/` | 国外套餐 | 6 个套餐的详情卡；可切表格 |
| `/models/` | 按模型比价 | DeepSeek V4.1 Flash 的 6 个渠道，官方价 vs 套餐价 |
| `/sponsor/` | Star / 赞助 | GitHub、赞助渠道、内容纠错 |

## 两种视图

- **按套餐**：一张卡看一个套餐。不同套餐字段不同，例如 OpenCode 有 5h / 周 / 月
  三窗口，Copilot 只有请求数。
- **按模型**：一个模型看所有套餐 / API 渠道。例如 DeepSeek V4.1 Flash：
  官方 API $0.30 / $1.20 每 1M tokens；OpenCode Go 与 CommandCode GOAT 都是
  $10 → $100 额度，等于官方价的 10%。

## 本地开发

```bash
pnpm install
pnpm dev
```

打开 `http://localhost:3000`。

## 构建与部署

```bash
pnpm build
```

构建结果在 `out/`，是纯静态文件，不需要 Node 运行时。Nginx 示例：

```nginx
server {
  listen 80;
  server_name plan-radar.example.com;
  root /var/www/plan-radar/out;
  index index.html;

  location / {
    try_files $uri $uri/ =404;
  }
}
```

也可以用任意静态托管（Cloudflare Pages、Vercel、对象存储）直接上传 `out/`。

## 数据

价格数据在：

- `lib/plans.ts`：套餐、价格、额度、限制、模型
- `lib/models.ts`：按模型比价的数据

当前是静态数据，最后核对 2026-11-01。GLM 的 `US$18` 取自官方
“from $18/month”，Qwen Code 的免费额度待核验。

## 目录

```text
.
├── app/                 # Next.js App Router 页面
├── components/          # Header / Footer / PlanCard / PlanExplorer / Icon
├── lib/                 # 套餐与模型数据
├── prototype/           # 早期静态原型（设计参考）
├── screenshots/         # 构建后页面截图
├── next.config.mjs      # output: "export"
├── package.json
└── tsconfig.json
```

## 状态

已实现可部署版本。下一步：补齐 Kimi / MiniMax / Cursor / Windsurf，
接入官网价格采集，再把静态数据换成接口。
