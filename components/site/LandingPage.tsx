"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import {
  ArrowUpLeft,
  BadgeCheck,
  Bot,
  ChevronLeft,
  CircleCheck,
  Clock3,
  Contact,
  Globe,
  LayoutGrid,
  Mail,
  Megaphone,
  MessageCircle,
  Mic,
  MousePointer2,
  Send,
  Star,
  Zap,
} from "lucide-react";
import { BackgroundShader } from "@/components/ui/background-shader";
import { PortfolioGallery } from "@/components/ui/portfolio-gallery";
import { ScrollMorphServices } from "@/components/ui/scroll-morph-services";
import { BrickDef, TechStackBuilder } from "@/components/ui/interactive-tech-stack-builder";
import { AiHeroChat } from "@/components/site/AiHeroChat";
import { ScrollEffects } from "@/components/site/ScrollEffects";
import { VoiceAgentSection } from "@/components/site/VoiceAgentSection";

const whatsapp = "https://wa.me/972523393768";
const email = "mailto:assaf.buskila10@gmail.com";
const calendarCall = "https://calendar.app.google/K994sdXaeLw8rjCe8";

const navItems = [
  { href: "#solutions", label: "פתרונות" },
  { href: "#voice", label: "דברו איתו" },
  { href: "#works", label: "עבודות" },
  { href: "#contact", label: "יצירת קשר" },
];

const works = [
  {
    name: "MYstudio",
    href: "https://mystudio.pics",
    showcase: "/assets/services/service-7.webp",
    tag: "מוצר AI",
    external: true,
    line: "פלטפורמת AI שבניתי מאפס: מעלים תמונת מוצר ומקבלים תוכן שיווקי ממותג, כולל משתמשים ותשלומים.",
  },
  {
    name: "מוצ׳י",
    href: "https://mochi-israel.com",
    showcase: "/assets/projects/showcase-mochi.webp",
    tag: "אתר חי",
    external: true,
    line: "אתר מותג עם אלמנטים שנבנו מאפס, שמכניס לידים והזמנות לאירועים דרך וואטסאפ.",
  },
  {
    name: "קפה אנה",
    href: "https://cafe-ana.com",
    showcase: "/assets/projects/showcase-ana.webp",
    tag: "אתר חי",
    external: true,
    line: "אתר לבית קפה שכונתי: תפריט, אווירה ופנייה מהירה, עם ליווי צמוד של חודש.",
  },
  {
    name: "מנגינת ממתקים",
    href: "/candy/",
    showcase: "/assets/projects/showcase-candy.webp",
    tag: "פרויקט קונספט",
    external: true,
    line: "אתר חוויה למותג ממתקים. טעימה מהצד האינטראקטיבי והמשחקי שאני אוהב לבנות.",
  },
];

const faqItems = [
  {
    q: "מה זה בעצם עובד דיגיטלי?",
    a: "סוכן AI שבנוי סביב העסק שלכם: מכיר את השירותים והמחירים, עונה ללקוחות בוואטסאפ, באתר או בטלפון, ויודע מתי להעביר אליכם. הוא לא מחליף אתכם. הוא תופס את מה שהיום פשוט נופל.",
  },
  {
    q: "כמה עולה פתרון AI?",
    a: "תלוי מה בונים: אוטומציה ממוקדת עולה הרבה פחות מסוכן קולי מלא. אחרי שיחת אבחון קצרה תקבלו הצעה מסודרת עם מחיר סופי. לא נוסף מע״מ ואין הפתעות בהמשך.",
  },
  {
    q: "אני לא מבין בטכנולוגיה. זה מסובך להטמיע?",
    a: "לא. אני בונה את הכול, מחבר למערכות שכבר יש לכם ומדריך אתכם בעברית פשוטה. אם אתם יודעים לענות לוואטסאפ, אתם יודעים לעבוד עם עובד דיגיטלי.",
  },
  {
    q: "אני בכלל עוד צריך אתר?",
    a: "אתר טוב הוא עדיין הבית של העסק, ואני עדיין בונה כאלה. ההבדל הוא שהיום הוא לא חייב להיות דומם: מוסיפים לו סוכן שעונה, טופס חכם ואוטומציות שממשיכות את השיחה.",
  },
  {
    q: "המידע של העסק והלקוחות שלי בטוח?",
    a: "כן. אני עובד רק עם ספקים מוכרים, מפתחות הגישה נשמרים בצד השרת בלבד, והמידע שלכם משמש רק לפתרון עצמו. מה שלא חייב להישמר, לא נשמר.",
  },
];

