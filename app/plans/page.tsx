import { ModelDirectory, type ModelItem } from "@/components/ModelDirectory";
import { modelCatalog, plansForModel } from "@/lib/catalog";
import { allPlans } from "@/lib/plans";

export default function PlansPage() {
  const models: ModelItem[] = modelCatalog
    .map((model) => ({
      ...model,
      count: plansForModel(model.slug, allPlans).length,
    }))
    .filter((model) => model.count > 0);

  return (
    <div className="wrap">
      <h1 className="visually-hidden">套餐</h1>
      <ModelDirectory
        models={models}
        mode="plans"
        allHref="/plans/all/"
        allLabel="全部套餐"
      />
    </div>
  );
}
