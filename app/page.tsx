import { Icon } from "@/components/Icon";
import { briefs, briefsUpdatedAt } from "@/lib/briefs";
import { updates } from "@/lib/plans";

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
          <div className="hero-actions">
            <a className="btn primary" href="/plans/">
              看套餐 <Icon name="arrow" />
            </a>
            <a className="btn secondary" href="/api/">
              看 API
            </a>
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

      <section className="section briefs-section" aria-labelledby="briefs-title">
        <div className="wrap">
          <div className="section-head briefs-head">
            <div>
              <h2 className="section-title" id="briefs-title">
                AI 科技简报
              </h2>
              <p className="briefs-sub">
                日报每天至少 3 条，周刊与月刊各收一份，只留重要进展。
              </p>
            </div>
            <span className="briefs-stamp">更新于 {briefsUpdatedAt}</span>
          </div>

          <div className="brief-grid">
            {briefs.map((brief) => (
              <article className="brief-card" key={brief.key}>
                <div className="brief-top">
                  <span className="brief-label">{brief.label}</span>
                  <span className="brief-count">{brief.items.length} 条</span>
                </div>
                <div className="brief-list">
                  {brief.items.map((item) => (
                    <a
                      className="brief-item"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      key={`${item.date}-${item.title}`}
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
