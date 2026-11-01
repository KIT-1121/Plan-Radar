import { Icon } from "@/components/Icon";
import { briefs } from "@/lib/briefs";
import { updates } from "@/lib/plans";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">AI 套餐比价 · 每日更新</div>
            <h1 className="display" style={{ marginTop: 22 }}>
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
          </div>

          <aside className="hero-aside">
            <div className="hero-stat">
              <b>12</b>
              <span>个套餐</span>
            </div>
            <div className="hero-stat">
              <b>3</b>
              <span>个 API</span>
            </div>
            <div className="hero-stat">
              <b>11.01</b>
              <span>最后核对</span>
            </div>
          </aside>
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
            {updates.map((update) => (
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

      <section className="section tight">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">科技简报</div>
              <h2 className="section-title">日报 · 周刊 · 月刊</h2>
            </div>
            <p>每天看变化，每周看趋势，每月看回顾。</p>
          </div>

          <div className="brief-grid">
            {briefs.map((brief) => (
              <article className="brief-card" key={brief.key}>
                <div className="brief-top">
                  <span className="brief-label">{brief.label}</span>
                  <span className="brief-count">{brief.items.length} 条</span>
                </div>
                <h3>{brief.title}</h3>
                <p className="brief-desc">{brief.description}</p>
                <div className="brief-list">
                  {brief.items.map((item) => (
                    <a className="brief-item" href={item.href} key={item.title}>
                      <span className="brief-date">{item.date}</span>
                      <b>{item.title}</b>
                      <span className="brief-summary">{item.summary}</span>
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
