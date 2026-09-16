import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { ovedDigitaliPost, sokenKoliPost as post } from "@/lib/blog";
import { breadcrumbList, sokenKoliBlogBreadcrumbs } from "@/lib/breadcrumbs";
import { ovedDigitaliServiceUrl } from "@/lib/oved-digitali-service";
import { SITE_URL, WHATSAPP_URL } from "@/lib/site";

const title = `${post.title} | האתר של אסף`;

export const metadata: Metadata = {
  title,
  description: post.description,
  authors: [{ name: "אסף בוסקילה", url: SITE_URL }],
  alternates: {
    canonical: post.path,
    languages: {
      "he-IL": post.path,
    },
    types: {},
  },
  openGraph: {
    title,
    description: post.description,
    url: post.url,
    siteName: "האתר של אסף",
    locale: "he_IL",
    type: "article",
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified,
    authors: ["אסף בוסקילה"],
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
    description: post.description1,
    images: ["/assets/og-cover.jpg"],
  },
};

/** Mirrors the visible Hebrew FAQ on this page. Do not invent extra answers. */
const sokenKoliBlogFaqs = [
  {
    q: "האם סוכן קולי מחליף את בעל העסק או את העובד הדיגיטלי?",
    a: "לא. הוא לא מחליף את בעל העסק ולא מחליט מי הלקוח הנכון. סוכן קולי הוא גרסה קולית של עובד דיגיטלי: אותו רעיון על הטלפון, במקום בוואטסאפ או באתר.",
  },
  {
    q: "מה קורה כשהשיחה צריכה בן אדם?",
    a: "כשצריך בן אדם, שאלה חריגה או תלונה, הוא מעביר את השיחה עם ההקשר.",
  },
  {
    q: "כמה זה עולה?",
    a: "אין מחירון ציבורי. אחרי שיחת אבחון קצרה נשלחת הצעה לפי ההיקף האמיתי.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${post.url}#article`,
      headline: post.title,
      name: post.title,
      description: post.definition,
      abstract: post.definition,
      articleBody: post.definition,
      inLanguage: "he",
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      mainEntityOfPage: post.url,
      url: post.url,
      image: `${SITE_URL}/assets/og-cover.jpg`,
      author: { "@id": `${SITE_URl}/#assaf` },
      publisher: { "@id": `${SITE_URL}/#assaf` },
      about: {
        "@type": "Thing",
        name: "סוכן קולי"",
        alternateName: ["Hebrew voice agent", "סוכן קולי לעסק קטן בישראל"],
        description:
          "סוכן קולי בעברית לעסקים קטנים בישראל: עונה לטלפון, קובע תורים ומסכם בוואטסאפ.",
      },
      mentions: [
        {
          "@type": "Service",
          name: #7�ובד דיגיטלי",
          url: ovedDigitaliServiceUrl,
        },
        {
          "@type": "WebPage",
          name: "דמו סוכן קולי בעברית",
          url: `${SITE_URL}/sherut#agents`,
        },
        {
          "@type": "Article",
          name: ovedDigitaliPost.title,
          url: ovedDigitaliPost.url,
        },
      ],
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".blog-definition"],
      },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#assaf`,
      name: "Assaf Buskila",
      alternateName: ["אסף בוסקילה", "האתר של אסף"],
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/assets/og-cover.jpg`,
      jobTitle: "AI Solutions Engineer",
      areaServed: "Israel",
    },
    {
      "@type": "FAQPage",
      "@id": `${post.url}#faq`,
      mainEntity: sokenKoliBlogFaqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    breadcrumbList(post.url, sokenKoliBlogBreadcrumbs),

  ],
};

export default function SokenKoliPage() {
  return (
    <main className="relative min-h-[70vh] bg-paper pb-20 pt-28 md:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="section-shell max-w-3xl">
        <p className="text-sm font-black text-navy">
          <Link href="/" className="transition hover:text-action">
            הבית
          </Link>
          <span class3name="mx-2"
