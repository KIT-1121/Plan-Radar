"use client";

import { useMemo, useState } from "react";
import type { ModelInfo } from "@/lib/catalog";
import { Icon } from "./Icon";

export interface ModelItem extends ModelInfo {
  count: number;
}

interface ModelDirectoryProps {
  models: ModelItem[];
  mode: "plans" | "api";
  allHref: string;
  allLabel: string;
}

export function ModelDirectory({
  models,
  mode,
  allHref,
  allLabel,
}: ModelDirectoryProps) {
  const [query, setQuery] = useState("");
  const keyword = query.trim().toLowerCase();

  const groups = useMemo(() => {
    const filtered = models.filter((model) => {
      if (!keyword) return true;
      return [model.name, model.provider, model.family, model.note]
        .join(" ")
        .toLowerCase()
        .includes(keyword);
    });
    const map = new Map<string, { mark: string; items: ModelItem[] }>();
    filtered.forEach((model) => {
      if (!map.has(model.provider)) {
        map.set(model.provider, { mark: model.mark, items: [] });
      }
      map.get(model.provider)!.items.push(model);
    });
    return Array.from(map, ([provider, value]) => ({ provider, ...value }));
  }, [models, keyword]);

  const visibleCount = groups.reduce((total, group) => total + group.items.length, 0);

  return (
    <>
      <div className="catalog-top">
        <div className="catalog-search">
          <Icon name="search" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索模型或供应商…"
            aria-label="搜索模型或供应商"
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
        <a className="btn secondary small" href={allHref}>
          {allLabel} <Icon name="arrow" className="icon icon-sm" />
        </a>
      </div>

      <div className="model-dir-caption">
        <span className="eyebrow">
          {mode === "plans" ? "选择模型 · 看套餐" : "选择模型 · 看 API"}
        </span>
        <span>{visibleCount} 个模型</span>
      </div>

      <div className="model-groups">
        {groups.map((group) => (
          <section className="model-group" key={group.provider}>
            <div className="model-group-head">
              <span className="provider-mark">{group.mark}</span>
              <h2>{group.provider}</h2>
              <span className="model-group-count">{group.items.length} 个模型</span>
            </div>
            <div className="model-grid">
              {group.items.map((model) => (
                <a
                  className="model-card"
                  href={`/${mode}/${model.slug}/`}
                  key={model.slug}
                >
                  <div className="model-card-top">
                    <span>{model.family}</span>
                    <span className="model-count">
                      {model.count} {mode === "plans" ? "个套餐" : "个渠道"}
                    </span>
                  </div>
                  <h3>{model.name}</h3>
                  <p>{model.note}</p>
                  <span className="model-card-arrow">
                    <Icon name="arrow" className="icon icon-sm" />
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      {visibleCount === 0 ? (
        <div className="empty">没有找到匹配的模型。</div>
      ) : null}
    </>
  );
}
