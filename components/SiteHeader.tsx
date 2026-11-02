"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 16);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
      <span className="scroll-progress" aria-hidden="true" />
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
            const active =
              target === "/"
                ? path === "/"
                : path === target || path.startsWith(`${target}/`);
            return (
              <a
                key={item.href}
                href={item.href}
                className={active ? "active" : undefined}
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
