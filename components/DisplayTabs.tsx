"use client";

import { usePathname } from "next/navigation";

export function DisplayTabs({ mode }: { mode: "plans" | "models" }) {
  const pathname = usePathname();
  const plansHref = pathname.startsWith("/cn") ? "/cn/" : "/global/";

  return (
    <div className="display-tabs">
      <a className={mode === "plans" ? "active" : undefined} href={plansHref}>
        按套餐
      </a>
      <a className={mode === "models" ? "active" : undefined} href="/models/">
        按模型
      </a>
    </div>
  );
}
