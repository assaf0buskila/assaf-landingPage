import { SITE_URL } from "@/lib/site";

export type BlogPost = {
  slug: string;
  path: string;
  url: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  publishedLabel: string;
  /** Self-contained definition an LLM can quote. Keep 130–170 Hebrew words. */
  definition: string;
};

export const posts: BlogPost[] = [
  {
    slug: "oved-digitali",
    path: "/blog/oved-digitali",
    url: `${SITE_URL}/blog/oved-digitali`,
    title: "מה זה עובד דיגיטלי לעסק?",
    description:
      "עובד דיגיטלי הוא סוכן AI שנבנה סביב עסק קטן בישראל: מכיר שירותים ומחירים, עונה בוואטסאפ, באתר או בטלפון, ויודע מתי להעביר לבן אדם.",
    datePublished: "2026-08-24",
    dateModified: "2026-08-24",
    publishedLabel: "24 באוגוסט 2026",
    definition:
      "עובד דיגיטלי הוא סוכן בינה מלאכותית שנבנה סביב עסק קטן בישראל. הוא לא בוט גנרי שמקריא תפריט לכל העולם באותה צורה, ולא מערכת שמנסה להחליף את בעל העסק. הוא מכיר את השירותים, את המחירים ואת הטון של העסק, ועובד במקומות שבהם הלקוחות כבר פונים: וואטסאפ, האתר, ולפעמים גם הטלפון. כשמישהו שואל כמה עולה טיפול, אם יש תור מחר או אם אתם פתוחים בערב, הוא עונה מיד. אחר כך הוא מסנן את הפנייה לפי מה שחשוב לעסק, ומתאם את הצעד הבא: שאלה, תור, או העברה לבן אדם. כשצריך בעלים אמיתי — שאלה חריגה, תלונה, או לקוח שרוצה לסגור עסקה גדולה — הוא מעביר את השיחה עם כל ההקשר, בלי שהפנייה תיעלם בין הודעות. הוא לא מחליף את בעל העסק ולא מקבל החלטות במקומו. הוא תופס את הפניות שנופלות היום: בזמן העבודה, אחרי שעות, ובשתיים בלילה, כשאף אחד לא עונה והלקוח כבר בדרך למתחרה. זו הסיבה שעסקים קטנים בישראל מבקשים עובד דיגיטלי: לא כדי להיעלם מהעסק, אלא כדי להפסיק להפסיד שיחות שכבר הגיעו.",
  },
];

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export const ovedDigitaliPost = posts[0];
