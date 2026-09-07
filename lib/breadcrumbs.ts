import { SITE_URL } from "@/lib/site";
import { leadimUrl } from "@/lib/leadim-landing";
import { ovedDigitaliServiceUrl } from "@/lib/oved-digitali-service";
import { otomatziotServiceUrl } from "@/lib/otomatziot-service";
import { bniatAtarimPost, otomatziotPost, ovedDigitaliPost, sokenKoliPost } from "@/lib/blog";

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

export const servicesBreadcrumb: BreadcrumbItem = {
  name: "שירותים",
  url: `${SITE_URL}/sherut`,
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

export const sherutIndexBreadcrumbs: BreadcrumbItem[] = [homeBreadcrumb, servicesBreadcrumb];

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

export const otomatziotBlogBreadcrumbs: BreadcrumbItem[] = [
  homeBreadcrumb,
  blogBreadcrumb,
  { name: "אוטומציה לעסק קטן", url: otomatziotPost.url },
];
