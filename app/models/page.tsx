import { ModelDirectory, type ModelDirectoryRow } from "@/components/ModelDirectory";
import { tokenPrices } from "@/lib/api";
import {
  getModelCountry,
  modelCatalog,
  modelContexts,
  plansForModel,
} from "@/lib/catalog";
import { allPlans } from "@/lib/plans";

export default function ModelsPage() {
  const rows: ModelDirectoryRow[] = modelCatalog.map((model) => {
    const price = tokenPrices.find((item) => item.slug === model.slug);
    return {
      slug: model.slug,
      name: model.name,
      provider: model.provider,
      family: model.family,
      country: getModelCountry(model.slug),
      note: model.note,
      context: modelContexts[model.slug] ?? "—",
      price: price ? { input: price.input, output: price.output } : null,
      plans: plansForModel(model.slug, allPlans).length,
    };
  });

  const countries = new Set(rows.map((row) => row.country));

  return (
    <div className="wrap models-page">
      <header className="models-head">
        <div className="eyebrow">Models by country</div>
        <h1 className="display">模型库</h1>
        <p className="lead">
          按国家与地区收录的模型目录，共 {rows.length} 个模型、{countries.size} 个国家或地区。
          价格是各厂商公开 API 的每百万 tokens 参考价，没有公开报价的标为“暂无公开报价”。
        </p>
      </header>

      <ModelDirectory rows={rows} />

      <p className="note">
        部分国家或地区的模型没有公开 API 报价，这里仅收录名称与提供方；
        版本、可用性与价格以厂商官网为准。
      </p>
    </div>
  );
}
