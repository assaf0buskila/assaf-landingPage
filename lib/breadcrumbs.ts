import { SITE_URL } from "@/lib/site";

export type BreadcrumbCrumb = {
  name: string;
  item: string;
};

export function breadcrumbList(crumbs: readonly BreadcrumbCrumb[], pageUrl: string) {
  return {
    "@type": "BreadcrumbList" as const,
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };
}

export const homeCrumb: BreadcrumbCrumb = {
  name: "בית",
  item: `${SITE_URL}/`,
};

/** Intermediate service crumb. No /sherut index exists; #solutions is the live services section. */
export const servicesCrumb: BreadcrumbCrumb = {
  name: "שירותים",
  item: `${SITE_URL}/#solutions`,
};

export const blogCrumb: BreadcrumbCrumb = {
  name: "בלוג",
  item: `${SITE_URL}/blog`,
};

export function homeBreadcrumb() {
  return breadcrumbList([homeCrumb], `${SITE_URL}/`);
}

export function landingBreadcrumb(name: string, url: string) {
  return breadcrumbList([homeCrumb, { name, item: url }], url);
}

export function serviceBreadcrumb(name: string, url: string) {
  return breadcrumbList([homeCrumb, servicesCrumb, { name, item: url }], url);
}

export function blogIndexBreadcrumb() {
  return breadcrumbList([homeCrumb, blogCrumb], `${SITE_URL}/blog`);
}

export function blogPostBreadcrumb(title: string, url: string) {
  return breadcrumbList([homeCrumb, blogCrumb, { name: title, item: url }], url);
}
