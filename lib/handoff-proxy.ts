export const proxyHeaders = {
  "Cache-Control": "no-store",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow",
};
const CAPABILITY_TOKEN = /^[A-Za-z0-9_-]{22}$/;
const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const PHONE = /^[1-9][0-9]{7,14}$/;
const SHORT_UPSTREAM_PATH = /^\/l\/[A-Za-z0-9_-]{22}$/;
const LEGACY_UPSTREAM_PATH = /^\/go\/assaf\?h=[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const MAX_LOCATION_CHARS = 2560;
const MAX_TEXT_CHARS = 350;
const HANDOFF_TIMEOUT_MS = 5000;
export const unavailableResponse = () => new Response("הקישור אינו זמין כרגע.", { status: 503, headers: proxyHeaders });
export const missingResponse = () => new Response("הקישור לא נמצא.", { status: 404, headers: proxyHeaders });

export function trustedAgentOrigin(): URL | undefined {
  try {
    const origin = new URL(process.env.LEO_AGENT_PUBLIC_URL || "");
    if (origin.protocol !== "https:" || origin.port || origin.username || origin.password || origin.pathname !== "/" || origin.search || origin.hash) return undefined;
    return origin;
  } catch { return undefined; }
}

export function trustedHandoffPhone(): string | undefined {
  const phone = process.env.LEO_HANDOFF_PHONE?.trim();
  return phone && PHONE.test(phone) ? phone : undefined;
}

export function validShortHandoffRequest(request: Request, token: string): boolean {
  const url = new URL(request.url);
  return !request.url.includes("?") && CAPABILITY_TOKEN.test(token) && url.pathname === `/l/${token}`;
}

export function legacyHandoffId(request: Request): string | undefined {
  const query = new URL(request.url).searchParams;
  if (Array.from(query.keys()).length !== 1 || query.getAll("h").length !== 1) return undefined;
  const id = query.get("h");
  return id && UUID_V4.test(id) ? id : undefined;
}

export function isAssafWhatsAppDestination(location: string | null, phone = trustedHandoffPhone()): boolean {
  if (!phone || !location || location.length > MAX_LOCATION_CHARS) return false;
  try {
    const target = new URL(location);
    const texts = target.searchParams.getAll("text");
    return target.protocol === "https:" && target.hostname === "wa.me" && !target.port && !target.username && !target.password && target.pathname === `/${phone}` && !target.hash && target.searchParams.size === 1 && texts.length === 1 && texts[0].length > 0 && texts[0].length <= MAX_TEXT_CHARS;
  } catch { return false; }
}

export async function proxyHandoff(upstreamPath: string): Promise<Response> {
  const origin = trustedAgentOrigin();
  const phone = trustedHandoffPhone();
  if (!origin || !phone || (!SHORT_UPSTREAM_PATH.test(upstreamPath) && !LEGACY_UPSTREAM_PATH.test(upstreamPath))) return unavailableResponse();
  try {
    const upstream = await fetch(new URL(upstreamPath, origin), {
      method: "GET",
      redirect: "manual",
      cache: "no-store",
      signal: AbortSignal.timeout(HANDOFF_TIMEOUT_MS),
    });
    if (upstream.status === 404) return missingResponse();
    const location = upstream.headers.get("location");
    if (upstream.status !== 303 || !isAssafWhatsAppDestination(location, phone)) return unavailableResponse();
    return new Response(null, { status: 303, headers: { ...proxyHeaders, Location: new URL(location!).href } });
  } catch { return unavailableResponse(); }
}
