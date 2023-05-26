import Head from "next/head";
import * as React from "react";

export interface ISEOProps {
  title: string;
  description: string;
  url: string;
  image: string;
  content?: string;
}

interface SEO {
  data: ISEOProps;
}

export function SEO({ data }: SEO) {
  const { title, description, url, image, content } = data;
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
}
