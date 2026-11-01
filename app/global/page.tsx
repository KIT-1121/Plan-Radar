import { DisplayTabs } from "@/components/DisplayTabs";
import { PlanExplorer } from "@/components/PlanExplorer";
import { globalFilters, globalPlans } from "@/lib/plans";

export default function GlobalPage() {
  return (
    <div className="wrap">
      <div className="page-head page-head-row">
        <div>
          <div className="eyebrow">Global · 6 plans</div>
          <h1 className="display">国外 AI 套餐</h1>
          <p className="lead">
            按套餐看：月费、额度、模型、窗口与请求限制。额度都按官网口径展示。
          </p>
        </div>
        <DisplayTabs mode="plans" />
      </div>

      <PlanExplorer
        plans={globalPlans}
        filters={globalFilters}
        ratioLabel="折算"
        note="倍数 = 额度 ÷ 月费，只在同币种额度时计算。Claude、ChatGPT、Copilot 的额度是窗口或请求数，不参与折算。首批收录 5 家供应商，Cursor / Windsurf 正在核验。"
      />
    </div>
  );
}
