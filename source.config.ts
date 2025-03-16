import { defineConfig, defineDocs, frontmatterSchema } from "fumadocs-mdx/config";
import { z } from "zod";

export const kb = defineDocs({
  dir: "content/kb",
});

export const blog = defineDocs({
  dir: "content/blog",
  docs: {
    // async: true,
    schema: frontmatterSchema.extend({
      date: z.date(z.string()).or(z.date()),
    }),
  },
});

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    // MDX options
  },
});
