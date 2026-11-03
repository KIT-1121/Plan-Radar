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
      <p className="model-table-footnote">
        这里只列有套餐的 {rows.length} 个模型；全部 {modelCatalog.length} 个模型（含暂无公开套餐的）见{" "}
        <a href="/models/">模型库</a>。
      </p>
    </div>
  );
}
