import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { otomatziotPost as post } from "@/lib/blog";
import { breadcrumbList, otomatziotBlogBreadcrumbs } from "@/lib/breadcrumbs";
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
    description: post.description,
    images: ["/assets/og-cover.jpg"],
  },
};

/** Mirrors the visible Hebrew FAQ on this page. Do not invent extra answers. */
const otomatziotBlogFaqs = [
  {
    q: "האם אוטומציה מחליפה עובד דיגיטלי שעונה ללקוחות?",
    a: "לא. אוטומציה מטפלת במעקב, תזכורות וסנכרון בין מערכות. מי שעונה ללידים בוואטסאפ ובאתר הוא עובד דיגיטלי.",
  },
  {
    q: "צריך להחליף את הכלים שהעסק כבר עובד איתם?",
    a: "לא. מחברים לטפסים, ליומן, לוואטסאפ ולמערכות שכבר יש. בלי לכפות תשתית חדשה.",
  },
  {
    q: "כמה זה עולה?",
    a: "אין מחירון ציבורי. אחרי בדיקת התאמה קצרה נשלחת הצעה לפי ההיקף האמיתי.",
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
    {
      "@type": "FAQPage",
      "@id": `${post.url}#faq`,
      mainEntity: otomatziotBlogFaqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    breadcrumbList(post.url, otomatziotBlogBreadcrumbs),
  ],
};

export default function OtomatziotBlogPage() {
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
          <h2 className="text-3xl font-black leading-tight text-ink">מה היא עושה ביום רגיל</h2>
          <p>
            עסק קטן בישראל מפסיד שעות על עבודה שחוזרת על עצמה. ליד נכנס באתר, מישהו מעתיק לגיליון,
            ואז שוכחים לחזור. תזכורת לתור נשלחת ידנית, או לא נשלחת בכלל. וואטסאפ, טפסים ויומן לא
            מדברים אחד עם השני.
          </p>
          <p>
            האוטומציה מחברת את הכלים שכבר יש: טפסים, גיליונות, יומן, מערכת לקוחות ווואטסאפ. ליד
            מגיע, נפתח מעקב. תור מתקרב, נשלחת תזכורת. משימה נתקעת, אתם מקבלים הודעה. בלי להחליף
            את כל התשתית, ובלי לבנות בוט שעונה במקומכם.
          </p>
          <p>
            עמוד השירות{" "}
            <Link
              href="/sherut/otomatziot"
              className="font-black text-action underline-offset-4 hover:underline"
            >
              איך אוטומציות חוסכות שעות לעסק קטן בישראל?
            </Link>{" "}
            מפרט את התהליך. כאן ההסבר הקצר: מה זה, ומה זה לא.
          </p>

          <h2 className="text-3xl font-black leading-tight text-ink">מה היא לא</h2>
          <p>
            אוטומציה לא עונה ללקוחות במקומכם. מי שעונה ללידים בוואטסאפ ובאתר הוא{" "}
            <Link
              href="/sherut/oved-digitali"
              className="font-black text-action underline-offset-4 hover:underline"
            >
              עובד דיגיטלי
            </Link>
            , ויש לו גם מאמר נפרד ב{" "}
            <Link href="/blog" className="font-black text-action underline-offset-4 hover:underline">
              בלוג
            </Link>
            :{" "}
            <Link
              href="/blog/oved-digitali"
              className="font-black text-action underline-offset-4 hover:underline"
            >
              מה זה עובד דיגיטלי לעסק?
            </Link>
            .
          </p>
          <p>
            סוכן קולי הוא גרסה קולית של אותו רעיון: עונה לטלפון בעברית, קובע תור, ומסכם בוואטסאפ.
            אין לו עמוד שירות נפרד. הדמו החי רץ ב{" "}
            <Link href="/#voice" className="font-black text-action underline-offset-4 hover:underline">
              סקשן הסוכן הקולי
            </Link>{" "}
            בעמוד{" "}
            <Link href="/" className="font-black text-action underline-offset-4 hover:underline">
              הבית
            </Link>
            , וההסבר במאמר{" "}
            <Link
              href="/blog/soken-koli"
              className="font-black text-action underline-offset-4 hover:underline"
            >
              מה זה סוכן קולי לעסק קטן בישראל?
            </Link>
            .
          </p>
          <p>
            האוטומציה לא מחליפה את בעל העסק, לא מחליטה מי הלקוח הנכון, ולא סוגרת עסקה שדורשת שיקול
            דעת. היא חוסכת את השעות שנשרפות על מעקב, תזכורות וסנכרון.
          </p>

          <h2 className="text-3xl font-black leading-tight text-ink">איך זה נבנה אצל אסף בוסקילה</h2>
          <p>
            אני אסף בוסקילה, מהנדס פתרונות AI. אני בונה לעסקים קטנים בישראל עובדים דיגיטליים:
            אוטומציות שחוסכות שעות, סוכן שעונה בוואטסאפ ובאתר, סוכן קולי בעברית, אפליקציות
            וכלים פנימיים, וגם אתרים, דפי נחיתה וכרטיס ביקור דיגיטלי. כל השקה כוללת חודש ליווי.
          </p>
          <p>
            אין מחירון ציבורי. מתחילים מבדיקת התאמה קצרה בוואטסאפ, ואחריה נשלחת הצעה לפי ההיקף
            האמיתי. את רשימת הפתרונות אפשר לראות ב{" "}
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

          <h2 className="text-3xl font-black leading-tight text-ink">שאלות נפוצות</h2>
          {otomatziotBlogFaqs.map((item) => (
            <p key={item.q}>
              {item.q} {item.a}
            </p>
          ))}

          <h2 className="text-3xl font-black leading-tight text-ink">איך מתחילים</h2>
          <p>
            אם יש עסק וזמן שנשרף על מעקב, תזכורות או העתקה בין מערכות, כתבו בוואטסאפ. אפשר גם
            לחזור ל{" "}
            <Link href="/#contact" className="font-black text-action underline-offset-4 hover:underline">
              יצירת הקשר
            </Link>{" "}
            בעמוד הבית.
          </p>
        </div>

        <div className="mt-12 grid gap-3">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-primary">
            וואטסאפ לאסף
            <MessageCircle size={19} />
          </a>
        </div>
      </article>
    </main>
  );
}
