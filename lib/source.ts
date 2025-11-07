import { blog, notes } from "@/.source";
import { loader } from "fumadocs-core/source";

export const  notesSource = loader({
  baseUrl: "/notes",
  source:  notes.toFumadocsSource(),
});

export const blogSource = loader({
  baseUrl: "/blog",
  source: blog.toFumadocsSource(),
});
