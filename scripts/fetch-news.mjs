#!/usr/bin/env node
/**
 * 抓取 AI 新闻 RSS，按北京时间分组输出，供日刊编辑使用。
 *
 *   node scripts/fetch-news.mjs            # Markdown 摘要
 *   node scripts/fetch-news.mjs --json     # JSON（给自动化用）
 *   node scripts/fetch-news.mjs --days 2 --per-day 4
 *
 * 只依赖 Node 内置 fetch，不安装任何包。
 */

const FEEDS = [
  {
    name: "TechCrunch",
    url: "https://techcrunch.com/category/artificial-intelligence/feed/",
  },
  {
    name: "The Verge",
    url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
  },
  {
    name: "Google",
    url: "https://blog.google/technology/ai/rss/",
  },
];

const UA = "Plan-Radar/0.2 (+https://github.com/KIT-1121/Plan-Radar)";
const args = process.argv.slice(2);
const asJson = args.includes("--json");
const days = Number(readArg("--days") ?? 3);
const perDay = Number(readArg("--per-day") ?? 4);

function readArg(flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

function decodeEntities(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(parseInt(code, 16)),
    )
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function text(value) {
  return decodeEntities(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstTag(block, names) {
  for (const name of names) {
    const match = block.match(
      new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"),
    );
    if (match) return match[1];
  }
  return "";
}

function atomLink(block) {
  const alternate = block.match(
    /<link\b[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["']/i,
  );
  if (alternate) return alternate[1];
  const href = block.match(/<link\b[^>]*href=["']([^"']+)["']/i);
  return href ? href[1] : "";
}

function parseFeed(xml, feedName) {
  const rssItems = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];
  const atomEntries = xml.match(/<entry\b[\s\S]*?<\/entry>/gi) ?? [];
  const blocks = rssItems.length ? rssItems : atomEntries;

  return blocks
    .map((block) => {
      const rawLink = atomLink(block) || text(firstTag(block, ["link"]));
      const published =
        text(firstTag(block, ["pubDate", "published", "updated", "dc:date"])) ||
        "";
      const rawSummary = firstTag(block, [
        "description",
        "summary",
        "content:encoded",
        "content",
      ]);
      return {
        source: feedName,
        title: text(firstTag(block, ["title"])),
        link: decodeEntities(rawLink),
        published,
        summary: text(rawSummary).slice(0, 240),
      };
    })
    .filter((item) => item.title && item.link);
}

function beijingDay(date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (type) => parts.find((part) => part.type === type)?.value;
  return {
    key: `${get("month")}.${get("day")}`,
    iso: `${get("year")}-${get("month")}-${get("day")}`,
  };
}

function beijingTime(date) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

async function loadFeed(feed) {
  const response = await fetch(feed.url, {
    headers: { "user-agent": UA, accept: "application/rss+xml, application/xml" },
    signal: AbortSignal.timeout(25000),
  });
  if (!response.ok) {
    throw new Error(`${feed.name}: HTTP ${response.status}`);
  }
  return parseFeed(await response.text(), feed.name);
}

async function main() {
  const results = await Promise.allSettled(FEEDS.map(loadFeed));
  const errors = [];
  const items = [];

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      items.push(...result.value);
    } else {
      errors.push(`${FEEDS[index].name}: ${result.reason.message}`);
    }
  });

  if (!items.length) {
    console.error("没有抓到任何新闻：\n" + errors.join("\n"));
    process.exit(1);
  }

  const seen = new Set();
  const normalized = items
    .map((item) => {
      const date = new Date(item.published);
      if (Number.isNaN(date.getTime())) return null;
      const day = beijingDay(date);
      return { ...item, day: day.key, date: day.iso, time: beijingTime(date) };
    })
    .filter(Boolean)
    .filter((item) => {
      if (seen.has(item.link)) return false;
      seen.add(item.link);
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time));

  const grouped = [];
  for (const item of normalized) {
    let group = grouped.find((entry) => entry.day === item.day);
    if (!group) {
      group = { day: item.day, iso: item.date, items: [] };
      grouped.push(group);
    }
    if (group.items.length < perDay * 3) group.items.push(item);
  }

  const kept = grouped
    .sort((a, b) => b.iso.localeCompare(a.iso))
    .slice(0, Math.max(1, days));

  if (asJson) {
    console.log(
      JSON.stringify({ generatedAt: new Date().toISOString(), errors, days: kept }, null, 2),
    );
    return;
  }

  const lines = ["# AI 新闻素材（北京时间）", ""];
  for (const group of kept) {
    lines.push(`## ${group.day} · ${group.iso}（${group.items.length} 条）`, "");
    group.items.slice(0, perDay).forEach((item) => {
      lines.push(`- ${item.time} ${item.title} — ${item.source}`);
      lines.push(`  ${item.link}`);
      if (item.summary) lines.push(`  ${item.summary}`);
    });
    lines.push("");
  }
  lines.push(`> 每天至少挑选 3 条。抓取时间：${new Date().toISOString()}`);
  console.log(lines.join("\n"));
  if (errors.length) console.error("部分源抓取失败：\n" + errors.join("\n"));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
