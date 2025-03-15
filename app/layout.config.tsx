import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Library, NotebookPen } from "lucide-react";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/kb/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Logo"
        >
          <circle cx={12} cy={12} r={12} fill="#132257" />
        </svg>
        Hello, World!
      </>
    ),
  },
  links: [
    {
      icon: <Library />,
      text: "Knowledge Base",
      url: "/kb",
      active: "nested-url",
    },
    {
      icon: <NotebookPen />,
      text: "Blog",
      url: "/blog",
      active: "nested-url",
    },
  ],
};
