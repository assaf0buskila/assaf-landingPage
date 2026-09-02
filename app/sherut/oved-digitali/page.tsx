import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, MessageCircle } from "lucide-react";
import {
  ovedDigitaliFaqs,
  ovedDigitaliProcess,
  ovedDigitaliServiceDefinition,
  ovedDigitaliServiceDescription,
  ovedDigitaliServicePath,
  ovedDigitaliServiceTitle,
  ovedDigitaliServiceUrl,
} from "@/lib/oved-digitali-service";
import { serviceBreadcrumb } from "@/lib/breadcrumbs";
import { SITE_URL, WHATSAPP_URL } from "@/lib/site";

const title = `${ovedDigitaliServiceTitle} | האתר של אסף`;

export const metadata: Metadata = {
  title,
  description: ovedDigitaliServiceDescription,
  authors: [{ name: "אסף בוסקילה", url: SITE_URL }],
  alternates: {
    canonical: ovedDigitaliServicePath,
    languages: {
      "he-IL": ovedDigitaliServicePath,
    },
    types: {},
  },
  openGraph: {
    title,
    description: ovedDigitaliServiceDescription,
    url: ovedDigitaliServiceUrl,
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
    description: ovedDigitaliServiceDescription,
    images: ["/assets/og-cover.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${ovedDigitaliServiceUrl}#service`,
      name: "עובד דיגיטלי",
      alternateName: ["סוכן AI", "עובד AI לוואטסאפ ולאתר"],
      description: ovedDigitaliServiceDescription,
      url: ovedDigitaliServiceUrl,
      inLanguage: "he",
      serviceType: "עובד דיגיטלי",
      areaServed: {
        "@type": "Country",
        name: "IL",
      },
      provider: {
        "@type": "Person",
        "@id": `${SITE_URL}/#assaf`,
        name: "Assaf Buskila",
        alternateName: ["אסף בוסקילה", "האתר של אסף"],
        url: `${SITE_URL}/`,
      },
      mainEntityOfPage: ovedDigitaliServiceUrl,
    },
    {
      "@type": "FAQPage",
      "@id": `${ovedDigitaliServiceUrl}#faq`,
      mainEntity: ovedDigitaliFaqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    serviceBreadcrumb("עובד דיגיטלי", ovedDigitaliServiceUrl),
  ],
};

export default function OvedDigitaliServicePage() {
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
          עובד דיגיטלי
        </p>

        <h1 className="mt-4 text-balance text-4xl font-black leading-tight text-ink md:text-6xl">
          {ovedDigitaliServiceTitle}
        </h1>

        <p className="service-definition premium-panel mt-8 p-6 text-lg font-medium leading-9 text-ink">
          {ovedDigitaliServiceDefinition}
        </p>

        <div className="mt-12 space-y-6 text-lg font-medium leading-9 text-muted">
          <h2 className="text-3xl font-black leading-tight text-ink">הבעיה</h2>
          <p>
            עסק קטן בישראל מקבל פניות בוואטסאפ ובאתר כל היום. חלק מגיעות באמצע עבודה. חלק בערב.
            חלק אחרי שהדלת נסגרה. בלי מענה מיידי הליד עובר הלאה. תיאום פגישות ידני גוזל שעות,
            והשיחות מתפזרות בין וואטסאפ להודעות באתר. לא חסר ביקוש. חסר מי שעונה בזמן.
          </p>

          <h2 className="text-3xl font-black leading-tight text-ink">איך זה עובד</h2>
          <p>
            לקוח שולח הודעה. העובד הדיגיטלי עונה בעברית, בטון של העסק. הוא שואל מה צריך, מסנן מה
            רלוונטי, ומציע שעה פנויה כשמתאים לקבוע. סיכום מגיע אליכם בוואטסאפ. אם צריך אתכם, הוא
            מעביר עם ההקשר: מה נשאל, מה כבר נענה, ומה חסר.
          </p>
          <p>
            יש גם גרסה קולית לטלפון. בעמוד הבית, בסקשן{" "}
            <Link href="/#voice" className="font-black text-action underline-offset-4 hover:underline">
              הסוכן הקולי
            </Link>
            , רץ דמו חי. הסבר קצר על המושג עצמו נמצא במאמר{" "}
            <Link
              href="/blog/oved-digitali"
              className="font-black text-action underline-offset-4 hover:underline"
            >
              מה זה עובד דיגיטלי לעסק?
            </Link>
            , בלי לחזור כאן על אותו טקסט.
          </p>

          <h2 className="text-3xl font-black leading-tight text-ink">למי זה מתאים</h2>
          <p>
            לבעלי עסק קטן בישראל שמקבלים פניות בוואטסאפ או באתר, ולא מספיקים לענות כשהם בעבודה
            או בלילה. אם הפניות מגיעות בהודעות והתורים נקבעים בשיחה, זה רלוונטי. אם אין בכלל
            פניות, קודם צריך מקום שהלקוח ימצא אתכם. אם מה שחסר הוא מעקב, תזכורות וסנכרון בין
            מערכות, זה{" "}
            <Link
              href="/sherut/otomatziot"
              className="font-black text-action underline-offset-4 hover:underline"
            >
              עמוד האוטומציות
            </Link>
            .
          </p>

          <h2 className="text-3xl font-black leading-tight text-ink">התהליך</h2>
          <ol className="list-decimal space-y-4 pr-5">
            {ovedDigitaliProcess.map((step) => (
              <li key={step.title}>
                <strong className="text-ink">{step.title}.</strong> {step.text}
              </li>
            ))}
          </ol>

          <h2 className="text-3xl font-black leading-tight text-ink">שאלות נפוצות</h2>
          <div className="space-y-3">
            {ovedDigitaliFaqs.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>
                  <span>{item.q}</span>
                  <ChevronLeft size={18} className="faq-item__chevron" aria-hidden="true" />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-12 space-y-4">
          <h2 className="text-3xl font-black leading-tight text-ink">בדיקת התאמה</h2>
          <p className="text-lg font-medium leading-9 text-muted">
            אין מחירון ציבורי. כותבים בוואטסאפ מה העסק ומה נופל היום, ואחרי בדיקת התאמה קצרה
            נשלחת הצעה לפי ההיקף האמיתי.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            data-mia-cta="service_fit_check"
          >
            בדיקת התאמה קצרה
            <MessageCircle size={19} />
          </a>
        </div>
      </article>
    </main>
  );
}
