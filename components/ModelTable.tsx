"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TokenPrice } from "@/lib/api";
import type { ModelInfo } from "@/lib/catalog";
import { Icon } from "./Icon";

export interface ModelRow extends ModelInfo {
  context: string;
  count: number;
  price?: TokenPrice | null;
}

interface ModelTableProps {
  rows: ModelRow[];
  mode: "plans" | "api";
  allHref?: string;
  allLabel?: string;
}

export function ModelTable({
  rows,
  mode,
  allHref,
  allLabel,
}: ModelTableProps) {
  const [query, setQuery] = useState("");
  const keyword = query.trim().toLowerCase();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scrollInfo, setScrollInfo] = useState({
    overflow: false,
    thumb: 1,
    top: 0,
  });

  const updateScroll = useCallback(() => {
    const element = wrapRef.current;
    if (!element) return;
    const max = element.scrollHeight - element.clientHeight;
    setScrollInfo({
      overflow: max > 4,
      thumb: Math.min(1, element.clientHeight / element.scrollHeight),
      top: max > 0 ? element.scrollTop / max : 0,
    });
  }, []);

  useEffect(() => {
    const element = wrapRef.current;
    updateScroll();
    if (!element) return;
    element.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    return () => {
      element.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [updateScroll]);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("q");
    if (fromUrl) setQuery(fromUrl);
  }, []);

  const visible = useMemo(() => {
    if (!keyword) return rows;
    return rows.filter((row) =>
      [row.name, row.provider, row.family]
        .join(" ")
        .toLowerCase()
        .includes(keyword),
    );
  }, [rows, keyword]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(updateScroll);
    return () => window.cancelAnimationFrame(frame);
  }, [visible.length, updateScroll]);

  return (
    <>
      <div className="catalog-top catalog-top-left model-table-top">
        <div className="catalog-search catalog-search-wide">
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
        {allHref && allLabel ? (
          <a className="btn secondary small" href={allHref}>
            {allLabel} <Icon name="arrow" className="icon icon-sm" />
          </a>
        ) : null}
      </div>

      <div className="model-table-frame">
        <div className="model-table-wrap" ref={wrapRef}>
          <div className={`model-table model-table-${mode}`}>
          <div className="model-table-head">
            <span>模型</span>
            <span>厂商</span>
            <span>上下文</span>
            <span>{mode === "plans" ? "套餐" : "渠道"}</span>
            <span>输入 / 1M</span>
            <span>输出 / 1M</span>
            <span>缓存 / 1M</span>
            <span />
          </div>

          {visible.map((row) => (
            <a
              className="model-row"
              href={`/${mode}/${row.slug}/`}
              key={row.slug}
            >
              <span className="model-cell">
                <b>{row.name}</b>
              </span>
              <span className="muted">{row.provider}</span>
              <span className="num">{row.context}</span>
              <span className="num">{row.count}</span>
              <span className="num">{row.price?.input ?? "—"}</span>
              <span className="num">{row.price?.output ?? "—"}</span>
              <span className="num">{row.price?.cached ?? "—"}</span>
              <span className="row-arrow">
                <Icon name="arrow" className="icon icon-sm" />
              </span>
            </a>
          ))}
          </div>
        </div>

        {scrollInfo.overflow ? (
          <div className="model-table-scrollbar" aria-hidden="true">
            <span
              style={{
                height: `${scrollInfo.thumb * 100}%`,
                top: `${scrollInfo.top * (1 - scrollInfo.thumb) * 100}%`,
              }}
            />
          </div>
        ) : null}
      </div>

      {visible.length === 0 ? (
        <div className="empty">没有找到匹配的模型。</div>
      ) : null}
    </>
  );
}
