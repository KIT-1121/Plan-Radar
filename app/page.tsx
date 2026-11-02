import Link from "next/link";
import { HeroSearch } from "@/components/HeroSearch";
import { briefs, briefsUpdatedAt } from "@/lib/briefs";
import { modelCatalog } from "@/lib/catalog";
import { allPlans, updates } from "@/lib/plans";

const checkedAt = "2026.11.02";

const tenDollar = allPlans.filter(
  (plan) => plan.price === "$10" && plan.multiplier,
);
const widest = allPlans.filter((plan) => plan.multiplier).slice(0, 3);
const ledger = tenDollar.length >= 2 ? tenDollar.slice(0, 3) : widest;

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <p className="hero-stamp">
              <span>最后核对 {checkedAt}</span>
              <span>{allPlans.length} 个套餐</span>
              <span>{modelCatalog.length} 个模型</span>
            </p>
            <h1 className="display">
              同样的 <em>$10</em>，<br />
              哪家给得更多？
            </h1>
            <p className="lead">
              把各家 AI 编程套餐的月费、额度和模型并排放好，同样的钱能买到多少用量，一眼看清。
            </p>
            <div className="hero-actions">
              <HeroSearch />
              <Link className="hero-chip" href="/plans/" prefetch={false}>
                看套餐
              </Link>
              <Link className="hero-chip" href="/api/" prefetch={false}>
                看 API
              </Link>
            </div>
          </div>

          {ledger.length > 0 ? (
            <aside className="hero-ledger" aria-label="同价位套餐对比">
              <div className="ledger-head">
                <span>
                  {tenDollar.length >= 2 ? "同样的 $10" : "额度倍数最高"}
                </span>
                <span>额度与倍数</span>
              </div>
              {ledger.map((plan) => (
                <div className="ledger-row" key={plan.id}>
                  <span className="ledger-name">
                    <b>{plan.name}</b>
                    <span>{plan.provider}</span>
                  </span>
                  <span className="ledger-quota">{plan.quotaValue}</span>
                  <span className="ledger-mult">{plan.multiplier}</span>
                </div>
              ))}
              <p className="hero-ledger-foot">
                额度与月费同币种时才计算倍数，其余只展示原始额度。
              </p>
            </aside>
          ) : null}
        </div>
      </section>

      <section className="section" aria-labelledby="updates-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="section-title" id="updates-title">
              最近更新
            </h2>
            <Link className="link-arrow" href="/updates/">
              全部动态
            </Link>
          </div>

          <div className="updates">
            {updates.slice(0, 5).map((update) => (
              <a className="update-row" href={update.href} key={update.id}>
                <span className="update-date">{update.date}</span>
                <span className="update-provider">{update.provider}</span>
                <span className="update-text">
                  <b>{update.strong}</b> {update.text}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section briefs-section"
        aria-labelledby="briefs-title"
      >
        <div className="wrap">
          <div className="section-head briefs-head">
            <h2 className="section-title" id="briefs-title">
              AI 科技简报
            </h2>
            <span className="briefs-stamp">更新于 {briefsUpdatedAt}</span>
          </div>

          <div className="brief-grid">
            {briefs.map((brief) => (
              <article className="brief-card" key={brief.key}>
                <div className="brief-top">
                  <span className="brief-label">{brief.label}</span>
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
                      <span className="brief-source">{item.source}</span>
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
