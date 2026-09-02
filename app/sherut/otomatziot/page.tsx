import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, MessageCircle } from "lucide-react";
import {
  otomatziotFaqs,
  otomatziotProcess,
  otomatziotServiceDefinition,
  otomatziotServiceDescription,
  otomatziotServicePath,
  otomatziotServiceTitle,
  otomatziotServiceUrl,
} from "@/lib/otomatziot-service";
import { breadcrumbList, otomatziotServiceBreadcrumbs } from "@/lib/breadcrumbs";
import { SITE_URL, WHATSAPP_URL } from "@/lib/site";

const title = `${otomatziotServiceTitle} | האתר של אסף`;

export const metadata: Metadata = {
  title,
  description: otomatziotServiceDescription,
  authors: [{ name: "אסף בוסקילה", url: SITE_URL }],
  alternates: {
    canonical: otomatziotServicePath,
    languages: {
      "he-IL": otomatziotServicePath,
    },
    types: {},
  },
  openGraph: {
    title,
    description: otomatziotServiceDescription,
    url: otomatziotServiceUrl,
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
    description: otomatziotServiceDescription,
    images: ["/assets/og-cover.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${otomatziotServiceUrl}#service`,
      name: "אוטומציות לעסקים קטנים",
      alternateName: ["אוטומציות עסקיות", "אוטומציות לעסק קטן"],
      description: otomatziotServiceDescription,
      url: otomatziotServiceUrl,
      inLanguage: "he",
      serviceType: "אוטומציות לעסקים",
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
      mainEntityOfPage: otomatziotServiceUrl,
    },
    {
      "@type": "FAQPage",
      "@id": `${otomatziotServiceUrl}#faq`,
      mainEntity: otomatziotFaqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    breadcrumbList(otomatziotServiceUrl, otomatziotServiceBreadcrumbs),
  ],
};

export default function OtomatziotServicePage() {
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
          אוטומציות לעסקים קטנים
        </p>

        <h1 className="mt-4 text-balance text-4xl font-black leading-tight text-ink md:text-6xl">
          {otomatziotServiceTitle}
        </h1>

        <p className="service-definition premium-panel mt-8 p-6 text-lg font-medium leading-9 text-ink">
          {otomatziotServiceDefinition}
        </p>

        <div className="mt-12 space-y-6 text-lg font-medium leading-9 text-muted">
          <h2 className="text-3xl font-black leading-tight text-ink">הבעיה</h2>
          <p>
            עסק קטן בישראל מפסיד שעות על עבודה שחוזרת על עצמה. ליד נכנס באתר, מישהו מעתיק לגיליון,
            ואז שוכחים לחזור. תזכורת לתור נשלחת ידנית, או לא נשלחת בכלל. וואטסאפ, טפסים ויומן לא
            מדברים אחד עם השני. לא חסר ביקוש. חסר מי שעוקב בזמן.
          </p>

          <h2 className="text-3xl font-black leading-tight text-ink">איך זה עובד</h2>
          <p>
            ממפים את מה שחוזר על עצמו. ליד מגיע, האוטומציה פותחת מעקב. תור מתקרב, נשלחת תזכורת.
            משימה נתקעת, אתם מקבלים הודעה. החיבור הוא לכלים שכבר יש: טפסים, גיליונות, יומן ווואטסאפ.
            בלי להחליף את כל התשתית, ובלי לבנות בוט שעונה במקומכם.
          </p>
          <p>
            אם מה שחסר הוא מי שעונה ללידים בוואטסאפ ובאתר, זה{" "}
            <Link
              href="/sherut/oved-digitali"
              className="font-black text-action underline-offset-4 hover:underline"
            >
              עובד דיגיטלי
            </Link>
            . האוטומציה כאן חוסכת את השעות שנשרפות על מעקב, תזכורות וסנכרון.
          </p>

          <h2 className="text-3xl font-black leading-tight text-ink">למי זה מתאים</h2>
          <p>
            לבעלי עסק קטן בישראל שכבר מקבלים פניות, ומבזבזים זמן על העתקה בין מערכות, מעקב אחרי
            לידים, או תזכורות ידניות. אם אין בכלל פניות, קודם צריך מקום שהלקוח ימצא אתכם. אם הכאב
            הוא מענה ללקוחות בזמן אמת, מתחילים מעובד דיגיטלי.
          </p>

          <h2 className="text-3xl font-black leading-tight text-ink">התהליך</h2>
          <ol className="list-decimal space-y-4 pr-5">
            {otomatziotProcess.map((step) => (
              <li key={step.title}>
                <strong className="text-ink">{step.title}.</strong> {step.text}
              </li>
            ))}
          </ol>

          <h2 className="text-3xl font-black leading-tight text-ink">שאלות נפוצות</h2>
          <div className="space-y-3">
            {otomatziotFaqs.map((item) => (
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
