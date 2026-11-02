import Link from "next/link";
import { HeroSearch } from "@/components/HeroSearch";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { briefs, briefsUpdatedAt } from "@/lib/briefs";
import { updates } from "@/lib/plans";

export default function HomePage() {
  return (
    <>
      <section className="hero hero-centered">
        <div className="hero-atmosphere" aria-hidden="true">
          <span className="hero-grid-layer" />
          <span className="hero-bloom bloom-a" />
          <span className="hero-bloom bloom-b" />
          <span className="hero-top-fade" />
        </div>
        <div className="wrap hero-centered-inner">
          <Link className="hero-announce" href="/updates/" prefetch={false}>
            <span className="hero-announce-dot" />
            Claude 新档位：Max $100 / Ultra $200
            <span className="hero-announce-arrow">→</span>
          </Link>
          <h1 className="display">
            同样的 <em>$10</em>，
            <br />
            哪家给得更多？
          </h1>
          <HeroSearch />
          <div className="hero-actions">
            <Link className="hero-chip" href="/plans/" prefetch={false}>
              看套餐 <Icon name="arrow" className="icon icon-sm" />
            </Link>
            <Link className="hero-chip" href="/api/" prefetch={false}>
              看 API <Icon name="arrow" className="icon icon-sm" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2 className="section-title">最近更新</h2>
            </div>
            <a className="link-arrow" href="/updates/">
              全部动态 <Icon name="arrow" className="icon icon-sm" />
            </a>
          </Reveal>

          <Reveal className="updates">
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
          </Reveal>
        </div>
      </section>

      <section className="section briefs-section" aria-labelledby="briefs-title">
        <div className="wrap">
          <Reveal className="section-head briefs-head">
            <div>
              <h2 className="section-title" id="briefs-title">
                AI 科技简报
              </h2>
            </div>
            <span className="briefs-stamp">更新于 {briefsUpdatedAt}</span>
          </Reveal>

          <Reveal className="brief-grid">
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
                      <span className="brief-source">{item.source} ↗</span>
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}

