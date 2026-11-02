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
      <header className="models-head">
        <h1>API</h1>
        <p>按模型列出，价格为公开的按量参考价，每百万 tokens 计。</p>
      </header>
      <ModelTable
        rows={rows}
        mode="api"
        allHref="/api/all/"
        allLabel="全部 API"
      />
    </div>
  );
}
