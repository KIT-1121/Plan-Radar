import { ApiCard } from "@/components/ApiCard";
import { Icon } from "@/components/Icon";
import { apiChannels, tokenPrices } from "@/lib/api";

export default function AllApiPage() {
  return (
    <div className="wrap">
      <div className="detail-top">
        <a className="back-arrow" href="/api/" aria-label="返回 API 列表">
          <Icon name="arrow-left" />
        </a>
      </div>

      <header className="models-head">
        <h1>全部 API</h1>
        <p>{apiChannels.length} 个渠道，价格按每百万 tokens 计。</p>
      </header>

      <div className="api-grid">
        {apiChannels.map((channel) => (
          <ApiCard key={channel.id} channel={channel} />
        ))}
      </div>

      <div className="section-head" style={{ marginTop: 52 }}>
        <div>
          <h2 className="section-title">官方 API 价目表</h2>
        </div>
      </div>

      <div className="table-wrap">
        <table className="price-table">
          <thead>
            <tr>
              <th>模型</th>
              <th>输入 / 1M</th>
              <th>输出 / 1M</th>
              <th>缓存读 / 1M</th>
              <th>备注</th>
            </tr>
          </thead>
          <tbody>
            {tokenPrices.map((price) => (
              <tr key={price.slug}>
                <td className="strong">{price.model}</td>
                <td>{price.input}</td>
                <td>{price.output}</td>
                <td>{price.cached}</td>
                <td>{price.note ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="api-callout">
        <div>
          <h3>订阅比 API 便宜</h3>
          <p>OpenCode Go $10 → $100 额度，等于官方 API 的 10%。</p>
        </div>
        <a className="btn secondary small" href="/plans/deepseek-v4-1-flash/">
          看该模型的套餐 <Icon name="arrow" className="icon icon-sm" />
        </a>
      </div>

      <p className="note">
        价格为 OpenCode Console 的按量参考价；不同渠道可能略有差异，以官网为准。
        订阅套餐与 API 是两种计费方式，页面不把两者混成同一个排名。
      </p>
    </div>
  );
}
