import { DisplayTabs } from "@/components/DisplayTabs";
import { PlanExplorer } from "@/components/PlanExplorer";
import { allPlans, planFilters } from "@/lib/plans";

export default function PlansPage() {
  return (
    <div className="wrap">
      <div className="page-head page-head-row">
        <div>
          <div className="eyebrow">Plans · 12</div>
          <h1 className="display">套餐</h1>
          <p className="lead">订阅制 AI 编程套餐，按额度类型筛选。</p>
        </div>
        <DisplayTabs mode="plans" />
      </div>

      <PlanExplorer
        plans={allPlans}
        filters={planFilters}
        ratioLabel="折算"
        note="倍数只用于同币种美元额度；积分、请求数、窗口额度不跨口径比较。"
      />
    </div>
  );
}
