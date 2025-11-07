import { defineConfig, defineDocs, frontmatterSchema } from "fumadocs-mdx/config";
import { z } from "zod";

export const notes = defineDocs({
  dir: "content/notes",
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string().pipe(z.coerce.date()).or(z.date()).optional(),
      // Allows overriding the last modified date from frontmatter
      lastModified: z.string().pipe(z.coerce.date()).or(z.date()).optional(),
    }),
  },
});

export const blog = defineDocs({
  dir: "content/blog",
  docs: {
    // async: true,
    schema: frontmatterSchema.extend({
      date: z.string().pipe(z.coerce.date()).or(z.date()),
      // Allows overriding the last modified date from frontmatter
      lastModified: z.string().pipe(z.coerce.date()).or(z.date()).optional(),
    }),
  },
});

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    // MDX options
  },
});
