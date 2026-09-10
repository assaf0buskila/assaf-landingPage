import { buildLeoEntryPath, isLeoWidgetEligiblePath, type LeoAttribution } from "../lib/leo-entry";
import styles from "./LeoWhatsAppWidget.module.css";

type LeoWhatsAppWidgetProps = LeoAttribution & { pathname: string };

/** Place in the public marketing-page shell with the server-known pathname. */
export function LeoWhatsAppWidget({ pathname, page, campaign }: LeoWhatsAppWidgetProps) {
  if (!isLeoWidgetEligiblePath(pathname)) return null;
  const href = buildLeoEntryPath({ page: page ?? pathname, campaign });
  return (
    <aside className={styles.widget} dir="rtl" aria-label="פתיחת שיחה עם ליאו בוואטסאפ">
      <a
        className={styles.link}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-leo-widget="whatsapp"
        aria-label="דברו עם ליאו, סוכן ה AI של אסף, בוואטסאפ"
      >
        <span className={styles.avatar} aria-hidden="true">
          <img
            src="/assets/leo-avatar-v2.webp"
            width="84"
            height="84"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </span>
        <span className={styles.content}>
          <span className={styles.kicker}>ליאו · סוכן AI</span>
          <strong className={styles.title}>יש שאלה על AI לעסק?</strong>
          <span className={styles.copy}>מתחילים שיחה קצרה בוואטסאפ</span>
        </span>
        <span className={styles.arrow} aria-hidden="true">←</span>
      </a>
    </aside>
  );
}
