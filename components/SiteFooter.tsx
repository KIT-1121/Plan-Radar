"use client";

import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  const path = pathname.replace(/\/+$/, "") || "/";
  const isSponsor = path === "/sponsor";

  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <span>
          {isSponsor
            ? "Plan-Radar 是一个人维护的小站。数据来自各官网，价格与额度以官网为准，最后核对时间 2026.11.01"
            : "Plan-Radar · 价格来自官网，最后核对 2026.11.01"}
        </span>
        <div className="footer-links">
          <a href="/">首页</a>
          <a
            href="https://github.com/KIT-1121/Plan-Radar"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
