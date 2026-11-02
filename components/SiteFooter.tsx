"use client";

import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  const path = pathname.replace(/\/+$/, "") || "/";
  const isSponsor = path === "/sponsor";

  return (
    <footer className={isSponsor ? "site-footer sponsor-footer" : "site-footer"}>
      <div
        className={`wrap footer-inner${isSponsor ? "" : " footer-compact"}`}
      >
        <span>
          {isSponsor
            ? "Plan-Radar 是一个人维护的小站。数据来自各官网，价格与额度以官网为准，最后核对时间 2026.11.02"
            : "最后核对 2026.11.02"}
        </span>
      </div>
    </footer>
  );
}
