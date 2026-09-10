export const proxyHeaders = { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer", "X-Robots-Tag": "noindex, nofollow" };
const ASSAF_PATH = "/972523393768";
export const unavailableResponse = () => new Response("הקישור אינו זמין כרגע.", { status: 503, headers: proxyHeaders });
export const missingResponse = () => new Response("הקישור לא נמצא.", { status: 404, headers: proxyHeaders });

export function trustedAgentOrigin(): URL | undefined {
  try {
    const origin = new URL(process.env.LEO_AGENT_PUBLIC_URL || "");
    const local = process.env.NODE_ENV === "development" && ["127.0.0.1", "localhost", "[::1]"].includes(origin.hostname);
    if ((origin.protocol !== "https:" && !(local && origin.protocol === "http:")) || origin.username || origin.password || origin.pathname !== "/" || origin.search || origin.hash) return undefined;
    return origin;
  } catch { return undefined; }
}

export function isAssafWhatsAppDestination(location: string | null): boolean {
  try {
    const target = new URL(location || "");
    return target.protocol === "https:" && target.hostname === "wa.me" && !target.port && !target.username && !target.password && target.pathname === ASSAF_PATH && !target.hash && target.searchParams.size === 1 && target.searchParams.has("text");
  } catch { return false; }
}

export async function proxyHandoff(upstreamPath: string): Promise<Response> {
  const origin = trustedAgentOrigin();
  if (!origin) return unavailableResponse();
  try {
    const upstream = await fetch(new URL(upstreamPath, origin), { redirect: "manual", cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (upstream.status === 404) return missingResponse();
    const location = upstream.headers.get("location");
    if (upstream.status !== 303 || !isAssafWhatsAppDestination(location)) return unavailableResponse();
    return new Response(null, { status: 303, headers: { ...proxyHeaders, Location: new URL(location!).href } });
  } catch { return unavailableResponse(); }
}
