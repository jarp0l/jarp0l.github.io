import { blog, kb } from "@/.source";
import { loader } from "fumadocs-core/source";

export const kbSource = loader({
  baseUrl: "/kb",
  source: kb.toFumadocsSource(),
});

export const blogSource = loader({
  baseUrl: "/blog",
  source: blog.toFumadocsSource(),
});
