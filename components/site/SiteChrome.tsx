import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpLeft, MessageCircle } from "lucide-react";
import { EMAIL, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

const navItems = [
  { href: "/", label: "הבית" },
  { href: "/#solutions", label: "פתרונות" },
  { href: "/blog", label: "בלוג" },
  { href: "/#contact", label: "יצירת קשר" },
];

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
        <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/80 bg-white/95 px-3 py-2 shadow-soft md:px-4">
          <Link href="/" className="site-brand flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-sm font-black text-white">
              אב
            </span>
            <span className="hidden text-sm font-black leading-tight text-navy sm:block">
              אסף בוסקילה
              <span className="block text-xs font-bold text-muted">AI solutions studio</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="ניווט ראשי">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link rounded-full px-5 py-3 text-base font-black text-muted transition hover:bg-mist/60 hover:text-navy"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/#contact" className="btn-primary min-h-10 px-4 text-sm">
            בואו נדבר
            <MessageCircle size={17} />
          </Link>
        </div>
      </header>

      {children}

      <footer className="site-footer relative overflow-hidden px-4 pb-14 pt-28 text-white md:pt-36">
        <div className="section-shell relative z-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black text-mist">האתר של אסף</p>
            <p className="mt-3 max-w-2xl text-3xl font-black leading-tight md:text-5xl">
              עסק שמרגיש כאילו יש לו צוות שלם. גם בשתיים בלילה.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/#contact" className="btn-primary">
              בואו נדבר
              <MessageCircle size={19} />
            </Link>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary bg-white text-navy"
            >
              אינסטגרם
              <ArrowUpLeft size={19} />
            </a>
          </div>
        </div>
        <div className="section-shell relative z-10 mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm font-bold text-white/60 md:flex-row md:items-center md:justify-between">
          <span>© 2026 אסף בוסקילה</span>
          <span dir="ltr" className="flex flex-wrap items-center gap-x-2">
            <a href={`mailto:${EMAIL}`} className="transition hover:text-white">
              {EMAIL}
            </a>
            <span aria-hidden="true">·</span>
            <a href={`tel:${PHONE_TEL}`} className="transition hover:text-white">
              {PHONE_DISPLAY}
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}
