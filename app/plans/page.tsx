import { ModelTable, type ModelRow } from "@/components/ModelTable";
import { tokenPrices } from "@/lib/api";
import {
  modelCatalog,
  modelContexts,
  plansForModel,
} from "@/lib/catalog";
import { allPlans } from "@/lib/plans";

export default function PlansPage() {
  const rows: ModelRow[] = modelCatalog
    .map((model) => ({
      ...model,
      context: modelContexts[model.slug] ?? "—",
      count: plansForModel(model.slug, allPlans).length,
      price: tokenPrices.find((price) => price.slug === model.slug) ?? null,
    }))
    .filter((row) => row.count > 0);

  return (
    <div className="wrap">
      <h1 className="visually-hidden">套餐</h1>
      <ModelTable
        rows={rows}
        mode="plans"
        allHref="/plans/all/"
        allLabel="全部套餐"
      />
    </div>
  );
}
