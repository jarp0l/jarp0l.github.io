"use client"; // Needed to use the "usePathname" hook, which in turn is needed for search to work on blog posts

import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./global.css";
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Default options for the search when pathname is not yet available
  // We're using "use client", so this is needed to avoid a flash of content
  const defaultOptions = {
    api: "/api/search", // By default this path uses kbSource in the backend
  };

  // If the pathname includes "/blog", use the API for blogSource
  const searchOptions = pathname?.includes("/blog")
    ? { api: "/api/search/blog" }
    : defaultOptions; // Fallback to default options

  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          search={{
            links: [
              ["Knowledge Base", "/kb"],
              ["Blog", "/blog"],
            ],
            options: searchOptions,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
