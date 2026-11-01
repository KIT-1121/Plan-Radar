import { Icon } from "@/components/Icon";
import { apiChannels } from "@/lib/api";
import { briefs } from "@/lib/briefs";
import { modelCatalog } from "@/lib/catalog";
import { allPlans, updates } from "@/lib/plans";

export default function HomePage() {
  return (
    <>
      <section className="hero hero-centered">
        <div className="wrap hero-centered-inner">
          <h1 className="display">
            同样的 <em>$10</em>，
            <br />
            哪家给得更多？
          </h1>
          <p className="lead">把 AI 编程套餐的月费和额度放在一张桌上。</p>
          <div className="hero-actions">
            <a className="btn primary" href="/plans/">
              看套餐 <Icon name="arrow" />
            </a>
            <a className="btn secondary" href="/api/">
              看 API
            </a>
          </div>
          <div className="hero-meta">
            <span>{modelCatalog.length} 个模型</span>
            <span className="dot" />
            <span>{allPlans.length} 个套餐</span>
            <span className="dot" />
            <span>{apiChannels.length} 个 API 渠道</span>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2 className="section-title">最近更新</h2>
            </div>
            <a className="link-arrow" href="/updates/">
              全部动态 <Icon name="arrow" className="icon icon-sm" />
            </a>
          </div>

          <div className="updates">
            {updates.slice(0, 5).map((update) => (
              <a className="update-row" href={update.href} key={update.id}>
                <span className="update-date">{update.date}</span>
                <span className="update-provider">{update.provider}</span>
                <span className="update-text">
                  <b>{update.strong}</b> {update.text}
                </span>
                <span className="update-arrow">
                  <Icon name="arrow" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight" aria-label="AI 科技新闻">
        <div className="wrap">
          <div className="brief-grid">
            {briefs.map((brief) => (
              <article className="brief-card" key={brief.key}>
                <span className="brief-label">{brief.label}</span>
                <div className="brief-list">
                  {brief.items.map((item) => (
                    <a
                      className="brief-item"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      key={item.title}
                    >
                      <span className="brief-date">{item.date}</span>
                      <b>{item.title}</b>
                      <span className="brief-summary">{item.summary}</span>
                      <span className="brief-source">{item.source} ↗</span>
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
