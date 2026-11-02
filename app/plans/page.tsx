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
      <header className="models-head">
        <h1>套餐</h1>
        <p>
          按模型列出。点一行看包含该模型的套餐与价格，价格为官网公开价。
        </p>
      </header>
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
