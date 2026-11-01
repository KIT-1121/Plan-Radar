import { ModelTable, type ModelRow } from "@/components/ModelTable";
import { apiChannels, tokenPrices } from "@/lib/api";
import {
  apisForModel,
  modelCatalog,
  modelContexts,
} from "@/lib/catalog";

export default function ApiPage() {
  const rows: ModelRow[] = modelCatalog
    .map((model) => ({
      ...model,
      context: modelContexts[model.slug] ?? "—",
      count: apisForModel(model.slug, apiChannels).length,
      price: tokenPrices.find((price) => price.slug === model.slug) ?? null,
    }))
    .filter((row) => row.count > 0);

  return (
    <div className="wrap">
      <h1 className="visually-hidden">API</h1>
      <ModelTable rows={rows} mode="api" />
    </div>
  );
}
