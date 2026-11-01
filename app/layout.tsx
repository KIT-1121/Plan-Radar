import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { LinkPreviewGuard } from "@/components/LinkPreviewGuard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Plan-Radar",
  description: "把 AI 编程套餐的月费和额度放在一张桌上。",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <LinkPreviewGuard />
      </body>
    </html>
  );
}
