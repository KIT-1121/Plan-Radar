import { Icon } from "@/components/Icon";
import { allPlans } from "@/lib/plans";

export default function AllPlansPage() {
  return (
    <div className="wrap">
      <div className="detail-top">
        <a className="back-arrow" href="/plans/" aria-label="返回模型列表">
          <Icon name="arrow-left" />
        </a>
      </div>

      <header className="models-head">
        <h1>全部套餐</h1>
        <p>
          共 {allPlans.length} 个套餐，按供应商列出。卡片直接跳转官网定价页。
        </p>
      </header>

      <div className="all-plan-grid">
        {allPlans.map((plan) => (
          <a
            className="all-plan-card"
            href={plan.source}
            target="_blank"
            rel="noreferrer"
            key={plan.id}
          >
            <span className="all-plan-copy">
              <b>{plan.name}</b>
              <span>
                {plan.provider}，{plan.price} {plan.priceUnit}
              </span>
            </span>
            <Icon name="external" className="icon icon-sm" />
          </a>
        ))}
      </div>
    </div>
  );
}
