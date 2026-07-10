"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import type { CSSProperties } from "react";
import {
  ArrowUpLeft,
  BadgeCheck,
  ChevronLeft,
  CircleCheck,
  Clock3,
  Mail,
  MessageCircle,
  MousePointer2,
  Send,
  Star,
} from "lucide-react";
import { BackgroundShader } from "@/components/ui/background-shader";
import { AiHeroChat } from "@/components/site/AiHeroChat";
import { ScrollEffects } from "@/components/site/ScrollEffects";

const whatsapp = "https://wa.me/972523393768";
const email = "mailto:assaf.buskila10@gmail.com";
const calendarCall = "https://calendar.app.google/K994sdXaeLw8rjCe8";

const navItems = [
  { href: "#works", label: "עבודות" },
  { href: "#story", label: "סיפור" },
  { href: "#process", label: "תהליך" },
  { href: "#contact", label: "יצירת קשר" },
];

const works = [
  {
    name: "מוצ׳י",
    href: "https://mochi-israel.com",
    image: "/assets/projects/mochi-phone.webp",
    tag: "אתר חי",
    external: true,
    line: "אתר מותג עם אלמנטים שנבנו מאפס, שמכניס לידים והזמנות לאירועים דרך וואטסאפ.",
  },
  {
    name: "קפה אנה",
    href: "https://cafe-ana.com",
    image: "/assets/projects/cafe-ana-phone.webp",
    tag: "אתר חי",
    external: true,
    line: "אתר לבית קפה שכונתי: תפריט, אווירה ופנייה מהירה, עם ליווי צמוד של חודש.",
  },
  {
    name: "מנגינת ממתקים",
    href: "/candy/",
    image: "/assets/projects/candy-phone.webp",
    tag: "פרויקט קונספט",
    external: true,
    line: "אתר חוויה למותג ממתקים — טעימה מהצד האינטראקטיבי והמשחקי שאני אוהב לבנות.",
  },
];

const faqItems = [
  {
    q: "כמה עולה אתר?",
    a: "אין מחירון אחיד, כי אין שני עסקים זהים. אחרי שיחת כיוון קצרה תקבלו הצעה מסודרת עם מחיר סופי — לא נוסף מע״מ ואין הפתעות בהמשך.",
  },
  {
    q: "כמה זמן לוקח עד שהאתר באוויר?",
    a: "תלוי בהיקף: דף נחיתה ממוקד עולה מהר, אתר תדמית מלא לוקח יותר. את לוח הזמנים סוגרים יחד במפגש הכיוון, ואתם מעודכנים בכל שלב.",
  },
  {
    q: "אין לי רעיון סגור או תוכן מוכן. זו בעיה?",
    a: "ממש לא. רוב הלקוחות מגיעים בדיוק ככה. אני עוזר לסגור מסר, מבנה, תוכן ועיצוב — מגיעים עם העסק, יוצאים עם כיוון ברור.",
  },
  {
    q: "יש לי כבר אתר ואני לא מרוצה. אפשר לשדרג?",
    a: "כן. לפעמים נכון לשדרג את הקיים ולפעמים משתלם יותר לבנות מחדש. בשיחת הכיוון בודקים את המצב וממליצים על המסלול הנכון לכם.",
  },
];

const capabilityItems = [
  { label: "עיצוב", text: "שפה שמרגישה כמו מותג" },
  { label: "לידים", text: "מסלול פנייה ברור לוואטסאפ" },
  { label: "SEO", text: "מבנה שמנועי חיפוש מבינים" },
  { label: "מובייל", text: "חוויה חדה בטלפון" },
  { label: "אינטגרציות", text: "טפסים, וואטסאפ ומעקב" },
  { label: "לוגו", text: "עזרה בכיוון בסיסי למותג" },
];

const stats = [
  {
    value: 1,
    suffix: " שותף",
    label: "עיצוב, תוכן, בנייה וליווי במקום אחד",
    icon: Clock3,
  },
  {
    value: 30,
    suffix: " יום",
    label: "ליווי אחרי העלייה כדי לסגור את כל הפרטים",
    icon: BadgeCheck,
  },
  {
    value: 3,
    suffix: " פרויקטים",
    label: "אתרים חיים שאפשר לפתוח ולבדוק, כולם כאן בעמוד",
    icon: MousePointer2,
  },
];

