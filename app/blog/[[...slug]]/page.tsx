/* eslint-disable @typescript-eslint/no-explicit-any */
import { blogSource } from "@/lib/source";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import defaultMdxComponents from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = blogSource.getPage(params.slug);

  if (!page) notFound();

  const { body: Mdx, toc, date, lastModified } = page.data;

  // Convert date string to Date object
  const dateObj = typeof date === "string" ? new Date(date) : date;

  // Format date as "Tue, April 1, 2025"
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Format date as ISO 8601 string
  const formatISO8601 = (date: Date) => date.toISOString();

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
      <div className="-mt-8 mb-8 text-sm underline underline-offset-8">
        <p className="text-fd-muted-foreground" title={isoDate}>
          <span>Published:</span> {formattedDate}
        </p>
      </div>
      <DocsBody>
        <Mdx
          components={{
            ...defaultMdxComponents,
            img: (props) => <ImageZoom {...(props as any)} />,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return blogSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = blogSource.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
