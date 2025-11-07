/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate, formatISO8601, toDateObject } from "@/lib/date-utils";
import { getMDXComponents } from "@/lib/mdx-components";
import { blogSource } from "@/lib/source";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = blogSource.getPage(params.slug);

  if (!page) notFound();

  const { body: Mdx, toc, date, lastModified } = page.data;

  const dateObj = toDateObject(date);
  const formattedDate = formatDate(dateObj);
  const isoDate = formatISO8601(dateObj);

  return (
    <DocsPage
      toc={toc}
      lastUpdate={lastModified}
      full={page.data.full}
      tableOfContent={{ style: "clerk" }}
      tableOfContentPopover={{ style: "clerk" }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <div className="publishedOn mb-8 text-sm underline underline-offset-8">
        <p className="text-fd-muted-foreground" title={isoDate}>
          <span>Published:</span> {formattedDate}
        </p>
      </div>
      <DocsBody>
        <Mdx
          components={getMDXComponents({
            img: (props) => <ImageZoom {...(props as any)} />,
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return blogSource.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = blogSource.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
