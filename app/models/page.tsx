import { DisplayTabs } from "@/components/DisplayTabs";
import { deepseekBars, deepseekOffers, modelChips } from "@/lib/models";

export default function ModelsPage() {
  return (
    <div className="wrap">
      <div className="page-head page-head-row">
        <div>
          <div className="eyebrow">By model · DeepSeek V4.1 Flash</div>
          <h1 className="display">按模型比价</h1>
          <p className="lead">
            同一个模型，不同套餐和 API 渠道的实际单价。先看 DeepSeek V4.1 Flash。
          </p>
        </div>
        <DisplayTabs mode="models" />
      </div>

      <div className="chips" style={{ marginTop: 26 }}>
        {modelChips.map((model) =>
          model.active ? (
            <span className="chip active" key={model.id}>
              {model.name} <span className="n">{model.count}</span>
            </span>
          ) : (
            <span className="chip disabled" key={model.id}>
              {model.name} <span className="n">待核验</span>
            </span>
          ),
        )}
      </div>

      <div className="model-summary">
        <div>
          <span>官方 API 参考价</span>
          <b>$0.30 / $1.20</b>
          <small>输入 / 输出，每 1M tokens</small>
        </div>
        <div>
          <span>最低套餐价</span>
          <b>官方 10%</b>
          <small>OpenCode Go / CommandCode GOAT</small>
        </div>
        <div>
          <span>覆盖渠道</span>
          <b>6 个</b>
          <small>3 个订阅 · 3 个按量</small>
        </div>
      </div>

      <div className="bar-list">
        {deepseekBars.map((bar) => (
          <div className="bar-row" key={bar.label}>
            <span className="bar-label">{bar.label}</span>
            <div className="bar-track">
              <i
                className={bar.accent ? "bar-fill accent" : "bar-fill"}
                style={{ width: `${bar.width}%` }}
              />
            </div>
            <span className="bar-val">{bar.value}</span>
          </div>
        ))}
      </div>

      <div className="section-head" style={{ marginTop: 52 }}>
        <div>
          <div className="eyebrow">Offers</div>
          <h2 className="section-title">6 个渠道</h2>
        </div>
        <p>订阅把额度打包；按量按 token 计费。实际单价都相对官方 API。</p>
      </div>

      <div className="table-wrap">
        <table className="price-table">
          <thead>
            <tr>
              <th>渠道</th>
              <th>类型</th>
              <th>月费</th>
              <th>DeepSeek V4.1 Flash 额度</th>
              <th>折算</th>
              <th>实际单价</th>
              <th>限制</th>
              <th>更新</th>
            </tr>
          </thead>
          <tbody>
            {deepseekOffers.map((offer) => (
              <tr key={offer.channel}>
                <td>
                  <div className="plan-cell">
                    <span className="provider-mark">{offer.mark}</span>
                    <span>
                      <b>{offer.channel}</b>
                      <span>
                        {offer.provider}{" "}
                        <span className="region-tag">{offer.region}</span>
                      </span>
                    </span>
                  </div>
                </td>
                <td>{offer.type}</td>
                <td className="strong">{offer.price}</td>
                <td>{offer.quota}</td>
                <td>
                  {offer.multiplier === "10×" ? (
                    <span className="mult">10×</span>
                  ) : (
                    <span className="ratio">1×</span>
                  )}
                </td>
                <td className={offer.effective === "官方 10%" ? "strong" : undefined}>
                  {offer.effective}
                </td>
                <td>{offer.limit}</td>
                <td>{offer.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="note">
        $100 额度 ÷ $10 月费 = 10×，相当于官方 API 的 1 折。官方参考价按 OpenCode
        Console 的 DeepSeek V4.1 Flash 按量价（$0.30 / $1.20 每 1M tokens）计算；
        套餐额度以官网为准。
      </p>
    </div>
  );
}
