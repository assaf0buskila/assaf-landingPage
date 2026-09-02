import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, Mail, MessageCircle } from "lucide-react";
import { bniatAtarimPost as post } from "@/lib/blog";
import { blogPostBreadcrumb } from "@/lib/breadcrumbs";
import { CALENDAR_URL, EMAIL, SITE_URL, WHATSAPP_URL } from "@/lib/site";

const title = `${post.seoTitle ?? post.title} | האתר של אסף`;

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
    description: post.description,
    images: ["/assets/og-cover.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${post.url}#article`,
      headline: post.title,
      name: post.title,
      description: post.description,
      abstract: post.definition,
      articleBody: post.definition,
      inLanguage: "he",
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      mainEntityOfPage: post.url,
      url: post.url,
      image: `${SITE_URL}/assets/og-cover.jpg`,
      author: { "@id": `${SITE_URL}/#assaf` },
      publisher: { "@id": `${SITE_URL}/#assaf` },
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
    blogPostBreadcrumb(post.title, post.url),
  ],
};

export default function BniatAtarimPage() {
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
          <span className="mx-2 text-muted" aria-hidden="true">
            /
          </span>
          <Link href="/blog" className="transition hover:text-action">
            בלוג
          </Link>
        </p>

        <h1 className="mt-4 text-balance text-4xl font-black leading-tight text-ink md:text-6xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm font-bold text-muted">
          <span>אסף בוסקילה</span>
          <span className="mx-2" aria-hidden="true">
            ·
          </span>
          <time dateTime={post.datePublished}>{post.publishedLabel}</time>
        </p>

        <p className="blog-definition premium-panel mt-8 p-6 text-lg font-medium leading-9 text-ink">
          {post.definition}
        </p>

        <div className="blog-prose mt-12 space-y-6 text-lg font-medium leading-9 text-muted">
          <h2 className="text-3xl font-black leading-tight text-ink">מה האתר באמת צריך לכלול</h2>
          <p>
            עסק קטן לא צריך חנות ענק. הוא צריך עמוד שמסביר את השירות בשפה של העסק: מה מוכרים,
            למי זה מתאים, ומה קורה אחרי שיוצרים קשר.
          </p>
          <p>
            תמונות של המקום האמיתי עוזרות יותר מסטוק גנרי. אם יש כתובת או אזור שירות, הם צריכים
            להופיע. וצריך כפתור אחד ברור שמוביל לוואטסאפ או לטופס, לא כמה מסלולים שמבלבלים.
          </p>
          <p>
            אם כבר יש עובד דיגיטלי, הוא יושב על אותו אתר ועונה כשאין מישהו ליד המסך. מה זה אומר
            בפועל מוסבר במאמר{" "}
            <Link href="/blog/oved-digitali" className="font-black text-action underline-offset-4 hover:underline">
              מה זה עובד דיגיטלי לעסק?
            </Link>
            .
          </p>

          <h2 className="text-3xl font-black leading-tight text-ink">מה זה לא</h2>
          <p>
            זה לא קמפיין ממומן. זה לא חנות עם אלפי מוצרים. וזה לא הבטחה שמחר תהיו ראשונים בגוגל.
          </p>
          <p>
            דף טוב נותן ללקוח סיבה לפנות: להבין מה מוכרים, לראות שהמקום אמיתי, ולדעת איך כותבים.
            דירוג נבנה לאורך זמן עם תוכן אמיתי ועם שם העסק, לא עם הבטחה ביום ההשקה.
          </p>

          <h2 className="text-3xl font-black leading-tight text-ink">איך זה נבנה אצל אסף בוסקילה</h2>
          <p>
            אני אסף בוסקילה, מהנדס פתרונות AI. אני בונה לעסקים קטנים בישראל אתרים, דפי נחיתה
            וכרטיס ביקור דיגיטלי, וגם עובדים דיגיטליים. כל השקה כוללת חודש ליווי.
          </p>
          <p>
            אין מחירון ציבורי. אחרי שיחת אבחון קצרה נשלחת הצעה לפי ההיקף האמיתי. את רשימת
            הפתרונות אפשר לראות ב{" "}
            <Link href="/#solutions" className="font-black text-action underline-offset-4 hover:underline">
              סקשן הפתרונות
            </Link>{" "}
            בעמוד הבית.
          </p>

          <h2 className="text-3xl font-black leading-tight text-ink">עבודות שאפשר לפתוח</h2>
          <p>
            אלה אתרים חיים שכבר באוויר, לא הבטחה שכל עסק מקבל את אותו מוצר. כל עסק מקבל מה
            שבאמת חסר לו.
          </p>
          <ul className="list-disc space-y-2 pr-5">
            <li>
              <a
                href="https://mochi-israel.com"
                target="_blank"
                rel="noreferrer"
                className="font-black text-action underline-offset-4 hover:underline"
              >
                מוצ׳י
              </a>
            </li>
            <li>
              <a
                href="https://cafe-ana.com"
                target="_blank"
                rel="noreferrer"
                className="font-black text-action underline-offset-4 hover:underline"
              >
                קפה אנה
              </a>
            </li>
            <li>
              {/* Native <a> keeps the trailing slash; next/link would emit /candy. */}
              <a href="/candy/" className="font-black text-action underline-offset-4 hover:underline">
                מנגינת ממתקים
              </a>
              , אתר קונספט
            </li>
          </ul>

          <h2 className="text-3xl font-black leading-tight text-ink">איך מתחילים</h2>
          <p>
            אם חסר לעסק דף קבוע שהלקוח יכול לחזור אליו, כתבו בוואטסאפ או קבעו שיחת היכרות של 15
            דקות. אפשר גם לחזור ל{" "}
            <Link href="/#contact" className="font-black text-action underline-offset-4 hover:underline">
              יצירת הקשר
            </Link>{" "}
            בעמוד הבית.
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-primary">
            וואטסאפ לאסף
            <MessageCircle size={19} />
          </a>
          <a href={`mailto:${EMAIL}`} className="btn-secondary">
            מייל ישיר
            <Mail size={19} />
          </a>
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noreferrer"
            className="contact-call sm:col-span-2"
          >
            <span className="contact-call__icon">
              <Clock3 size={20} />
            </span>
            <span className="grid">
              <strong className="contact-call__title">קבעו שיחת היכרות 15 דק׳</strong>
              <span className="contact-call__desc">בזום או בטלפון, בלי התחייבות</span>
            </span>
          </a>
        </div>
      </article>
    </main>
  );
}
