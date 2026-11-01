import { DisplayTabs } from "@/components/DisplayTabs";
import { PlanExplorer } from "@/components/PlanExplorer";
import { allPlans, planFilters } from "@/lib/plans";

export default function PlansPage() {
  return (
    <div className="wrap">
      <h1 className="visually-hidden">套餐</h1>
      <PlanExplorer
        plans={allPlans}
        filters={planFilters}
        ratioLabel="折算"
        note="倍数只用于同币种美元额度；积分、请求数、窗口额度不跨口径比较。"
        tabs={<DisplayTabs mode="plans" />}
      />
    </div>
  );
}