const process = [
  {
    title: "מפגש כיוון",
    text: "פותחים בשיחה קצרה על העסק, הלקוחות, המטרה והדברים שחייבים לעבוד באתר.",
  },
  {
    title: "מסר וסיפור",
    text: "מסדרים מה אומרים קודם, מה מוכיח אמון ומה גורם לאנשים לרצות להמשיך.",
  },
  {
    title: "כיוון ויזואלי",
    text: "בוחרים שפה, צבעים, תמונות ותנועה שמרגישים כמו העסק ולא כמו תבנית.",
  },
  {
    title: "אלמנטים מאפס",
    text: "יוצרים חלקים מיוחדים, אנימציות ואזורי תוכן שמחזקים את הסיפור שלכם.",
  },
  {
    title: "בנייה ואינטגרציות",
    text: "מחברים טפסים, וואטסאפ וכל פעולה שצריכה להפוך עניין לפנייה אמיתית.",
  },
  {
    title: "חודש ליווי",
    text: "אחרי העלייה אני נשאר איתכם חודש כדי לדייק פרטים, לשנות ולוודא שהכול יושב.",
  },
];

const testimonials = [
  {
    quote: "אסף היה שותף אמיתי. הוא לקח את האתר שלנו צעד קדימה, יצר אלמנטים מאפס וחיבר אינטגרציות שעזרו לנו לסגור לידים והזמנות לאירועים.",
    name: "מוצ׳י",
  },
  {
    quote: "אסף נתן לי ליווי מלא במשך חודש, גם כששיגעתי אותו על המון פרטים קטנים. הוא יצירתי, נאמן ונותן מעבר. אפילו בסושיאל הוא עזר מיוזמתו.",
    name: "קפה אנה",
  },
  {
    quote: "באתי בלי רעיון סגור. אסף עזר לי להבין מה נכון לעסק, מה צריך להופיע באתר ואיך להפוך מחשבה למשהו שאנשים באמת מבינים.",
    name: "לקוח אתר תדמית",
  },
];

const storyLines = [
  "אתרים אינטראקטיביים יוצרים חווית גלישה שאנשים זוכרים.",
  "הם לא נועדו רק להרשים.",
  "הם גורמים ללקוח להבין מהר יותר מי אתם ולמה לבחור דווקא בכם.",
  "כשהמסר, התנועה וההוכחות יושבים נכון, התדמית מרגישה מקצועית יותר.",
  "ובסוף זה מביא יותר פניות, יותר אמון ויותר כסף לעסק.",
];

