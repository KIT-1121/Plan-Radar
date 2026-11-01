"use client";

import { useMemo, useState } from "react";
import type { Plan, PlanFilter } from "@/lib/plans";
import { Icon } from "./Icon";
import { PlanCard } from "./PlanCard";

interface PlanExplorerProps {
  plans: Plan[];
  filters: PlanFilter[];
  ratioLabel: string;
  note: string;
}

function searchText(plan: Plan) {
  return [
    plan.name,
    plan.provider,
    plan.tag,
    plan.quotaLabel,
    ...plan.models.map((model) => model.name),
    ...plan.specs.map((spec) => `${spec.label} ${spec.value}`),
  ]
    .join(" ")
    .toLowerCase();
}

export function PlanExplorer({
  plans,
  filters,
  ratioLabel,
  note,
}: PlanExplorerProps) {
  const [query, setQuery] = useState("");
  const [provider, setProvider] = useState("all");
  const [filter, setFilter] = useState<"all" | Plan["kind"]>("all");
  const [view, setView] = useState<"cards" | "table">("cards");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const providers = useMemo(
    () => Array.from(new Set(plans.map((plan) => plan.provider))),
    [plans],
  );

  const keyword = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      plans.filter((plan) => {
        if (provider !== "all" && plan.provider !== provider) return false;
        if (filter !== "all" && plan.kind !== filter) return false;
        if (keyword && !searchText(plan).includes(keyword)) return false;
        return true;
      }),
    [plans, provider, filter, keyword],
  );

  const active = query !== "" || provider !== "all" || filter !== "all";

  function reset() {
    setQuery("");
    setProvider("all");
    setFilter("all");
  }

  return (
    <>
      <div className="catalog-top catalog-top-left">
        <div className="catalog-search">
          <Icon name="search" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索套餐、供应商、模型…"
            aria-label="搜索套餐、供应商、模型"
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
        <button
          type="button"
          className="filter-toggle"
          aria-expanded={filtersOpen}
          aria-controls="plan-filters"
          aria-label={filtersOpen ? "收起筛选条件" : "展开筛选条件"}
          title={filtersOpen ? "收起筛选" : "展开筛选"}
          onClick={() => setFiltersOpen((open) => !open)}
        >
          <span
            className={filtersOpen ? "filter-triangle open" : "filter-triangle"}
          />
        </button>
      </div>

      {filtersOpen ? (
        <div className="tag-groups" id="plan-filters">
          <div className="tag-row">
            <span className="tag-label">供应商</span>
            <div className="chips">
              <button
                type="button"
                className={provider === "all" ? "chip active" : "chip"}
                onClick={() => setProvider("all")}
              >
                全部
              </button>
              {providers.map((name) => (
                <button
                  key={name}
                  type="button"
                  className={provider === name ? "chip active" : "chip"}
                  onClick={() =>
                    setProvider(provider === name ? "all" : name)
                  }
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="tag-row">
            <span className="tag-label">额度类型</span>
            <div className="chips">
              {filters.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={filter === item.key ? "chip active" : "chip"}
                  onClick={() => setFilter(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="catalog-result">
        <span>
          显示 <b>{visible.length}</b> / {plans.length} 个套餐
          {active ? (
            <button type="button" className="catalog-reset" onClick={reset}>
              清空筛选
            </button>
          ) : null}
        </span>

        <div className="view-toggle">
          <button
            type="button"
            className={view === "cards" ? "active" : undefined}
            onClick={() => setView("cards")}
          >
            卡片
          </button>
          <button
            type="button"
            className={view === "table" ? "active" : undefined}
            onClick={() => setView("table")}
          >
            表格
          </button>
        </div>
      </div>

      {view === "cards" ? (
        <div className="plan-grid">
          {visible.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      ) : (
        <div className="table-wrap">
          <table className="price-table">
            <thead>
              <tr>
                <th>套餐</th>
                <th>月费</th>
                <th>额度</th>
                <th>{ratioLabel}</th>
                <th>更新</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {visible.map((plan) => (
                <tr key={plan.id}>
                  <td>
                    <div className="plan-cell">
                      <span>
                        <b>{plan.name}</b>
                        <span>{plan.provider}</span>
                      </span>
                    </div>
                  </td>
                  <td className="strong">
                    {plan.price} {plan.priceUnit}
                  </td>
                  <td>
                    {plan.quotaValue} {plan.quotaLabel}
                  </td>
                  <td>
                    {plan.multiplier ? (
                      <span className="mult">{plan.multiplier}</span>
                    ) : (
                      <span className={plan.ratioFree ? "ratio free" : "ratio"}>
                        {plan.ratio ?? "—"}
                      </span>
                    )}
                  </td>
                  <td>{plan.updated}</td>
                  <td className="r">
                    <a
                      className="link-arrow"
                      href={plan.source}
                      target="_blank"
                      rel="noreferrer"
                    >
                      官网 <Icon name="external" className="icon icon-sm" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="note">{note}</p>
      {visible.length === 0 ? (
        <div className="empty">没有找到匹配的套餐。</div>
      ) : null}
    </>
  );
}
