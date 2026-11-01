import { ApiCard } from "@/components/ApiCard";
import { DisplayTabs } from "@/components/DisplayTabs";
import { apiChannels, tokenPrices } from "@/lib/api";

export default function ApiPage() {
  return (
    <div className="wrap">
      <div className="page-head page-head-row">
        <div>
          <div className="eyebrow">API · 3 channels</div>
          <h1 className="display">API</h1>
          <p className="lead">
            按 token 计费，或按量中转。官方价与渠道价放在一起。
          </p>
        </div>
        <DisplayTabs mode="api" />
      </div>

      <div className="api-grid">
        {apiChannels.map((channel) => (
          <ApiCard key={channel.id} channel={channel} />
        ))}
      </div>

      <div className="section-head" style={{ marginTop: 52 }}>
        <div>
          <div className="eyebrow">Token prices</div>
          <h2 className="section-title">官方 API 价目表</h2>
        </div>
        <p>每 1M tokens。OpenCode Console 的按量参考价，最后核对 2026.11.01。</p>
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
              <tr key={price.model}>
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
        <a className="btn secondary small" href="/models/">
          看按模型比价
        </a>
      </div>

      <p className="note">
        价格为 OpenCode Console 的按量参考价；不同渠道可能略有差异，以官网为准。
        订阅套餐与 API 是两种计费方式，页面不把两者混成同一个排名。
      </p>
    </div>
  );
}
