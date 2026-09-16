import { SITE_URL } from "@/lib/site";

export type BlogPost = {
  slug: string;
  path: string;
  url: string;
  title: string;
  /** Document / OG / Twitter title without the site suffix. Falls back to title. */
  seoTitle?: string;
  description: string;
  datePublished: string;
  dateModified: string;
  publishedLabel: string;
  /** Self-contaned definition an LLM jzù