const solutionItems = [
  {
    icon: Zap,
    label: "אוטומציות עסקיות",
    text: "מעקב אחרי לידים, תזכורות, סנכרון בין מערכות. העבודה שחוזרת על עצמה נעשית לבד.",
    href: null,
  },
  {
    icon: Bot,
    label: "סוכן AI לעסק",
    text: "עובד דיגיטלי שעונה ללקוחות בוואטסאפ ובאתר, מסנן, מתאם ומוכר. בטון שלכם, 24/7.",
    href: null,
  },
  {
    icon: Mic,
    label: "סוכן קולי",
    text: "עונה לטלפון כשאתם עסוקים, קובע תורים ומסכם לכם בוואטסאפ. אפשר לשמוע אותו כאן בעמוד.",
    href: "#voice",
    linkLabel: "לשמוע אותו חי",
  },
  {
    icon: LayoutGrid,
    label: "אפליקציות ופיצ'רים",
    text: "כלים פנימיים, דשבורדים וחיבורים בין מערכות, בדיוק לפי איך שהעסק שלכם עובד.",
    href: null,
  },
  {
    icon: Globe,
    label: "אתרים ודפי נחיתה",
    text: "המקצוע שממנו התחלתי: אתר שמסביר מהר, מרגיש כמו העסק ומכניס פניות בוואטסאפ.",
    href: null,
  },
  {
    icon: Contact,
    label: "כרטיס ביקור דיגיטלי",
    text: "דרך מהירה ומשתלמת להיראות מקצועי: כל הפרטים, הקישורים והפנייה בלחיצה אחת.",
    href: null,
  },
  {
    icon: Megaphone,
    label: "סושיאל מדיה ותוכן",
    text: "תוכן ממותג לרשתות בעזרת AI: פוסטים, גרפיקה וסטוריז, בקצב שהעסק באמת צריך.",
    href: null,
  },
];

const serviceShowcase = [
  { src: "/assets/services/service-4.webp", label: "סוכן AI" },
  { src: "/assets/services/service-5.webp", label: "סוכן קולי" },
  { src: "/assets/services/service-6.webp", label: "אתרים ודפי נחיתה" },
  { src: "/assets/services/service-1.webp", label: "אוטומציות" },
  { src: "/assets/services/service-2.webp", label: "כרטיס ביקור דיגיטלי" },
  { src: "/assets/services/service-3.webp", label: "אפליקציות" },
  { src: "/assets/services/service-8.webp", label: "סושיאל מדיה" },
  { src: "/assets/services/service-7.webp", label: "יצירת תוכן ב-AI" },
];

const stats = [
  {
    value: 1,
    suffix: " שותף",
    label: "אבחון, בנייה, הטמעה וליווי, הכול מול אדם אחד",
    icon: Clock3,
  },
  {
    value: 24,
    suffix: "/7",
    label: "העובד הדיגיטלי לא יוצא לחופש ולא מפספס פנייה",
    icon: BadgeCheck,
  },
  {
    value: 4,
    suffix: " פרויקטים",
    label: "מוצר AI ואתרים חיים, פתוחים לבדיקה כאן בעמוד",
    icon: MousePointer2,
  },
];

