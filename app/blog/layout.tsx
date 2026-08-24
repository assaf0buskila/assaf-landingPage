import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/SiteChrome";
import { SITE_URL } from "@/lib/site";

const title = "בלוג | האתר של אסף";
const description =
  "הסברים קצרים בעברית על עובד דיגיטלי, סוכני AI ואוטומציות לעסקים קטנים בישראל.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/blog",
    languages: {
      "he-IL": "/blog",
    },
    types: {},
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/blog`,
    siteName: "האתר של אסף",
    locale: "he_IL",
    type: "website",
    images: [
      {
        url: "/assets/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "אסף בוסקילה, פתרונות AI ואוטומציות לעסקים",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/og-cover.jpg"],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
