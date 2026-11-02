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
  const thumbRef = useRef<HTMLSpanElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  const updateScroll = useCallback(() => {
    const element = wrapRef.current;
    if (!element) return;
    const max = element.scrollHeight - element.clientHeight;
    const overflow = max > 4;
    setHasOverflow((current) => (current === overflow ? current : overflow));

    const thumb = thumbRef.current;
    if (!thumb) return;
    const ratio = Math.min(1, element.clientHeight / element.scrollHeight);
    thumb.style.height = `${ratio * 100}%`;
    thumb.style.top = `${max > 0 ? (element.scrollTop / max) * (1 - ratio) * 100 : 0}%`;
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
    const el = wrapRef.current;
    if (!el) return;
    const target: HTMLDivElement = el;

    function onWheel(event: WheelEvent) {
      if (event.ctrlKey) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      const max = target.scrollHeight - target.clientHeight;
      if (max <= 4) return;

      let delta = event.deltaY;
      if (event.deltaMode === 1) delta *= 16;
      else if (event.deltaMode === 2) delta *= target.clientHeight;

      event.preventDefault();
      const next = Math.max(0, Math.min(max, target.scrollTop + delta));
      target.scrollTop = next;
    }

    target.addEventListener("wheel", onWheel, { passive: false });
    return () => target.removeEventListener("wheel", onWheel);
  }, []);

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
            </a>
          ))}
          </div>
        </div>

        <div
          className={`model-table-scrollbar${hasOverflow ? " is-visible" : ""}`}
          aria-hidden="true"
        >
          <span ref={thumbRef} />
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="empty">没有找到匹配的模型。</div>
      ) : null}
    </>
  );
}
