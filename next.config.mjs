import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,

  // Configure the output directory
  distDir: "out",

  // Configure a base path, esp. for GitHub Pages
  // https://nextjs.org/docs/app/api-reference/next-config-js/basePath
  basePath: process.env.PAGES_BASE_PATH,

  // Disable server side image optimization
  // https://nextjs.org/docs/api-reference/next/image#unoptimized
  // images: {
  //   unoptimized: true,
  // }

  // Configure the type of build output for static files
  output: "export",
};

export default withMDX(config);
