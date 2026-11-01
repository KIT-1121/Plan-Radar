import { ModelDirectory, type ModelItem } from "@/components/ModelDirectory";
import { apiChannels } from "@/lib/api";
import { apisForModel, modelCatalog } from "@/lib/catalog";

export default function ApiPage() {
  const models: ModelItem[] = modelCatalog
    .map((model) => ({
      ...model,
      count: apisForModel(model.slug, apiChannels).length,
    }))
    .filter((model) => model.count > 0);

  return (
    <div className="wrap">
      <h1 className="visually-hidden">API</h1>
      <ModelDirectory
        models={models}
        mode="api"
        allHref="/api/all/"
        allLabel="全部 API"
      />
    </div>
  );
}
