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

export function PlanExplorer({
  plans,
  filters,
  ratioLabel,
  note,
}: PlanExplorerProps) {
  const [filter, setFilter] = useState<"all" | Plan["kind"]>("all");
  const [view, setView] = useState<"cards" | "table">("cards");

  const visible = useMemo(
    () => (filter === "all" ? plans : plans.filter((plan) => plan.kind === filter)),
    [filter, plans],
  );

  return (
    <>
      <div className="toolbar">
        <div className="chips">
          {filters.map((item) => (
            <button
              key={item.key}
              type="button"
              className={filter === item.key ? "chip active" : "chip"}
              onClick={() => setFilter(item.key)}
            >
              {item.label} <span className="n">{item.count}</span>
            </button>
          ))}
        </div>

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
                      <span className="provider-mark">{plan.mark}</span>
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
        <div className="empty">没有符合筛选的套餐。</div>
      ) : null}
    </>
  );
}
