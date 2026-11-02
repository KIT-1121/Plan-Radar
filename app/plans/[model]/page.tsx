import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { PlanCard } from "@/components/PlanCard";
import {
  getModel,
  modelCatalog,
  plansForModel,
} from "@/lib/catalog";
import { allPlans } from "@/lib/plans";
import type { Plan } from "@/lib/plans";

export function generateStaticParams() {
  return modelCatalog.map((model) => ({ model: model.slug }));
}

function moneyValue(value?: string) {
  if (!value) return null;
  const number = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(number) && number > 0 ? number : null;
}

function ratioLabel(quota: string | undefined, price: string) {
  const quotaValue = moneyValue(quota);
  const priceValue = moneyValue(price);
  if (!quotaValue || !priceValue) return undefined;
  const ratio = quotaValue / priceValue;
  const rounded = Math.round(ratio * 100) / 100;
  return `${rounded}×`;
}

export default async function ModelPlansPage({
  params,
}: {
  params: Promise<{ model: string }>;
}) {
  const { model: slug } = await params;
  const model = getModel(slug);
  if (!model) notFound();

  const plans: Plan[] = plansForModel(slug, allPlans).map((plan) => {
    const match = plan.models.find((item) => model.aliases.includes(item.name));
    const quota = match?.quota;
    const ratio =
      quota && plan.kind === "usd" ? ratioLabel(quota, plan.price) : undefined;

    return {
      ...plan,
      quotaValue: match ? quota ?? plan.quotaValue : plan.quotaValue,
      quotaLabel: match ? `${model.name} 额度` : plan.quotaLabel,
      multiplier: quota ? ratio : plan.multiplier,
      tokenEstimate: undefined,
    };
  });

  const groups: { provider: string; plans: Plan[] }[] = [];
  plans.forEach((plan) => {
    let group = groups.find((item) => item.provider === plan.provider);
    if (!group) {
      group = { provider: plan.provider, plans: [] };
      groups.push(group);
    }
    group.plans.push(plan);
  });

  return (
    <div className="wrap">
      <div className="detail-top">
        <a className="back-arrow" href="/plans/" aria-label="返回模型列表">
          <Icon name="arrow-left" />
        </a>
      </div>

      <header className="model-plans-head">
        <div className="eyebrow">
          {model.provider} · {model.family}
        </div>
        <h1>{model.name}</h1>
        <p>
          {plans.length > 0
            ? `${groups.length} 个厂商、${plans.length} 个套餐包含该模型`
            : "暂无包含该模型的套餐"}
        </p>
      </header>

      {plans.length > 0 ? (
        <div className="plan-groups">
          {groups.map((group) => (
            <div className="plan-group" key={group.provider}>
              <div className="plan-group-row">
                {group.plans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} compact hideModels />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">暂无包含该模型的套餐。</div>
      )}
    </div>
  );
}
