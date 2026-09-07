import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { breadcrumbList, sherutIndexBreadcrumbs } from "@/lib/breadcrumbs";
import {
  sherutIndexDescription,
  sherutIndexTitle,
  sherutPath,
  sherutServices,
  sherutUrl,
} from "@/lib/sherut";
import { SITE_URL } from "@/lib/site";

const title = `${sherutIndexTitle} | האתר של אסף`;

export const metadata: Metadata = {
  title,
  description: sherutIndexDescription,
  authors: [{ name: "אסף בוסקילה", url: SITE_URL }],
  alternates: {
    canonical: sherutPath,
    languages: {
      "he-IL": sherutPath,
    },
    types: {},
  },
  openGraph: {
    title,
    description: sherutIndexDescription,
    url: sherutUrl,
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
    description: sherutIndexDescription,
    images: ["/assets/og-cover.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${sherutUrl}#webpage`,
      url: sherutUrl,
      name: title,
      description: sherutIndexDescription,
      inLanguage: "he",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#assaf` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: sherutServices.length,
        itemListElement: sherutServices.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.name,
          url: service.url,
          item: {
            "@type": "Service",
            "@id": `${service.url}#service`,
            url: service.url,
            name: service.name,
          },
        })),
      },
    },
    breadcrumbList(sherutUrl, sherutIndexBreadcrumbs),
  ],
};

export default function SherutIndexPage() {
  return (
    <main className="relative min-h-[70vh] bg-paper pb-20 pt-28 md:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="section-shell max-w-3xl">
        <p className="text-sm font-black text-navy">
          <Link href="/" className="transition hover:text-action">
            הבית
          </Link>
          <span className="mx-2 text-muted" aria-hidden="true">
            /
          </span>
          שירותים
        </p>
        <h1 className="mt-4 text-balance text-4xl font-black leading-tight text-ink md:text-6xl">
          {sherutIndexTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-lg font-medium leading-8 text-muted">
          אסף בוסקילה בונה פתרונות דיגיטליים לעסקים קטנים בישראל. כאן שני עמודי שירות
          חיים: עובד דיגיטלי שעונה ללידים, ואוטומציות שחוסכות שעות על מעקב ותזכורות. אין
          מחירון ציבורי. בדיקת התאמה נעשית דרך{" "}
          <Link href="/#contact" className="font-black text-action underline-offset-4 hover:underline">
            יצירת קשר
          </Link>
          .
        </p>

        <ul className="mt-10 space-y-4">
          {sherutServices.map((service) => (
            <li key={service.path}>
              <article className="premium-panel p-6">
                <h2 className="text-2xl font-black text-ink">
                  <Link href={service.path} className="transition hover:text-action">
                    {service.name}
                  </Link>
                </h2>
                <p className="mt-3 text-base font-medium leading-8 text-muted">{service.summary}</p>
                <Link
                  href={service.path}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-black text-action"
                >
                  לעמוד השירות
                  <ArrowUpLeft size={16} />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
