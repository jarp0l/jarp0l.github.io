"use client";
import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";

export function Provider({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      search={{
        links: [
          ["Knowledge Base", "/kb"],
          ["Blog", "/blog"],
        ],
        options: { type: "static" },
      }}
    >
      {children}
    </RootProvider>
  );
}
