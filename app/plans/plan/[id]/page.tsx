import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { allPlans, getPlanById, type Plan } from "@/lib/plans";

const kindLabels: Record<Plan["kind"], string> = {
  usd: "美元额度",
  credits: "积分",
  window: "按窗口",
  request: "按请求",
  free: "免费",
};

export function generateStaticParams() {
  return allPlans.map((plan) => ({ id: plan.id }));
}

export default async function PlanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plan = getPlanById(id);
  if (!plan) notFound();

  return (
    <div className="wrap plan-page">
      <div className="detail-top">
        <a className="back-arrow" href="/plans/all/" aria-label="返回全部套餐">
          <Icon name="arrow-left" />
        </a>
      </div>

      <header className="plan-page-head">
        <div className="eyebrow">
          {plan.provider} · {kindLabels[plan.kind]}
        </div>
        <h1>{plan.name}</h1>
        <div className="plan-page-price">
          {plan.price}
          <span>{plan.priceUnit}</span>
        </div>
        <p className="lead">
          {plan.quotaValue} {plan.quotaLabel}
          {plan.tokenEstimate ? `（${plan.tokenEstimate}）` : ""}
        </p>
      </header>

      <div className="plan-detail-grid">
        <section className="plan-detail-section">
          <h2>价格与额度</h2>
          <div className="plan-fact-grid">
            <div>
              <span>月费</span>
              <b>
                {plan.price} {plan.priceUnit}
              </b>
            </div>
            <div>
              <span>额度</span>
              <b>
                {plan.quotaValue} {plan.quotaLabel}
              </b>
            </div>
            {plan.multiplier ? (
              <div>
                <span>额度倍率</span>
                <b>{plan.multiplier}</b>
              </div>
            ) : null}
            {plan.ratio ? (
              <div>
                <span>折算</span>
                <b>{plan.ratio}</b>
              </div>
            ) : null}
            {plan.tokenEstimate ? (
              <div>
                <span>估算 token</span>
                <b>{plan.tokenEstimate}</b>
              </div>
            ) : null}
          </div>
        </section>

        <section className="plan-detail-section">
          <h2>规格</h2>
          <div className="plan-spec-grid">
            {plan.specs.map((spec) => (
              <div key={spec.label}>
                <span>{spec.label}</span>
                <b>{spec.value}</b>
              </div>
            ))}
          </div>
        </section>

        <section className="plan-detail-section wide">
          <h2>包含模型</h2>
          <div className="plan-model-list">
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
        </section>

        <section className="plan-detail-section wide">
          <h2>说明</h2>
          <dl className="plan-meta-list">
            <div>
              <dt>类型</dt>
              <dd>{kindLabels[plan.kind]}</dd>
            </div>
            <div>
              <dt>标签</dt>
              <dd>{plan.tag}</dd>
            </div>
            <div>
              <dt>更新</dt>
              <dd>{plan.updated}</dd>
            </div>
            <div>
              <dt>官网</dt>
              <dd>
                <a href={plan.source} target="_blank" rel="noreferrer">
                  查看官方说明 <Icon name="external" className="icon icon-sm" />
                </a>
              </dd>
            </div>
          </dl>
          <p className="note">
            完整价格、额度、模型与限制以官网文档为准。
          </p>
        </section>
      </div>
    </div>
  );
}
