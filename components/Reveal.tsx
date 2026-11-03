"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * 进入视口时淡入上移。
 * - 没有 IntersectionObserver 时直接显示
 * - prefers-reduced-motion 时由 CSS 关掉位移和过渡
 */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      element.classList.add("is-in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
          } else {
            entry.target.classList.remove("is-in");
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className ? `reveal ${className}` : "reveal"}>
      {children}
    </div>
  );
}
