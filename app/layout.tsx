import type { Metadata, Viewport } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const title = "האתר של אסף | עובד דיגיטלי לעסק: AI, אוטומציות ואתרים";
const description =
  "אסף בוסקילה בונה לעסקים עובדים דיגיטליים: סוכני AI שעונים ללקוחות, אוטומציות שחוסכות שעות, סוכן קולי בעברית, אפליקציות ואתרים. הכול במקום אחד, עם ליווי אישי עד שזה עובד באמת.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.assafweb.com"),
  applicationName: "האתר של אסף",
  title,
  description,
  keywords: [
    "אסף בוסקילה",
    "האתר של אסף",
    "פתרונות AI לעסקים",
    "אוטומציות לעסקים",
    "סוכן AI",
    "עובד דיגיטלי",
    "סוכן קולי לעסק",
    "צ'אטבוט לעסק",
    "בניית אפליקציות לעסקים",
    "כרטיס ביקור דיגיטלי",
    "בניית אתרים לעסקים",
    "דף נחיתה",
    "AI automation Israel",
    "Hebrew AI agent",
    "WhatsApp leads",
  ],
  authors: [{ name: "אסף בוסקילה", url: "https://www.assafweb.com/" }],
  creator: "אסף בוסקילה",
  publisher: "אסף בוסקילה",
  category: "AI solutions",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "he-IL": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title,
    description,
    url: "https://www.assafweb.com/",
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
    description,
    images: ["/assets/og-cover.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#F8FBFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={assistant.className}>{children}</body>
    </html>
  );
}
