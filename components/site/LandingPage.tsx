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
  Palette,
  Search,
  Send,
  Smartphone,
  Star,
  Target,
  Zap,
} from "lucide-react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { BackgroundShader } from "@/components/ui/background-shader";
import { AiHeroChat } from "@/components/site/AiHeroChat";
import { IntroOverlay } from "@/components/site/IntroOverlay";
import { ScrollEffects } from "@/components/site/ScrollEffects";

const whatsapp = "https://wa.me/972523393768";
const email = "mailto:assaf.buskila10@gmail.com";

const navItems = [
  { href: "#story", label: "סיפור" },
  { href: "#process", label: "תהליך" },
  { href: "#contact", label: "יצירת קשר" },
];

const capabilityItems = [
  {
    label: "SEO",
    text: "מבנה שמנועי חיפוש מבינים",
    icon: Search,
  },
  {
    label: "לידים",
    text: "מסלול פנייה ברור לוואטסאפ",
    icon: Target,
  },
  {
    label: "עיצוב",
    text: "שפה שמרגישה כמו מותג",
    icon: Palette,
  },
  {
    label: "מובייל",
    text: "חוויה חדה בטלפון",
    icon: Smartphone,
  },
  {
    label: "אינטגרציות",
    text: "טפסים, וואטסאפ ומעקב",
    icon: Zap,
  },
  {
    label: "לוגו",
    text: "עזרה בכיוון בסיסי למותג",
    icon: BadgeCheck,
  },
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
    value: 100,
    suffix: "%",
    label: "עברית, מובייל, וואטסאפ ומסר ברור מהמסך הראשון",
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
    <span className="stat-value" dir="ltr">
      <span dir="rtl">{cleanSuffix}</span>
      <bdi className="count-target" data-countup={value}>{value}</bdi>
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

    setSent(true);
    window.open(`${whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
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
        <p className="text-center text-sm font-bold text-action">
          נפתחה הודעת וואטסאפ עם הפרטים שלך.
        </p>
      ) : null}
    </form>
  );
}

export function LandingPage() {
  const [heroChatDone, setHeroChatDone] = useState(false);

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
    knowsAbout: ["בניית אתרים", "דפי נחיתה", "עיצוב אתרים", "עברית RTL", "אינטגרציות וואטסאפ", "תוכן לעסקים"],
    makesOffer: [
      "אתר תדמית בעברית",
      "דף נחיתה ממיר",
      "אתר אינטראקטיבי עם אלמנטים מותאמים",
      "חודש ליווי אחרי השקה",
    ],
  };

  return (
    <>
      <ScrollEffects />
      <IntroOverlay />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="top" className="site-flow relative overflow-hidden pb-28">
        <div className="bg-morph" aria-hidden="true" />
        <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
          <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/80 bg-white/80 px-3 py-2 shadow-soft backdrop-blur-2xl md:px-4">
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
              שיחת כיוון
              <MessageCircle size={17} />
            </a>
          </div>
        </header>

        <section data-bg="#ffffff" className="hero-section relative min-h-screen overflow-hidden pt-28 md:pt-32">
          <BackgroundShader className="hero-background-shader" />
          <div className="hero-aura-layer" />
          <div className="hero-holo-layer" />
          <div className="hero-lume hero-lume--right" />
          <div className="hero-lume hero-lume--left" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />

          <div className="section-shell hero-ai-grid relative z-10 grid min-h-[calc(100vh-120px)] items-center gap-10 py-8 md:py-20">
            <div className="hero-demo-shell">
              <AiHeroChat onComplete={() => setHeroChatDone(true)} />
            </div>

            <div className={`hero-copy hero-conclusion max-w-3xl space-y-5 text-center md:space-y-7 md:text-right ${heroChatDone ? "hero-conclusion--ready" : ""}`}>
              <span className="hero-kicker">סטודיו אתרים עם חשיבה חכמה</span>
              <h1 className="max-w-3xl text-balance text-[clamp(2.75rem,7vw,7rem)] font-black leading-[0.92] tracking-normal text-ink">
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

              <p className="max-w-2xl text-xl font-semibold leading-9 text-muted md:text-2xl">
                אני אסף בוסקילה. אני בונה אתרים חכמים לעסקים שרוצים להסביר מהר למה לבחור בהם, ליצור אמון,
                ולקבל יותר פניות איכותיות בוואטסאפ.
              </p>

              <p className="hero-legacy-copy">
                אני אסף בוסקילה. אני בונה אתרים לעסקים שרוצים להפסיק להיראות כמו עוד תבנית,
                להסביר מהר למה לבחור בהם, ולקבל פניות מאנשים שכבר מבינים מה הם רוצים.
              </p>

              <div className="hero-cta-row flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="btn-primary magnetic">
                  שלחו לי עסק ואבנה לכם כיוון
                  <MessageCircle size={19} />
                </a>
                <a href="#process" className="btn-secondary magnetic">
                  לראות תהליך
                  <ChevronLeft size={19} />
                </a>
              </div>

              <div className="hero-legacy-cta">
                <a href="#contact" className="btn-primary magnetic">
                  בואו נסגור כיוון
                  <MessageCircle size={19} />
                </a>
                <a href="#process" className="btn-secondary magnetic">
                  לראות תהליך
                  <ChevronLeft size={19} />
                </a>
              </div>
            </div>

            <div className="hero-visual hero-visual--legacy" aria-hidden="true">
              <div className="hero-profile-shell">
                <Image
                  src="/assets/assaf-photo.jpg"
                  alt="אסף בוסקילה"
                  width={1100}
                  height={880}
                  sizes="(min-width: 1024px) 390px, 72vw"
                  className="hero-profile-photo"
                />
              </div>
              <div className="hero-floating-note hero-floating-note--top">
                <span>מסר ברור</span>
                <strong>לפני העיצוב</strong>
              </div>
              <div className="hero-floating-note hero-floating-note--bottom">
                <span>חוויה זכירה</span>
                <strong>שמובילה לפנייה</strong>
              </div>
            </div>
          </div>

          <a href="#capabilities" className="hero-scroll-cue" aria-label="גללו למטה">
            <span className="hero-scroll-cue__line" aria-hidden="true" />
            <span>גללו</span>
          </a>
        </section>

        <section id="capabilities" data-bg="#eef7ff" className="capability-section relative overflow-hidden py-16 md:py-20">
          <div className="capability-belt-glow" />
          <div className="section-shell capability-stack">
            <div className="capability-head gsap-reveal">
              <span className="eyebrow">מה האתר מחבר</span>
              <h2 className="text-balance text-4xl font-black leading-tight text-ink md:text-6xl">
                עיצוב, קופי, לידים וטכנולוגיה במקום אחד
              </h2>
              <p className="text-lg font-bold leading-8 text-muted md:text-xl">
                אני בונה אתר שמסדר ללקוח את הראש: מה אתם עושים, למה לסמוך עליכם, ואיך פונים אליכם מהר.
              </p>
            </div>

            <div className="capability-grid" aria-label="יכולות שנכנסות לאתר">
              {capabilityItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="capability-chip">
                    <span className="capability-chip-icon">
                      <Icon size={24} strokeWidth={2.2} />
                    </span>
                    <span className="capability-chip-copy">
                      <strong>{item.label}</strong>
                      <span>{item.text}</span>
                    </span>
                  </div>
                );
              })}
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
                  <p className="mt-4 text-lg font-bold leading-8 text-muted">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="story" data-bg="#052659" className="story-section relative overflow-hidden text-white">
          <BackgroundShader className="story-background-shader" />
          <div className="story-blue-blur-bg" />
          <div className="story-pin">
          <div className="section-shell story-intro-row">
            <div className="story-portrait-chip" aria-hidden="true">
              <Image
                src="/assets/about-me.png"
                alt=""
                width={433}
                height={577}
                sizes="92px"
                className="story-portrait-image"
              />
            </div>

            <div className="story-intro-copy">
              <p className="max-w-md text-lg font-semibold leading-8 text-white/70">
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
            <div className="hidden">
              <div className="about-photo-glow" />
              <Image
                src="/assets/about-me.png"
                alt="אסף בוסקילה"
                width={433}
                height={577}
                sizes="(min-width: 1024px) 340px, 72vw"
                className="about-photo"
              />
              <div className="about-photo-caption">
                <span>אסף בוסקילה</span>
                <strong>סטודנט לתעשייה וניהול, יוצר אתרים ותוכן לעסקים</strong>
              </div>
            </div>

            <div className="gsap-reveal about-copy space-y-6">
              <h2 className="text-balance text-4xl font-black leading-tight text-ink md:text-6xl">
                אני לא רק בונה אתר. אני עוזר לסגור את הכיוון.
              </h2>
              <p className="text-xl font-semibold leading-9 text-muted">
                אני סטודנט לתעשייה וניהול, יוצר אתרים ותוכן לעסקים, ועובד בצורה מסודרת
                מהרעיון הראשון ועד אתר שאפשר להראות ללקוחות בגאווה. אם אתם לא רוצים להתעסק
                באתר לבד, לרדוף אחרי עצמכם ולגלות שכל פרט קטן נופל עליכם, אני נכנס כשותף לתהליך.
              </p>
              <p className="text-lg font-bold leading-8 text-navy">
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
                  <p className="mt-3 text-base font-semibold leading-8 text-muted">{step.text}</p>
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
            <p className="text-lg font-semibold leading-8 text-muted">
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
                <blockquote className="text-xl font-black leading-9 text-ink">
                  ״{item.quote}״
                </blockquote>
                <figcaption className="mt-6 text-sm font-extrabold text-muted">
                  {item.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="contact" data-bg="#eef7ff" className="contact-section relative overflow-hidden py-20 md:py-28">
          <div className="contact-lume contact-lume--side" />
          <div className="contact-lume contact-lume--floor" />
          <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="gsap-reveal space-y-7">
              <h2 className="text-balance text-5xl font-black leading-[0.95] text-ink md:text-7xl">
                יש לך עסק טוב. עכשיו צריך אתר שמסביר את זה מהר.
              </h2>
              <p className="text-xl font-semibold leading-9 text-muted">
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
                  href="https://calendar.app.google/K994sdXaeLw8rjCe8"
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
              <div className="contact-road-signs" aria-hidden="true">
                <Image
                  src="/assets/generated/hero-wayfinder-desktop.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover"
                />
              </div>
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
              להתחיל עכשיו
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
          <span dir="ltr">assaf.buskila10@gmail.com · +972 52 339 3768</span>
        </div>
      </footer>

      <FloatingDock />
    </>
  );
}
