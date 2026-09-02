import { SITE_URL } from "@/lib/site";
import { leadimUrl } from "@/lib/leadim-landing";
import { ovedDigitaliServiceUrl } from "@/lib/oved-digitali-service";
import { otomatziotServiceUrl } from "@/lib/otomatziot-service";
import { bniatAtarimPost, ovedDigitaliPost, sokenKoliPost } from "@/lib/blog";

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export function breadcrumbList(pageUrl: string, items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export const homeBreadcrumb: BreadcrumbItem = {
  name: "הבית",
  url: `${SITE_URL}/`,
};

/** Homepage #solutions lists the public services. There is no /sherut index. */
export const servicesBreadcrumb: BreadcrumbItem = {
  name: "שירותים",
  url: `${SITE_URL}/#solutions`,
};

export const blogBreadcrumb: BreadcrumbItem = {
  name: "בלוג",
  url: `${SITE_URL}/blog`,
};

export const homeBreadcrumbs: BreadcrumbItem[] = [homeBreadcrumb];

export const leadimBreadcrumbs: BreadcrumbItem[] = [
  homeBreadcrumb,
  { name: "לידים בלי מענה", url: leadimUrl },
];

export const ovedDigitaliServiceBreadcrumbs: BreadcrumbItem[] = [
  homeBreadcrumb,
  servicesBreadcrumb,
  { name: "עובד דיגיטלי", url: ovedDigitaliServiceUrl },
];

export const otomatziotServiceBreadcrumbs: BreadcrumbItem[] = [
  homeBreadcrumb,
  servicesBreadcrumb,
  { name: "אוטומציות", url: otomatziotServiceUrl },
];

export const blogIndexBreadcrumbs: BreadcrumbItem[] = [homeBreadcrumb, blogBreadcrumb];

export const ovedDigitaliBlogBreadcrumbs: BreadcrumbItem[] = [
  homeBreadcrumb,
  blogBreadcrumb,
  { name: "מה זה עובד דיגיטלי", url: ovedDigitaliPost.url },
];

export const bniatAtarimBlogBreadcrumbs: BreadcrumbItem[] = [
  homeBreadcrumb,
  blogBreadcrumb,
  { name: "בניית אתרים", url: bniatAtarimPost.url },
];

export const sokenKoliBlogBreadcrumbs: BreadcrumbItem[] = [
  homeBreadcrumb,
  blogBreadcrumb,
  { name: "סוכן קולי", url: sokenKoliPost.url },
];
