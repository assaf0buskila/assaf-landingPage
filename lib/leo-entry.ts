const DEFAULT_LEO_PHONE = "972537037498";
const MAX_PAGE_LENGTH = 180;
const MAX_CAMPAIGN_LENGTH = 120;
const ATTRIBUTION_PATTERN = /^[a-zA-Z0-9/_-]+$/;

export type LeoAttribution = { page?: string; campaign?: string };

/** Public marketing pages opt in by default; private and utility routes opt out. */
export function isLeoWidgetEligiblePath(pathname: string): boolean {
  const path = normalisePath(pathname);
  const excludedPrefixes = [
    "/admin",
    "/api",
    "/_next",
    "/legal",
    "/privacy",
    "/terms",
    "/cookies",
    "/account",
    "/go",
    "/l",
    "/.well-known",
    "/leo/start",
  ];
  const excludedFiles = new Set(["/agent.html", "/index.md", "/pricing.md", "/llms.txt", "/llms-full.txt"]);
  return !excludedFiles.has(path) && !excludedPrefixes.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

export function buildLeoWhatsAppUrl(_attribution: LeoAttribution = {}): string {
  const message = "היי ליאו, אשמח להכיר אותך";
  return `https://wa.me/${leoPhone()}?text=${encodeURIComponent(message)}`;
}

/** Client-safe local entry route; the server constructs the external WhatsApp URL. */
export function buildLeoEntryPath(attribution: LeoAttribution = {}): string {
  const query = new URLSearchParams();
  const page = boundedAttribution(attribution.page, MAX_PAGE_LENGTH);
  const campaign = boundedAttribution(attribution.campaign, MAX_CAMPAIGN_LENGTH);
  if (page) query.set("page", page);
  if (campaign) query.set("campaign", campaign);
  const suffix = query.toString();
  return suffix ? `/leo/start?${suffix}` : "/leo/start";
}

/**
 * Untrusted analytics-only tail. It has a fixed grammar so the backend can remove
 * it before model use without guessing at customer-authored text.
 */
export function buildAttributionMarker(attribution: LeoAttribution): string | undefined {
  const page = boundedAttribution(attribution.page, MAX_PAGE_LENGTH);
  const campaign = boundedAttribution(attribution.campaign, MAX_CAMPAIGN_LENGTH);
  if (!page && !campaign) return undefined;
  const payload = JSON.stringify({ ...(page ? { page } : {}), ...(campaign ? { campaign } : {}) });
  return `\n[leo-attribution:${base64url(payload)}]`;
}

function leoPhone(): string {
  const configured = process.env.LEO_WHATSAPP_PHONE?.trim();
  return configured && /^\d{8,15}$/.test(configured) ? configured : DEFAULT_LEO_PHONE;
}

function boundedAttribution(value: string | undefined, maximum: number): string | undefined {
  if (!value) return undefined;
  const candidate = value.trim().slice(0, maximum);
  return candidate && ATTRIBUTION_PATTERN.test(candidate) ? candidate : undefined;
}

function base64url(value: string): string {
  const binary = Array.from(new TextEncoder().encode(value), (byte) => String.fromCharCode(byte)).join("");
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/u, "");
}

function normalisePath(pathname: string): string {
  const path = pathname.trim().split("?")[0]?.split("#")[0] || "/";
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}
