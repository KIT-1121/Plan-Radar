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
      <h1 className="visually-hidden">{model.name}</h1>
      <div className="detail-top">
        <a className="back-arrow" href="/plans/" aria-label="返回模型列表">
          <Icon name="arrow-left" />
        </a>
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