function AnimatedNumber({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const cleanSuffix = suffix.trim();

  if (cleanSuffix === "%") {
    return (
      <span className="stat-value" dir="ltr">
        <bdi className="count-target" data-countup={value}>{value}</bdi>%
      </span>
    );
  }

  if (cleanSuffix === "שותף") {
    return (
      <span className="stat-value stat-value--phrase" dir="rtl">
        <span>שותף אחד</span>
      </span>
    );
  }

  if (cleanSuffix === "יום") {
    return (
      <span className="stat-value" dir="rtl" style={{ direction: "rtl" }}>
        <bdi className="count-target" data-countup={value}>{value}</bdi>
        <span dir="rtl">ימים</span>
      </span>
    );
  }

  return (
    <span className="stat-value" dir="rtl" style={{ direction: "rtl" }}>
      <bdi className="count-target" data-countup={value}>{value}</bdi>
      <span dir="rtl">{cleanSuffix}</span>
    </span>
  );
}

function AboutProfile() {
  const [spot, setSpot] = useState({ x: 50, y: 42 });

  return (
    <div
      className="gsap-reveal about-profile-card parallax-soft"
      style={
        {
          "--spot-x": `${spot.x}%`,
          "--spot-y": `${spot.y}%`,
        } as CSSProperties
      }
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setSpot({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100,
        });
      }}
      onMouseLeave={() => setSpot({ x: 50, y: 42 })}
    >
      <span className="about-bloom about-bloom--mouse" />
      <span className="about-bloom about-bloom--mobile" />
      <div className="about-circle-frame">
        <Image
          src="/assets/assaf-photo.jpg"
          alt="אסף בוסקילה"
          width={1100}
          height={880}
          sizes="(min-width: 1024px) 340px, 72vw"
          className="about-circle-photo"
        />
      </div>
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const phone = String(formData.get("phone") || "");
    const project = String(formData.get("project") || "");
    const goal = String(formData.get("goal") || "");
    const message = [
      "היי אסף, אני רוצה לבדוק כיוון לאתר.",
      `שם: ${name}`,
      `טלפון: ${phone}`,
      `מה צריך לבנות: ${project}`,
      `מה חשוב לי שיקרה באתר: ${goal}`,
    ].join("\n");

    const url = `${whatsapp}?text=${encodeURIComponent(message)}`;
    const win = window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
    // Popup blockers return null — keep a direct link so the lead isn't lost.
    setFallbackUrl(win ? null : url);
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form-card space-y-4 p-4 md:p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-black text-navy">שם</span>
          <input
            name="name"
            required
            className="form-control"
            placeholder="איך קוראים לך?"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-black text-navy">טלפון</span>
          <input
            name="phone"
            type="tel"
            required
            className="form-control"
            placeholder="מספר לחזרה"
          />
        </label>
      </div>

      <label className="space-y-2 block">
        <span className="text-sm font-black text-navy">מה אנחנו בונים?</span>
        <input
          name="project"
          required
          className="form-control"
          placeholder="אתר תדמית, דף נחיתה, אתר לעסק קיים"
        />
      </label>

      <label className="space-y-2 block">
        <span className="text-sm font-black text-navy">מה חשוב לך שיקרה באתר?</span>
        <textarea
          name="goal"
          required
          rows={4}
          className="form-control resize-none"
          placeholder="אפשר לבוא גם בלי רעיון סגור. תכתוב מה העסק עושה ומה היית רוצה שהאתר יעזור לסגור."
        />
      </label>

      <button type="submit" className="btn-primary magnetic w-full">
        שליחה לוואטסאפ
        <Send size={18} />
      </button>

      {sent ? (
        <div className="space-y-1.5 text-center text-sm font-bold">
          <p className="text-action">נפתחה הודעת וואטסאפ עם הפרטים שלך.</p>
          {fallbackUrl ? (
            <p className="text-muted">
              לא נפתח לך כלום?{" "}
              <a href={fallbackUrl} target="_blank" rel="noreferrer" className="text-action underline">
                לחצו כאן לשליחה ישירה
              </a>
            </p>
          ) : null}
          <p className="text-muted">
            מעדיפים לדבר?{" "}
            <a href={calendarCall} target="_blank" rel="noreferrer" className="text-action underline">
              קבעו שיחת היכרות של 15 דק׳
            </a>
          </p>
        </div>
      ) : null}
    </form>
  );
}

