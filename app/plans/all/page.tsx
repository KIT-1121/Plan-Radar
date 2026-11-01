import { Icon } from "@/components/Icon";
import { PlanExplorer } from "@/components/PlanExplorer";
import { allPlans, planFilters } from "@/lib/plans";

export default function AllPlansPage() {
  return (
    <div className="wrap">
      <h1 className="visually-hidden">全部套餐</h1>
      <PlanExplorer
        plans={allPlans}
        filters={planFilters}
        ratioLabel="折算"
        note="倍数只用于同币种美元额度；积分、请求数、窗口额度不跨口径比较。"
        tabs={
          <a className="link-arrow" href="/plans/">
            按模型浏览 <Icon name="arrow" className="icon icon-sm" />
          </a>
        }
      />
    </div>
  );
}
