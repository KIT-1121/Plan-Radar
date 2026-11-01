import { notFound } from "next/navigation";
import { ApiCard } from "@/components/ApiCard";
import { apiChannels, tokenPrices } from "@/lib/api";
import {
  apisForModel,
  getModel,
  modelCatalog,
} from "@/lib/catalog";

export function generateStaticParams() {
  return modelCatalog.map((model) => ({ model: model.slug }));
}

export default async function ModelApiPage({
  params,
}: {
  params: Promise<{ model: string }>;
}) {
  const { model: slug } = await params;
  const model = getModel(slug);
  if (!model) notFound();

  const channels = apisForModel(slug, apiChannels);
  const price = tokenPrices.find((item) => item.slug === slug);

  return (
    <div className="wrap">
      <h1 className="visually-hidden">{model.name}</h1>
      <div className="detail-top">
        <a className="link-arrow" href="/api/">
          ← 全部模型
        </a>
      </div>

      {price ? (
        <div className="token-strip">
          <div>
            <span>输入 / 1M</span>
            <b>{price.input}</b>
          </div>
          <div>
            <span>输出 / 1M</span>
            <b>{price.output}</b>
          </div>
          <div>
            <span>缓存读 / 1M</span>
            <b>{price.cached}</b>
          </div>
        </div>
      ) : (
        <p className="note">该模型暂无公开 token 价目，具体价格以渠道官网为准。</p>
      )}

      {channels.length > 0 ? (
        <div className="api-grid">
          {channels.map((channel) => (
            <ApiCard key={channel.id} channel={channel} />
          ))}
        </div>
      ) : (
        <div className="empty">暂无提供该模型的 API 渠道。</div>
      )}
    </div>
  );
}
