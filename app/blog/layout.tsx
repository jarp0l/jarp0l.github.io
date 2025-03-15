import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { blogSource } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions}
      tree={blogSource.pageTree}
      sidebar={{
        defaultOpenLevel: 2,
      }}
    >
      {children}
    </DocsLayout>
  );
}
