import Head from "next/head";
import type { SeoTitle } from "../types/common";

export default function Seo({ title }: SeoTitle) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}
