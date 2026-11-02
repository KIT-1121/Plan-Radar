"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main
      key={pathname}
      className={isHome ? "page-main page-home" : "page-main"}
    >
      {children}
    </main>
  );
}
