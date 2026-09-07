import { SITE_URL } from "@/lib/site";
import { ovedDigitaliServicePath, ovedDigitaliServiceUrl } from "@/lib/oved-digitali-service";
import { otomatziotServicePath, otomatziotServiceUrl } from "@/lib/otomatziot-service";

export const sherutPath = "/sherut";
export const sherutUrl = `${SITE_URL}${sherutPath}`;

export const sherutIndexTitle = "שירותים דיגיטליים לעסק קטן בישראל";
export const sherutIndexDescription =
  "עובד דיגיטלי ואוטומציות לעסק קטן בישראל. שני עמודי שירות חיים, בלי מחירון ציבורי.";

export const sherutServices = [
  {
    name: "עובד דיגיטלי",
    path: ovedDigitaliServicePath,
    url: ovedDigitaliServiceUrl,
    summary: "עונה ללידים בוואטסאפ ובאתר, מסנן פניות ומתאם פגישות כשאתם לא ליד המסך.",
  },
  {
    name: "אוטומציות",
    path: otomatziotServicePath,
    url: otomatziotServiceUrl,
    summary: "מעקב אחרי לידים, תזכורות וסנכרון בין המערכות שהעסק כבר עובד איתן.",
  },
] as const;
