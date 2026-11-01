import type { ApiChannel } from "@/lib/api";
import { Icon } from "./Icon";

export function ApiCard({ channel }: { channel: ApiChannel }) {
  return (
    <article className="plan-card api-card">
      <div className="plan-top">
        <span className="provider-name">{channel.provider}</span>
        <span className="tag">按量</span>
      </div>

      <div className="pd-title-row">
        <h3 className="plan-name">{channel.name}</h3>
        <div className="price">{channel.price}</div>
      </div>

      <div className="quota">
        <span className="quota-value">{channel.priceNote}</span>
        <span className="quota-label">{channel.billing}</span>
        <span className="ratio">{channel.markup}</span>
      </div>

      <div className="pd-specs">
        {channel.specs.map((spec) => (
          <div className="pd-spec" key={spec.label}>
            <span>{spec.label}</span>
            <b>{spec.value}</b>
          </div>
        ))}
      </div>

      <div className="plan-foot">
        <span>更新 {channel.updated}</span>
        <a href={channel.source} target="_blank" rel="noreferrer">
          官网 <Icon name="external" className="icon icon-sm" />
        </a>
      </div>
    </article>
  );
}
