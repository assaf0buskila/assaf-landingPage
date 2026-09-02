import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { sokenKoliPost as post } from "@/lib/blog";
import { breadcrumbList, sokenKoliBlogBreadcrumbs } from "@/lib/breadcrumbs";
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
          <h2 className="text-3xl font-black leading-tight text-ink">מה הוא עושה ביום רגיל</h2>
          <p>
            עסק קטן בישראל מקבל שיחות באמצע העבודה, אחרי שהדלת נסגרה, ולפעמים בשתיים בלילה.
            סוכן קולי יושב על הקו בעברית ועונה כמו העסק: מה כלול, מתי יש מקום, ומה הצעד הבא.
          </p>
          <p>
            אם השאלה פשוטה, הוא סוגר אותה. אם צריך תור, הוא מתאם ליומן. אחר כך הוא שולח סיכום
            בוואטסאפ, כדי שתראו מה נאמר בלי לחזור על השיחה. אם צריך אתכם, הוא מעביר עם ההקשר.
          </p>
          <p>
            בעמוד הבית, בסקשן{" "}
            <Link href="/#voice" className="font-black text-action underline-offset-4 hover:underline">
              הסוכן הקולי
            </Link>
            , רץ דמו חי. אפשר לשמוע איך זה מרגיש לפני שמדברים על בנייה. סוכן קולי הוא גרסה
            קולית של{" "}
            <Link href="/blog/oved-digitali" className="font-black text-action underline-offset-4 hover:underline">
              עובד דיגיטלי
            </Link>
            : אותו רעיון, על הטלפון במקום על וואטסאפ או על האתר.
          </p>

          <h2 className="text-3xl font-black leading-tight text-ink">מה הוא לא</h2>
          <p>
            הוא לא מחליף את בעל העסק. הוא לא מחליט בשבילכם מי הלקוח הנכון, ולא סוגר לבד עסקה
            שדורשת שיקול דעת. הוא גם לא מענה מוקלט: בלי ידע על השירותים והשעות של העסק הספציפי,
            זה רק תפריט מדבר.
          </p>
          <p>
            המטרה צנועה יותר. רוב העסקים לא מפסידים לקוחות בגלל המחיר. הם מפסידים אותם כשאף
            אחד לא מרים.
          </p>

          <h2 className="text-3xl font-black leading-tight text-ink">איך זה נבנה אצל אסף בוסקילה</h2>
          <p>
            אני אסף בוסקילה, מהנדס פתרונות AI. אני בונה לעסקים קטנים בישראל עובדים דיגיטליים:
            אוטומציות שחוסכות שעות, סוכן שעונה בוואטסאפ ובאתר, סוכן קולי בעברית שעונה לטלפון,
            קובע תורים ומסכם בוואטסאפ, אפליקציות וכלים פנימיים, וגם אתרים, דפי נחיתה וכרטיס
            ביקור דיגיטלי. כל השקה כוללת חודש ליווי.
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
            אם יש עסק ושיחות שנופלות, כתבו בוואטסאפ. אפשר גם
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
