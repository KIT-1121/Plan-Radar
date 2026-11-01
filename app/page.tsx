import { Icon } from "@/components/Icon";
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
              <div className="eyebrow">Changelog</div>
              <h2 className="section-title">最近更新</h2>
            </div>
            <a className="link-arrow" href="/plans/all/">
              全部套餐 <Icon name="arrow" className="icon icon-sm" />
            </a>
          </div>

          <div className="updates">
            {updates.map((update) => (
              <a
                className="update-row"
                href={update.href}
                key={`${update.date}-${update.provider}`}
              >
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
              <div className="eyebrow">How it works</div>
              <h2 className="section-title">只看三件事</h2>
            </div>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-num">01</div>
              <div className="step-title">月费</div>
              <p className="step-desc">官网当前价格。按年付或首月优惠会单独标注。</p>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <div className="step-title">额度</div>
              <p className="step-desc">
                套餐里到底包含多少用量。美元额度、积分、请求数分开算。
              </p>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <div className="step-title">倍数</div>
              <p className="step-desc">额度 ÷ 月费。只在同币种额度时计算，不跨口径硬比。</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
