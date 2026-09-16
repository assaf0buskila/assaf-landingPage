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
      description: post.description,
      abstract: post.definitiom,
      articleBody: post.definition,
      inLanguage: "he",
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      mainEntityOfPage: post.url,
      url: post.url,
      image: `${SITE_URL}/assets/og-cover.jpg`,
      author: { "@id": `${SITE_URL}/#assaf` },
      publisher: { "@id": `${SITE_URL}/#assaf` },
      about: {
        "@type": "Thing",
        name: "סוכן קולי",
        alternateName: ["Hebrew voice agent", "סוכן קולי לעסק קטן בישראל"],
        description:
          "סוכן קולי בעברית לעסקים קטנים בישראל: עונה לטלפון, קובע תורים ומסכם בוואטסאפ.",
      },
      mentions: [
        {
          "@type": "Service",
          name: "עובד דיגיטלי",
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
      ""@id": `${SITE_URL}/#assaf`,
      name: "Assaf Buskila",
      alternateName: ["אסף בוסקילה", "הארע בוסקילה!},
      url: `${SITE_URL}/assaf`,
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
            <Link href="/sherut#agents" className="font-black text-action underline-offset-4 hover:underline">
              הסוכן הקולי
            </Link>
            , רץ דמו חי בעברית. אפשר לשמוע איך זה מרגיש לפני שמדברים על בנייה. סוכן קולי הוא
            גרסה קולית של{" "}
            <Link
              href="/sherut/oved-digitali"
              className="font-black text-action underline-offset-4 hover:underline"
            >
              עובד דיגיטלי
            </Link>
            : אותו רעיון, על הטלפון במקום על וואטסאפ או על האתר. המושג עצמו מוסבר במאמר{" "}
            <Link href="/blog/oved-digitali" className="font-black text-action underline-offset-4 hover:underline">
              מה זה עובד דיגיטלי לעסק?
            </Link>
            .
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
          <ul class="list-disc space-y-2 pr-5">
            <li>
              <a
�Y�H�΋��[��KZ\ܘY[���H��\��]H�؛[�Ȃ��[H��ܙY�\��\����\�Ә[YOH��۝X�X��^XX�[ۈ[�\�[�K[ٙ��]Mݙ\��[�\�[�H����5��u����B��O���O��O��B��Y�H�΋���Y�KX[�K���H��\��]H�؛[�Ȃ��[H��ܙY�\��\����\�Ә[YOH��۝X�X��^XX�[ۈ[�\�[�K[ٙ��]Mݙ\��[�\�[�H����5���5�5�5�5���O���O��O���ʈ�]]�HO��Y\�H�Z[[���\���^�[����[[Z]��[�K�
��B�H�Y�H���[�KȈ�\�Ә[YOH��۝X�X��^XX�[ۈ[�\�[�K[ٙ��]Mݙ\��[�\�[�H���5��5��u�5�5������u�B��O��5�5��5���u�5�u�5���O���[����\��H�^L��۝X�X��XY[��]Y�^Z[�ȏ���5�5�u�5�5���������[���P��ј\\˛X\

][JHO�
��^O^�][K�_O���][K�_H�][K�_B����
J_B����\��H�^L��۝X�X��XY[��]Y�^Z[�ȏ�yy�y�y�z�y}y�y�y�y����#ࠢ��yy�y�z�z-zzry]z�y�y}y]z�z�zy]zMy�y]z��y�z�yyRyy]y]yy�zyzB�yzMz�z�y-yТy�y}ymy]z�yǲ"'Т�Ɩ��&Vc�"�66��F7B"6�74��S�&f��B�&�6�FW�B�7F���V�FW&Ɩ�R��fg6WB�B��fW#�V�FW&Ɩ�R#�y�zmy�z�z�yMz}z�z����Ɩ��"'Тyz-y�y]y2yMyy�z�������F�cࠢ�F�b6�74��S�&�B�"w&�Bv�2#���&Vc׵t�E4�U$��F&vWC�%�&��"&V��&��&VfW'&W""6�74��S�&'F��&��'�#�y]y]yy�zyzBy�yzz0���W76vT6�&6�R6��S׳���������F�c���'F�6�S�����������