const process = [
  {
    title: "שיחת אבחון",
    text: "שיחה קצרה על העסק: איפה הולך הזמן, איפה נופלות פניות, ומה הכי כואב עכשיו.",
  },
  {
    title: "מיפוי תהליכים",
    text: "עוברים על איך העסק עובד היום ומסמנים מה שווה להפוך לאוטומטי. בלי לשבור כלום.",
  },
  {
    title: "פיילוט קטן",
    text: "בונים קודם את הפתרון הכי משתלם, כדי שתראו תוצאה אמיתית מהר ובלי סיכון.",
  },
  {
    title: "חיבור למערכות",
    text: "מחברים את הפתרון לוואטסאפ, ליומן, לטפסים ולכלים שאתם כבר עובדים איתם.",
  },
  {
    title: "השקה ומדידה",
    text: "עולים לאוויר, עוקבים אחרי מה שקורה באמת, ומדייקים עד שהמספרים מדברים.",
  },
  {
    title: "חודש ליווי",
    text: "אחרי ההשקה אני נשאר איתכם חודש: שינויים, כיוונונים ותשובות לכל שאלה.",
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
  "רוב העסקים לא מפסידים לקוחות בגלל המחיר.",
  "הם מפסידים אותם כשאף אחד לא עונה.",
  "עובד דיגיטלי תופס כל פנייה, עונה מיד, ונשמע בדיוק כמוכם.",
  "פתאום העסק מרגיש גדול, זמין ומסודר, גם כשאתם באמצע עבודה.",
  "ובסוף זה אומר יותר פניות, יותר זמן, ויותר כסף שנשאר אצלכם.",
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

  if (cleanSuffix === "/7") {
    return (
      <span className="stat-value" dir="ltr">
        <bdi className="count-target" data-countup={value}>{value}</bdi>/7
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

const stackBricks: BrickDef[] = [
  { id: "agents", label: "סוכני AI", studs: 4, theme: "action" },
  { id: "python", label: "Python", studs: 4, theme: "navy" },
  { id: "react", label: "React / Next.js", studs: 4, theme: "ink" },
  { id: "rag", label: "RAG / LangGraph", studs: 4, theme: "steel" },
  { id: "fastapi", label: "FastAPI", studs: 2, theme: "sky" },
  { id: "supabase", label: "Supabase", studs: 2, theme: "mist" },
];

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
      "היי אסף, אני רוצה לבדוק פתרון AI לעסק.",
      `שם: ${name}`,
      `טלפון: ${phone}`,
      `מה מעניין אותי: ${project}`,
      `מה חשוב לי שיקרה: ${goal}`,
    ].join("\n");

    const url = `${whatsapp}?text=${encodeURIComponent(message)}`;
    const win = window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
    // Popup blockers return null, so keep a direct link and the lead isn't lost.
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
          placeholder="אוטומציה, סוכן AI, סוכן קולי, אתר, אפליקציה"
        />
      </label>

      <label className="space-y-2 block">
        <span className="text-sm font-black text-navy">מה חשוב לך שיקרה?</span>
        <textarea
          name="goal"
          required
          rows={4}
          className="form-control resize-none"
          placeholder="ספרו מה העסק עושה ומה גוזל לכם הכי הרבה זמן. אפשר לבוא גם בלי רעיון סגור."
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

export function LandingPage({ voiceEnabled = false }: { voiceEnabled?: boolean }) {
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
    jobTitle: "AI Solutions Engineer",
    knowsAbout: [
      "פתרונות AI לעסקים",
      "אוטומציות עסקיות",
      "סוכני AI",
      "סוכן קולי",
      "בניית אתרים",
      "LLM applications",
      "RAG",
      "LangGraph",
      "Python",
      "FastAPI",
      "Next.js",
      "Supabase",
      "אינטגרציות וואטסאפ",
    ],
    makesOffer: [
      "אוטומציות עסקיות",
      "סוכן AI לעסק (עובד דיגיטלי)",
      "סוכן קולי בעברית",
      "בניית אפליקציות ופיצ'רים",
      "אתרים ודפי נחיתה בעברית",
      "כרטיס ביקור דיגיטלי",
      "סושיאל מדיה ותוכן AI",
      "חודש ליווי אחרי השקה",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
    workExample: works.map((work) =>
      work.name === "MYstudio"
        ? {
            "@type": "SoftwareApplication",
            name: work.name,
            url: work.href,
            applicationCategory: "DesignApplication",
            operatingSystem: "Web",
          }
        : {
            "@type": "WebSite",
            name: work.name,
            url: work.href.startsWith("http") ? work.href : `https://www.assafweb.com${work.href}`,
          }
    ),
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
                <span className="block text-xs font-bold text-muted">AI solutions studio</span>
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
              <span className="hero-kicker">סטודיו לפתרונות AI לעסקים</span>
              <h1 className="max-w-3xl text-balance text-[clamp(2.5rem,4.4vw,4.5rem)] font-black leading-[1.02] tracking-normal text-ink">
                {["עובד דיגיטלי", "שעונה, מוכר", "ומתאם.", "גם ב-2 בלילה"].map((line, index) => (
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
                אני אסף בוסקילה, מהנדס פתרונות AI. אני בונה לעסקים סוכנים חכמים, אוטומציות
                ואפליקציות שתופסים כל פנייה ועונים כמוכם, כדי שיישאר לכם זמן לעבודה עצמה. וכן, גם אתרים.
              </p>

              <div className="hero-cta-row flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="btn-primary magnetic">
                  בואו נדבר בוואטסאפ
                  <MessageCircle size={19} />
                </a>
                <a href="#voice" className="btn-secondary magnetic">
                  לשמוע את הסוכן
                  <ChevronLeft size={19} />
                </a>
              </div>
            </div>
          </div>

          <a href="#voice" className="hero-scroll-cue" aria-label="גללו למטה">
            <span className="hero-scroll-cue__line" aria-hidden="true" />
            <span>גללו</span>
          </a>
        </section>

        <section id="voice" data-bg="#f4f9ff" className="voice-section relative overflow-hidden py-20 md:py-28">
          <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="gsap-reveal space-y-5">
              <span className="eyebrow">דברו איתו</span>
              <h2 className="text-balance text-4xl font-black leading-tight text-ink md:text-6xl">
                אל תאמינו לי. תדברו איתו.
              </h2>
              <p className="max-w-2xl text-lg font-medium leading-8 text-muted">
                זה סוכן קולי חי שבניתי. הוא מדבר עברית, מכיר את העסק שלי, ובנוי בדיוק כמו
                סוכן שהעסק שלכם יכול לקבל. שיחה אחת קצרה ותבינו לבד איך זה מרגיש ללקוח שלכם.
              </p>
            </div>
            <div className="gsap-reveal">
              <VoiceAgentSection whatsapp={whatsapp} enabled={voiceEnabled} />
            </div>
          </div>
        </section>

        <section id="works" data-bg="#ffffff" className="works-section relative py-20 md:py-28">
          <div className="section-shell">
            <div className="mb-10 max-w-3xl space-y-4">
              <span className="eyebrow">עבודות</span>
              <h2 className="text-balance text-4xl font-black leading-tight text-ink md:text-6xl">
                פרויקטים חיים שאפשר לפתוח ולבדוק
              </h2>
              <p className="max-w-2xl text-lg font-medium leading-8 text-muted">
                לא מוקאפים ולא הדמיות. מוצר AI אמיתי ואתרים חיים של לקוחות:
                לוחצים, נכנסים ורואים איך זה מרגיש.
              </p>
            </div>

            <PortfolioGallery
              items={works.map((work) => ({
                src: work.showcase,
                alt: `צילום מסך של ${work.name}`,
                href: work.href,
                name: work.name,
              }))}
            />

            <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {works.map((work) => (
                <a
                  key={work.name}
                  href={work.href}
                  target="_blank"
                  rel="noreferrer"
                  className="gsap-reveal premium-panel group p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <strong className="text-lg font-black text-ink">{work.name}</strong>
                    <span className="work-card__tag">{work.tag}</span>
                  </div>
                  <p className="mt-2 text-sm font-medium leading-6 text-muted">{work.line}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-black text-action">
                    לפתוח את הפרויקט
                    <ArrowUpLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="solutions" data-bg="#eef7ff" className="solutions-section relative">
          <div className="section-shell pt-20 md:pt-28">
            <div className="mb-6 max-w-3xl space-y-4">
              <span className="eyebrow">מה אני בונה</span>
              <h2 className="text-balance text-4xl font-black leading-tight text-ink md:text-6xl">
                מה עובד דיגיטלי יכול לעשות בשבילכם
              </h2>
            </div>
          </div>

          <ScrollMorphServices cards={serviceShowcase} />

          <div className="section-shell pb-20 md:pb-28 pt-6">
            <p className="mb-10 max-w-2xl text-lg font-medium leading-8 text-muted md:text-xl">
              כל עסק מפסיד זמן וכסף במקום אחר. בוחרים מה הכי כואב, ואני בונה פתרון
              שמתחבר למה שכבר יש לכם.
            </p>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-label="הפתרונות שאני בונה">
              {solutionItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="gsap-reveal premium-panel solution-card p-6">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white">
                      <Icon size={21} />
                    </div>
                    <h3 className="text-2xl font-black text-ink">{item.label}</h3>
                    <p className="mt-3 text-base font-medium leading-8 text-muted">{item.text}</p>
                    {item.href ? (
                      <a href={item.href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-black text-action">
                        {item.linkLabel}
                        <ArrowUpLeft size={16} />
                      </a>
                    ) : null}
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
                טכנולוגיה טובה לא אמורה לסבך אתכם. היא צריכה לתפוס את העבודה שחוזרת
                על עצמה, לענות כשאתם לא פנויים, ולהשאיר לכם את מה שאתם הכי טובים בו.
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
              <strong>עסק שמרגיש כאילו יש לו צוות שלם, גם כשהוא עסק של אדם אחד.</strong>
            </div>
          </div>
          </div>
        </section>

        <section id="about" data-bg="#f8fbff" className="about-section relative py-20 md:py-28">
          <div className="texture-soft opacity-70" />
          <div className="section-shell about-layout grid gap-10 lg:grid-cols-[1.05fr_1.1fr] lg:items-center">
            <div className="gsap-reveal">
              <TechStackBuilder
                bricks={stackBricks}
                baseLabel="אסף בוסקילה"
                baseSubtitle="AI Solutions Engineer"
                baseImage="/assets/assaf-photo.jpg"
                whatsapp={whatsapp}
              />
            </div>
            <div className="gsap-reveal about-copy space-y-6">
              <h2 className="text-balance text-4xl font-black leading-tight text-ink md:text-6xl">
                אני לא מוכר כלים. אני בונה עובדים דיגיטליים.
              </h2>
              <p className="text-xl font-medium leading-9 text-muted">
                אני אסף, מהנדס פתרונות AI וסטודנט להנדסת תעשייה וניהול בשנקר. בניתי את
                MYstudio, פלטפורמת AI מלאה עם משתמשים ותשלומים, ומערכת לניתוח מסמכים פיננסיים.
                לפני זה הייתי קצין קרבי בצנחנים, אז סדר, אחריות ועמידה בלחץ הם לא סיסמאות אצלי.
              </p>
              <p className="text-lg font-semibold leading-8 text-navy">
                מתחילים בשיחת אבחון קצרה. לא צריך להבין ב-AI, זה בדיוק התפקיד שלי: אני ממפה
                איפה הולך לכם זמן, בונה פתרון שמתחבר למה שכבר יש לכם, ונשאר חודש ליווי אחרי
                ההשקה לוודא שהכול באמת עובד.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {["סוכני AI ואוטומציות בהתאמה אישית", "Python, FastAPI ו-RAG מאחורי הקלעים", "חיבור לוואטסאפ ולמערכות קיימות", "מוצר שלם מקצה לקצה: MYstudio", "מחיר סופי בלי הפתעות"].map((item) => (
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
                ככה מכניסים AI לעסק, בלי כאב ראש
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
                ככה מרגיש לעבוד איתי
              </h2>
            </div>
            <p className="text-lg font-medium leading-8 text-muted">
              אלה לא משפטי פרסום. אלה לקוחות מהפרויקטים שמהם התחלתי, והם מקבלים
              בדיוק את אותה רמת ליווי שנכנסת עכשיו לפתרונות ה-AI.
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
                ואם יש שאלה שלא כאן, שלחו אותה בוואטסאפ. עונה גם על שאלות קטנות.
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
                יש לך עסק טוב. עכשיו תן לו עובד שלא ישן.
              </h2>
              <p className="text-xl font-medium leading-9 text-muted">
                שלחו כמה מילים על העסק ומה גוזל לכם הכי הרבה זמן. גם אם אין לכם מושג מה
                אפשר להפוך לאוטומטי, זה בדיוק בשביל זה יש שיחת אבחון.
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
              עסק שמרגיש כאילו יש לו צוות שלם. גם בשתיים בלילה.
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
