/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate, formatISO8601, toDateObject } from "@/lib/date-utils";
import { getMDXComponents } from "@/lib/mdx-components";
import { notesSource } from "@/lib/source";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = notesSource.getPage(params.slug);

  if (!page) notFound();

  const { body: Mdx, toc, date, lastModified } = page.data;

  // Only display date if it exists in frontmatter
  const dateDisplay = date ? (
    <>
      {(() => {
        const dateObj = toDateObject(date);
        const formattedDate = formatDate(dateObj);
        const isoDate = formatISO8601(dateObj);
        return (
          <div className="publishedOn mb-8 text-sm underline underline-offset-8">
            <p className="text-fd-muted-foreground" title={isoDate}>
              <span>Published:</span> {formattedDate}
            </p>
          </div>
        );
      })()}
    </>
  ) : null;

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
      {dateDisplay}
      <DocsBody>
        <Mdx
          components={getMDXComponents({
            img: (props) => <ImageZoom {...(props as any)} />,
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(notesSource, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return notesSource.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = notesSource.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
