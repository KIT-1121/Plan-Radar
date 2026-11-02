"use client";

import { useMemo, useState } from "react";
import { Icon } from "./Icon";
import { modelCountryList } from "@/lib/models-extra";

export interface ModelDirectoryRow {
  slug: string;
  name: string;
  provider: string;
  family: string;
  country: string;
  note: string;
  context: string;
  price: { input: string; output: string } | null;
  plans: number;
}

const order = new Map<string, number>(
  modelCountryList.map((country, index) => [country, index]),
);

export function ModelDirectory({ rows }: { rows: ModelDirectoryRow[] }) {
  const [country, setCountry] = useState("全部");
  const [query, setQuery] = useState("");

  const countries = useMemo(() => {
    const present = new Set(rows.map((row) => row.country));
    return Array.from(present).sort((a, b) => {
      const ai = order.get(a) ?? 99;
      const bi = order.get(b) ?? 99;
      return ai - bi || a.localeCompare(b, "zh-CN");
    });
  }, [rows]);

  const keyword = query.trim().toLowerCase();

  const groups = useMemo(() => {
    const filtered = rows.filter((row) => {
      if (country !== "全部" && row.country !== country) return false;
      if (!keyword) return true;
      return [row.name, row.provider, row.family, row.note]
        .join(" ")
        .toLowerCase()
        .includes(keyword);
    });

    const map = new Map<string, ModelDirectoryRow[]>();
    for (const row of filtered) {
      const list = map.get(row.country) ?? [];
      list.push(row);
      map.set(row.country, list);
    }

    return Array.from(map.entries()).sort(([a], [b]) => {
      const ai = order.get(a) ?? 99;
      const bi = order.get(b) ?? 99;
      return ai - bi || a.localeCompare(b, "zh-CN");
    });
  }, [rows, country, keyword]);

  const total = groups.reduce((sum, [, list]) => sum + list.length, 0);

  return (
    <>
      <div className="dir-toolbar">
        <div className="catalog-search dir-search">
          <Icon name="search" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索模型、厂商或系列…"
            aria-label="搜索模型、厂商或系列"
          />
          {query ? (
            <button
              type="button"
              className="catalog-clear"
              onClick={() => setQuery("")}
              aria-label="清空搜索"
            >
              <Icon name="x" className="icon icon-sm" />
            </button>
          ) : null}
        </div>

        <select
          className="dir-select"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
          aria-label="按国家或地区筛选"
        >
          <option value="全部">全部国家 / 地区</option>
          {countries.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>

        <span className="dir-count">{total} 个模型</span>
      </div>

      {groups.map(([name, items]) => (
        <section className="dir-group" key={name}>
          <header className="dir-group-head">
            <h2>{name}</h2>
            <span>{items.length}</span>
          </header>
          <div className="dir-grid">
            {items.map((row) => (
              <a className="dir-card" href={`/api/${row.slug}/`} key={row.slug}>
                <span className="dir-card-top">
                  <span>{row.provider}</span>
                  <span>{row.context}</span>
                </span>
                <b>{row.name}</b>
                <span className="dir-card-note">{row.note}</span>
                <span className="dir-card-price">
                  {row.price
                    ? `${row.price.input} / ${row.price.output}`
                    : "暂无公开报价"}
                </span>
                <span className="dir-card-foot">
                  {row.plans > 0 ? `${row.plans} 个套餐` : "暂无套餐"}
                  <Icon name="arrow" className="icon icon-sm" />
                </span>
              </a>
            ))}
          </div>
        </section>
      ))}

      {total === 0 ? (
        <div className="empty">没有找到匹配的模型。</div>
      ) : null}
    </>
  );
}
