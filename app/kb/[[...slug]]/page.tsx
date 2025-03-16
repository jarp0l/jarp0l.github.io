/* eslint-disable @typescript-eslint/no-explicit-any */
import { kbSource } from "@/lib/source";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = kbSource.getPage(params.slug);

  if (!page) notFound();

  const { body: Mdx, toc, lastModified } = page.data;

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
  return kbSource.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = kbSource.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
