import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "האתר של אסף | אתרים שמעבירים מסר בלתי נשכח";
const description =
  "אסף בוסקילה בונה אתרי תדמית ודפי נחיתה בעברית לעסקים שרוצים מסר ברור, חוויה זכירה, לידים איכותיים וליווי אישי עד שהאתר עובד באמת.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.assafweb.com"),
  applicationName: "האתר של אסף",
  title,
  description,
  keywords: [
    "אסף בוסקילה",
    "האתר של אסף",
    "בניית אתרים לעסקים",
    "עיצוב אתרים בעברית",
    "דף נחיתה",
    "אתר תדמית",
    "אתרים אינטראקטיביים",
    "RTL Hebrew website",
    "WhatsApp leads",
  ],
  authors: [{ name: "אסף בוסקילה", url: "https://www.assafweb.com/" }],
  creator: "אסף בוסקילה",
  publisher: "אסף בוסקילה",
  category: "Web design",
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
        alt: "אסף בוסקילה, בניית אתרים לעסקים בעברית",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/og-cover.jpg"],
  },
  icons: {
    icon: "/assets/about-me.png",
    apple: "/assets/about-me.png",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
