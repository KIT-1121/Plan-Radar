import { Icon } from "@/components/Icon";
import { modelCatalog } from "@/lib/catalog";
import { allPlans } from "@/lib/plans";

export default function AllPlansPage() {
  return (
    <div className="wrap">
      <div className="detail-top">
        <a className="back-arrow" href="/plans/" aria-label="返回模型列表">
          <Icon name="arrow-left" />
        </a>
      </div>

      <header className="all-plans-head">
        <div className="eyebrow">套餐</div>
        <h1>全部套餐</h1>
        <p>
          {allPlans.length} 个套餐 · 覆盖 {modelCatalog.length} 个模型，点卡片查看完整详情。
        </p>
      </header>

      <div className="all-plan-grid">
        {allPlans.map((plan) => (
          <a
            className="all-plan-card"
            href={`/plans/plan/${plan.id}/`}
            key={plan.id}
          >
            {plan.name}
          </a>
        ))}
      </div>
    </div>
  );
}
