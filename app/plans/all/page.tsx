import { Icon } from "@/components/Icon";
import { allPlans } from "@/lib/plans";

export default function AllPlansPage() {
  return (
    <div className="wrap">
      <h1 className="visually-hidden">全部套餐</h1>
      <div className="detail-top">
        <a className="back-arrow" href="/plans/" aria-label="返回模型列表">
          <Icon name="arrow-left" />
        </a>
      </div>

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
                {plan.provider} · {plan.price} {plan.priceUnit}
              </span>
            </span>
            <Icon name="external" className="icon icon-sm" />
          </a>
        ))}
      </div>
    </div>
  );
}
