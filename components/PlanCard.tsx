import type { Plan } from "@/lib/plans";
import { Icon } from "./Icon";

export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article className="plan-card" data-provider={plan.provider}>
      <div className="plan-top">
        <span className="provider-mark">{plan.mark}</span>
        <span className="provider-name">{plan.provider}</span>
        <span className="tag">{plan.tag}</span>
      </div>

      <div className="pd-title-row">
        <h3 className="plan-name">{plan.name}</h3>
        <div className="price">
          {plan.price}
          <span>{plan.priceUnit}</span>
        </div>
      </div>

      <div className="quota">
        <span className="quota-value">{plan.quotaValue}</span>
        <span className="quota-label">{plan.quotaLabel}</span>
        {plan.multiplier ? (
          <span className="mult">{plan.multiplier}</span>
        ) : plan.ratio ? (
          <span className={plan.ratioFree ? "ratio free" : "ratio"}>
            {plan.ratio}
          </span>
        ) : null}
      </div>

      <div className="pd-specs">
        {plan.specs.map((spec) => (
          <div className="pd-spec" key={spec.label}>
            <span>{spec.label}</span>
            <b>{spec.value}</b>
          </div>
        ))}
      </div>

      <div className="pd-models">
        {plan.models.map((model) => (
          <span className="model-chip" key={model.name}>
            {model.name}
            {model.quota ? <b>{model.quota}</b> : null}
          </span>
        ))}
        {plan.moreModels ? (
          <span className="model-chip more">{plan.moreModels}</span>
        ) : null}
      </div>

      <div className="plan-foot">
        <span>更新 {plan.updated}</span>
        <a href={plan.source} target="_blank" rel="noreferrer">
          官网 <Icon name="external" className="icon icon-sm" />
        </a>
      </div>
    </article>
  );
}
