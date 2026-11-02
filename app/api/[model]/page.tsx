import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
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
    <div className="wrap api-detail-page">
      <h1 className="visually-hidden">{model.name}</h1>
      <div className="detail-top">
        <a className="back-arrow" href="/api/" aria-label="返回模型列表">
          <Icon name="arrow-left" />
        </a>
      </div>

      {price && channels.length > 0 ? (
        <>
          <div className="table-wrap api-detail-table">
            <table className="price-table">
              <thead>
                <tr>
                  <th>渠道</th>
                  <th>输入 / 1M</th>
                  <th>输出 / 1M</th>
                  <th>缓存命中 / 1M</th>
                  <th>计费</th>
                  <th>官网</th>
                </tr>
              </thead>
              <tbody>
                {channels.map((channel) => (
                  <tr key={channel.id}>
                    <td>
                      <div className="channel-cell">
                        <b>{channel.name}</b>
                        <span>{channel.provider}</span>
                      </div>
                    </td>
                    <td className="strong">{price.input}</td>
                    <td className="strong">{price.output}</td>
                    <td>{price.cached}</td>
                    <td>{channel.billing} · {channel.markup}</td>
                    <td className="r">
                      <a
                        className="link-arrow"
                        href={channel.source}
                        target="_blank"
                        rel="noreferrer"
                      >
                        官网 <Icon name="external" className="icon icon-sm" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="api-detail-foot">
            <p className="api-detail-note">
              价格按标准时段展示；高峰 / 低谷价以各渠道官网为准。
            </p>
            <span className="api-detail-date">最后核对 2026.11.02</span>
          </div>
        </>
      ) : null}
    </div>
  );
}
