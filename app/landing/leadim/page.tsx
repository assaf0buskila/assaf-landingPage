import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, MessageCircle, Stethoscope } from "lucide-react";
import { VoiceAgentSection } from "@/components/site/VoiceAgentSection";
import {
  leadimClinicScenario,
  leadimDefinition,
  leadimDescription,
  leadimH1,
  leadimPain,
  leadimPath,
  leadimTitle,
  leadimUrl,
} from "@/lib/leadim-landing";
import { landingBreadcrumb } from "@/lib/breadcrumbs";
import { SITE_URL, WHATSAPP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: leadimTitle,
  description: leadimDescription,
  authors: [{ name: "אסף בוסקילה", url: SITE_URL }],
  alternates: {
    canonical: leadimPath,
    languages: {
      "he-IL": leadimPath,
    },
    types: {},
  },
  openGraph: {
    title: leadimTitle,
    description: leadimDescription,
    url: leadimUrl,
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
    title: leadimTitle,
    description: leadimDescription,
    images: ["/assets/og-cover.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${leadimUrl}#webpage`,
      url: leadimUrl,
      name: leadimTitle,
      description: leadimDescription,
      inLanguage: "he",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#assaf` },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".leadim-cite"],
      },
    },
    landingBreadcrumb("דף נחיתה לידים", leadimUrl),
  ],
};

export default function LeadimLandingPage() {
  const voiceEnabled = Boolean(process.env.ELEVENLABS_API_KEY && process.env.ELEVENLABS_AGENT_ID);

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
          לידים בלי מענה
        </p>

        <h1 className="mt-4 text-balance text-4xl font-black leading-tight text-ink md:text-6xl">
          {leadimH1}
        </h1>

        <p className="mt-6 text-xl font-medium leading-9 text-muted">{leadimPain}</p>

        <p className="leadim-cite premium-panel mt-8 p-6 text-lg font-medium leading-9 text-ink">
          {leadimDefinition}
        </p>
      </article>

      <section id="voice" className="voice-section relative overflow-hidden py-20 md:py-28">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-5">
            <h2 className="text-balance text-4xl font-black leading-tight text-ink md:text-6xl">
              אל תאמינו לי. תדברו איתו.
            </h2>
            <p className="max-w-2xl text-lg font-medium leading-8 text-muted">
              זה סוכן קולי חי שבניתי. הוא מדבר עברית, מכיר את העסק שלי, ובנוי בדיוק כמו סוכן
              שהעסק שלכם יכול לקבל. שיחה אחת קצרה ותבינו לבד איך זה מרגיש ללקוח שלכם.
            </p>
          </div>
          <VoiceAgentSection whatsapp={WHATSAPP_URL} enabled={voiceEnabled} />
        </div>
      </section>

      <section className="relative py-12 md:py-16">
        <div className="section-shell max-w-3xl">
          <div className="mb-8 max-w-3xl space-y-4">
            <h2 className="text-balance text-4xl font-black leading-tight text-ink md:text-6xl">
              ככה זה נראה בעסק כמו שלכם
            </h2>
          </div>

          <div className="premium-panel p-6">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white">
              <Stethoscope size={21} />
            </div>
            <h3 className="text-2xl font-black text-ink">{leadimClinicScenario.who}</h3>
            <p className="mt-3 text-base font-medium leading-8 text-muted">
              {leadimClinicScenario.pain}
            </p>

            <ul className="mt-5 space-y-2 border-t border-ink/10 pt-5">
              {leadimClinicScenario.jobs.map((job) => (
                <li key={job} className="flex items-start gap-2.5 text-base font-medium leading-7 text-navy">
                  <BadgeCheck size={17} className="mt-1 shrink-0 text-action" aria-hidden="true" />
                  <span>{job}</span>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-base font-bold leading-7 text-ink">
              <span className="block text-sm font-black text-muted">מה משתנה</span>
              {leadimClinicScenario.result}
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-12 md:pb-8">
        <div className="section-shell max-w-3xl">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            בדיקת התאמה קצרה
            <MessageCircle size={19} />
          </a>
        </div>
      </section>
    </main>
  );
}
