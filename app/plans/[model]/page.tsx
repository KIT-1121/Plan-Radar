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

export default async function ModelPlansPage({
  params,
}: {
  params: Promise<{ model: string }>;
}) {
  const { model: slug } = await params;
  const model = getModel(slug);
  if (!model) notFound();

  const plans = plansForModel(slug, allPlans);
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
        <a className="link-arrow" href="/plans/">
          ← 全部模型
        </a>
        <a className="link-arrow" href={`/api/${slug}/`}>
          在 API 中查看 <Icon name="arrow" className="icon icon-sm" />
        </a>
      </div>

      <header className="model-head">
        <div>
          <div className="eyebrow">
            {model.provider} · {model.family}
          </div>
          <h1>{model.name}</h1>
          <p>{model.note}</p>
        </div>
      </header>

      <div className="catalog-result">
        <span>
          包含该模型的套餐 <b>{plans.length}</b> 个
        </span>
        <a href="/plans/all/">全部套餐</a>
      </div>

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
