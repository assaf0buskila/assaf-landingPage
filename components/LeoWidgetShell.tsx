"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { LeoWhatsAppWidget } from "./LeoWhatsAppWidget";

/** One shared mount covers public pages while route policy excludes private utilities. */
export function LeoWidgetShell() {
  const pathname = usePathname();
  const campaign = useSearchParams().get("utm_campaign") ?? undefined;
  return <LeoWhatsAppWidget pathname={pathname} page={pathname} campaign={campaign} />;
}
