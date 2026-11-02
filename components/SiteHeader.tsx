"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";

const items = [
  { href: "/", label: "首页" },
  { href: "/plans/", label: "套餐" },
  { href: "/models/", label: "模型" },
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
        <Link className="brand" href="/" prefetch={false}>
          <span className="brand-mark">
            <Icon name="radar" />
          </span>
          Plan-Radar
        </Link>

        <nav className="nav">
          {items.map((item) => {
            const target = item.href.replace(/\/+$/, "") || "/";
            const active =
              target === "/"
                ? path === "/"
                : path === target || path.startsWith(`${target}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className={active ? "active" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

