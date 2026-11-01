"use client";

import { usePathname } from "next/navigation";
import { Icon } from "./Icon";

const items = [
  { href: "/", label: "首页" },
  { href: "/plans/", label: "套餐" },
  { href: "/api/", label: "API" },
  { href: "/sponsor/", label: "赞助" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const path = pathname.replace(/\/+$/, "") || "/";

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a className="brand" href="/">
          <span className="brand-mark">
            <Icon name="radar" />
          </span>
          Plan-Radar
        </a>

        <nav className="nav">
          {items.map((item) => {
            const target = item.href.replace(/\/+$/, "") || "/";
            return (
              <a
                key={item.href}
                href={item.href}
                className={path === target ? "active" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
