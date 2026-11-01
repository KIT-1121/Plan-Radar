import { Icon } from "@/components/Icon";

export default function SponsorPage() {
  return (
    <>
      <section className="support-hero">
        <div className="wrap support-hero-grid">
          <div className="support-hero-copy">
            <h1 className="display" style={{ marginTop: 20 }}>
              不卖套餐，
              <br />
              只帮你少花冤枉钱。
            </h1>
            <p className="lead">
              如果这个站帮你选对了套餐，欢迎给个 Star，或者请作者喝杯咖啡。
            </p>
          </div>

          <aside className="support-panel">
            <div className="support-panel-top">
              <div className="support-panel-head">
                <span className="support-icon">
                  <Icon name="github" />
                </span>
                <div>
                  <h3>给个 Star</h3>
                  <p>Star 是继续更新的最大动力。</p>
                </div>
                <a
                  className="btn small support-panel-btn"
                  href="https://github.com/KIT-1121/Plan-Radar"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="star" /> 去 GitHub
                </a>
              </div>
            </div>

            <div className="support-panel-bottom">
              <div className="support-panel-head">
                <span className="support-icon">
                  <Icon name="coffee" />
                </span>
                <div>
                  <h3>请作者喝咖啡</h3>
                  <p>赞助用于服务器、数据核验和下一版开发。</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <div className="wrap">
        <div className="correction">
          <h3>如果错误，请联系作者</h3>
          <a className="btn secondary small" href="mailto:hello@plan-radar.dev">
            <Icon name="mail" className="icon icon-sm" /> 站长邮件
          </a>
        </div>
      </div>
    </>
  );
}
