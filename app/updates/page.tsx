import { Icon } from "@/components/Icon";
import { updates } from "@/lib/plans";

export default function UpdatesPage() {
  return (
    <div className="wrap updates-page">
      <div className="detail-top">
        <a className="back-arrow" href="/" aria-label="返回首页">
          <Icon name="arrow-left" />
        </a>
      </div>

      <header className="updates-head">
        <div className="eyebrow">更新动态</div>
        <h1>全部动态</h1>
        <p>套餐与 API 的价格、额度、模型变化，按时间倒序。</p>
      </header>

      <div className="updates-list">
        {updates.map((update) => (
          <article className="update-detail" id={update.id} key={update.id}>
            <div className="update-detail-meta">
              <span className="update-date">{update.date}</span>
              <span className={`update-kind ${update.kind}`}>
                {update.kind === "api" ? "API" : "套餐"}
              </span>
              <span>{update.provider}</span>
            </div>

            <h2>{update.strong}</h2>
            <p className="update-lead">{update.text}</p>
            <p className="update-summary">{update.summary}</p>

            <ul className="update-points">
              {update.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>

            <div className="update-links">
              <a className="link-arrow" href={update.related}>
                查看相关页面 <Icon name="arrow" className="icon icon-sm" />
              </a>
              <a
                className="link-arrow"
                href={update.source}
                target="_blank"
                rel="noreferrer"
              >
                官网 <Icon name="external" className="icon icon-sm" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