export function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Person", "ProfessionalService"],
    name: "Assaf Buskila",
    alternateName: ["אסף בוסקילה", "האתר של אסף"],
    url: "https://www.assafweb.com/",
    image: "https://www.assafweb.com/assets/og-cover.jpg",
    email: "assaf.buskila10@gmail.com",
    telephone: "+972523393768",
    areaServed: "Israel",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IL",
    },
    sameAs: [
      "https://www.instagram.com/assaf_buskila/",
      "https://www.linkedin.com/in/assaf-buskila-11ab7a347/",
    ],
    knowsAbout: ["בניית אתרים", "דפי נחיתה", "עיצוב אתרים", "עברית RTL", "אינטגרציות וואטסאפ", "תוכן לעסקים"],
    makesOffer: [
      "אתר תדמית בעברית",
      "דף נחיתה ממיר",
      "אתר אינטראקטיבי עם אלמנטים מותאמים",
      "חודש ליווי אחרי השקה",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
    workExample: works.map((work) => ({
      "@type": "WebSite",
      name: work.name,
      url: work.href.startsWith("http") ? work.href : `https://www.assafweb.com${work.href}`,
    })),
  };

  return (
    <>
      <ScrollEffects />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="top" className="site-flow relative overflow-hidden">
        <div className="bg-morph" aria-hidden="true" />
        <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
          <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/80 bg-white/95 px-3 py-2 shadow-soft backdrop-blur-2xl md:px-4">
            <span className="nav-progress" aria-hidden="true" />
            <a href="#top" className="site-brand flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-sm font-black text-white">
                אב
              </span>
              <span className="hidden text-sm font-black leading-tight text-navy sm:block">
                אסף בוסקילה
                <span className="block text-xs font-bold text-muted">Web design studio</span>
              </span>
            </a>

            <nav className="hidden items-center gap-1 md:flex" aria-label="ניווט ראשי">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link rounded-full px-5 py-3 text-base font-black text-muted transition hover:bg-mist/60 hover:text-navy"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a href="#contact" className="btn-primary min-h-10 px-4 text-sm">
              בואו נדבר
              <MessageCircle size={17} />
            </a>
          </div>
        </header>

        <section data-bg="#ffffff" className="hero-section relative min-h-screen overflow-hidden pt-28 md:pt-32">
          <BackgroundShader className="hero-background-shader" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />

          <div className="section-shell hero-ai-grid relative z-10 grid min-h-[calc(100vh-120px)] items-center gap-10 py-8 md:py-16">
            <div className="hero-demo-shell">
              <AiHeroChat />
            </div>

            <div className="hero-copy max-w-3xl space-y-5 md:space-y-6">
              <span className="hero-kicker">סטודיו אתרים עם חשיבה חכמה</span>
              <h1 className="max-w-3xl text-balance text-[clamp(2.5rem,4.4vw,4.5rem)] font-black leading-[1.02] tracking-normal text-ink">
                {["אתר שמבין", "את העסק", "לפני שהוא", "מעצב אותו"].map((line, index) => (
                  <span
                    key={line}
                    className="hero-word hero-word-line hero-word-animated"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    {line}
                  </span>
                ))}
              </h1>

              <p className="max-w-2xl text-lg font-medium leading-8 text-muted md:text-xl md:leading-9">
                אני אסף בוסקילה. אני בונה אתרים חכמים לעסקים שרוצים להסביר מהר למה לבחור בהם, ליצור אמון,
                ולקבל יותר פניות איכותיות בוואטסאפ.
              </p>

              <div className="hero-cta-row flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="btn-primary magnetic">
                  בואו נדבר בוואטסאפ
                  <MessageCircle size={19} />
                </a>
                <a href="#works" className="btn-secondary magnetic">
                  לראות עבודות
                  <ChevronLeft size={19} />
                </a>
              </div>
            </div>
          </div>

          <a href="#works" className="hero-scroll-cue" aria-label="גללו למטה">
            <span className="hero-scroll-cue__line" aria-hidden="true" />
            <span>גללו</span>
          </a>
        </section>

        <section id="works" data-bg="#f4f9ff" className="works-section relative py-20 md:py-28">
          <div className="section-shell">
            <div className="mb-10 max-w-3xl space-y-4">
              <span className="eyebrow">עבודות</span>
              <h2 className="text-balance text-4xl font-black leading-tight text-ink md:text-6xl">
                אתרים שאפשר לפתוח, לגלול ולבדוק
              </h2>
              <p className="max-w-2xl text-lg font-medium leading-8 text-muted">
                לא מוקאפים ולא הדמיות. אלה אתרים חיים — לוחצים, נכנסים ורואים איך זה מרגיש ללקוח.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {works.map((work) => (
                <a
                  key={work.name}
                  href={work.href}
                  target="_blank"
                  rel="noreferrer"
                  className="gsap-reveal work-card group"
                >
                  <div className="work-card__frame">
                    <Image
                      src={work.image}
                      alt={`צילום מסך של אתר ${work.name}`}
                      width={880}
                      height={1565}
                      sizes="(min-width: 768px) 30vw, 88vw"
                      className="work-card__shot"
                    />
                  </div>
                  <div className="work-card__meta">
                    <div className="flex items-center justify-between gap-3">
                      <strong className="text-xl font-black text-ink">{work.name}</strong>
                      <span className="work-card__tag">{work.tag}</span>
                    </div>
                    <p className="text-sm font-medium leading-6 text-muted">{work.line}</p>
                    <span className="work-card__cta">
                      לפתוח את האתר
                      <ArrowUpLeft size={16} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="capabilities" data-bg="#eef7ff" className="capability-section relative overflow-hidden py-16 md:py-20">
          <div className="section-shell capability-stack">
            <div className="capability-head gsap-reveal">
              <span className="eyebrow">מה האתר מחבר</span>
              <h2 className="text-balance text-4xl font-black leading-tight text-ink md:text-6xl">
                עיצוב, קופי, לידים וטכנולוגיה במקום אחד
              </h2>
              <p className="text-lg font-medium leading-8 text-muted md:text-xl">
                אני בונה אתר שמסדר ללקוח את הראש: מה אתם עושים, למה לסמוך עליכם, ואיך פונים אליכם מהר.
              </p>
            </div>

            <div className="capability-list" aria-label="יכולות שנכנסות לאתר">
              {capabilityItems.map((item) => (
                <div key={item.label} className="capability-row">
                  <strong>{item.label}</strong>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section data-bg="#f8fbff" className="stats-section relative py-20 md:py-28">
          <div className="texture-soft" />
          <div className="section-shell grid gap-5 md:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="gsap-reveal premium-panel p-6">
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white">
                    <Icon size={21} />
                  </div>
                  <p className="text-5xl font-black leading-none text-navy md:text-6xl">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-4 text-lg font-medium leading-8 text-muted">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="story" data-bg="#d9ecfb" className="story-section relative overflow-hidden text-ink">
          <div className="story-blue-blur-bg" />
          <div className="story-pin">
          <div className="section-shell story-intro-row">
            <div className="story-portrait-chip" aria-hidden="true">
              <Image
                src="/assets/assaf-photo.jpg"
                alt=""
                width={1100}
                height={880}
                sizes="92px"
                className="story-portrait-image"
              />
            </div>

            <div className="story-intro-copy">
              <p className="max-w-md text-lg font-medium leading-8 text-navy/85">
                אתר טוב לא אמור לגרום לאנשים להתאמץ להבין. הוא צריך לקחת את הסיפור
                שלכם, לסדר אותו נכון, ולהפוך אותו לחוויה שמרגישה מקצועית כבר בגלילה הראשונה.
              </p>
            </div>
          </div>

          <div className="story-wide-flow px-4 md:px-10">
            <div className="story-scroll-copy text-[clamp(1.75rem,3.8vw,4.2rem)] font-black leading-[1.12] tracking-normal">
              {storyLines.map((line) => (
                <span key={line} className="story-line text-balance">
                  {line.split(" ").map((word, wordIndex) => (
                    <span key={`${word}-${wordIndex}`} className="story-word">
                      {word}
                    </span>
                  ))}
                </span>
              ))}
            </div>
            <div className="story-result-panel">
              <span>התוצאה</span>
              <strong>יותר אמון, יותר פניות ותחושה של עסק שאפשר לבחור בו.</strong>
            </div>
          </div>
          </div>
        </section>

        <section id="about" data-bg="#f8fbff" className="about-section relative py-20 md:py-28">
          <div className="texture-soft opacity-70" />
          <div className="section-shell about-layout grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <AboutProfile />
            <div className="gsap-reveal about-copy space-y-6">
              <h2 className="text-balance text-4xl font-black leading-tight text-ink md:text-6xl">
                אני לא רק בונה אתר. אני עוזר לסגור את הכיוון.
              </h2>
              <p className="text-xl font-medium leading-9 text-muted">
                אני סטודנט לתעשייה וניהול, יוצר אתרים ותוכן לעסקים, ועובד בצורה מסודרת
                מהרעיון הראשון ועד אתר שאפשר להראות ללקוחות בגאווה. אם אתם לא רוצים להתעסק
                באתר לבד, לרדוף אחרי עצמכם ולגלות שכל פרט קטן נופל עליכם, אני נכנס כשותף לתהליך.
              </p>
              <p className="text-lg font-semibold leading-8 text-navy">
                מתחילים במפגש ותיאום ציפיות. לא חייבים להגיע עם רעיון מוכן. אני עוזר לסגור
                מסר, מבנה, תוכן, עיצוב ופעולות באתר. אחרי העלייה יש חודש ליווי, ומשם כל שינוי
                נוסף נעשה בתשלום ברור.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {["יוצר אלמנטים מאפס", "מחבר טפסים ווואטסאפ", "עוזר גם בתוכן ובסושיאל", "עוזר גם בכיוון ללוגו", "שומר על מחיר משתלם לכיס"].map((item) => (
                  <div key={item} className="about-point">
                    <CircleCheck size={18} className="text-action" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="process" data-bg="#ffffff" className="process-section relative overflow-hidden py-20 md:py-28">
          <div className="texture-soft opacity-80" />
          <div className="section-shell">
            <div className="mb-12 max-w-3xl space-y-4">
              <h2 className="text-balance text-4xl font-black leading-tight text-ink md:text-6xl">
                ככה הופכים רעיון לאתר שאפשר לשלוח בגאווה
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {process.map((step, index) => (
                <div key={step.title} className="gsap-reveal premium-panel p-6">
                  <div className="mb-7 flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-navy text-lg font-black text-white">
                      {index + 1}
                    </span>
                    <ChevronLeft className="text-action" />
                  </div>
                  <h3 className="text-2xl font-black text-ink">{step.title}</h3>
                  <p className="mt-3 text-base font-normal leading-8 text-muted">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section data-bg="#f2f8ff" className="testimonials-section section-shell py-20 md:py-28">
          <div className="mb-10 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div className="space-y-4">
              <h2 className="text-balance text-4xl font-black leading-tight text-ink md:text-6xl">
                כשנותנים מעבר, מרגישים את זה באתר
              </h2>
            </div>
            <p className="text-lg font-medium leading-8 text-muted">
              אלה לא משפטי פרסום. זה מה שקורה כשעובדים קרוב, מקשיבים לפרטים הקטנים
              ובונים אתר שמשרת את העסק גם אחרי שהעיצוב עולה לאוויר.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.name} className="gsap-reveal premium-panel p-6">
                <div className="mb-8 flex gap-1 text-action" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={18} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="text-lg font-semibold leading-8 text-ink">
                  ״{item.quote}״
                </blockquote>
                <figcaption className="mt-6 text-sm font-bold text-muted">
                  {item.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="faq" data-bg="#ffffff" className="faq-section relative py-20 md:py-24">
          <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="gsap-reveal space-y-4">
              <span className="eyebrow">שאלות נפוצות</span>
              <h2 className="text-balance text-4xl font-black leading-tight text-ink md:text-5xl">
                הדברים ששואלים אותי לפני שמתחילים
              </h2>
              <p className="text-lg font-medium leading-8 text-muted">
                ואם יש שאלה שלא כאן — שלחו אותה בוואטסאפ, עונה גם על שאלות קטנות.
              </p>
            </div>

            <div className="gsap-reveal space-y-3">
              {faqItems.map((item) => (
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
        </section>

        <section id="contact" data-bg="#eef7ff" className="contact-section relative overflow-hidden py-20 md:py-28">
          <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="gsap-reveal space-y-7">
              <h2 className="text-balance text-5xl font-black leading-[0.95] text-ink md:text-7xl">
                יש לך עסק טוב. עכשיו צריך אתר שמסביר את זה מהר.
              </h2>
              <p className="text-xl font-medium leading-9 text-muted">
                שלחו כמה מילים על העסק ומה הייתם רוצים שהאתר יעזור לסגור. גם אם אין לכם
                רעיון מוכן, אני יודע לעזור לסדר את הכיוון ולהבין מה באמת צריך להופיע שם.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-primary">
                  וואטסאפ לאסף
                  <MessageCircle size={19} />
                </a>
                <a href={email} className="btn-secondary">
                  מייל ישיר
                  <Mail size={19} />
                </a>
                <a
                  href={calendarCall}
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
            </div>

            <div className="gsap-reveal contact-form-stage">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer relative overflow-hidden bg-ink px-4 py-14 text-white">
        <div className="texture-holo opacity-20" />
        <div className="section-shell relative z-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black text-mist">האתר של אסף</p>
            <h2 className="mt-3 max-w-2xl text-4xl font-black leading-tight md:text-6xl">
              בונים אתר שמרגיש כמו העסק, ולא כמו משהו שבחרו מתבנית
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="btn-primary">
              בואו נדבר
              <MessageCircle size={19} />
            </a>
            <a href="https://www.instagram.com/assaf_buskila/" target="_blank" rel="noreferrer" className="btn-secondary bg-white text-navy">
              אינסטגרם
              <ArrowUpLeft size={19} />
            </a>
          </div>
        </div>
        <div className="section-shell relative z-10 mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm font-bold text-white/60 md:flex-row md:items-center md:justify-between">
          <span>© 2026 אסף בוסקילה</span>
          <span dir="ltr" className="flex flex-wrap items-center gap-x-2">
            <a href={email} className="transition hover:text-white">assaf.buskila10@gmail.com</a>
            <span aria-hidden="true">·</span>
            <a href="tel:+972523393768" className="transition hover:text-white">+972 52 339 3768</a>
          </span>
        </div>
      </footer>

      <a
        href={whatsapp}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-fab md:hidden"
        aria-label="וואטסאפ לאסף"
      >
        <MessageCircle size={24} strokeWidth={2.2} />
      </a>
    </>
  );
}
