export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 3;

// Best-effort, in-process rate limit. Vercel runs several instances and
// recycles them, so this is a speed bump against casual abuse, not a
// guarantee: swap in Upstash Redis if this ever needs to be authoritative.
// The cost ceilings that actually hold are the per-agent max duration and
// the account spend cap in the ElevenLabs dashboard, because the 3-minute
// cap in VoiceConversation.tsx is client code a visitor can simply skip.
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < WINDOW_MS);

  // Bound the map so a long-lived instance can't grow it without limit.
  if (hits.size > 5_000) hits.clear();

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);
  return false;
}

// Compares Origin against the request's own host rather than a hardcoded
// domain, so localhost and Vercel preview deployments keep working without
// maintaining an allowlist. Trivial to spoof outside a browser, so it only
// filters lazy scripted abuse; the rate limit is what does the real work.
// A missing Origin is allowed through: same-origin GETs often omit it.
function isForeignOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host !== request.headers.get("host");
  } catch {
    return true;
  }
}

// Issues a short-lived signed URL for the private ElevenLabs voice agent.
// The API key never leaves the server; without env config the client keeps
// showing the "coming soon" card (it never calls this route then).
export async function GET(request: Request) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const agentId = process.env.ELEVENLABS_AGENT_ID;

  if (!apiKey || !agentId) {
    return Response.json(
      { enabled: false },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  if (isForeignOrigin(request)) {
    return Response.json(
      { error: "forbidden" },
      { status: 403, headers: { "Cache-Control": "no-store" } }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    // The client surfaces any non-ok response as "הסוכן עמוס", which reads
    // correctly for a throttle, so no extra copy is needed on the UI side.
    return Response.json(
      { error: "rate-limited" },
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": String(Math.ceil(WINDOW_MS / 1000)),
        },
      }
    );
  }

  const upstream = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${encodeURIComponent(agentId)}`,
    { headers: { "xi-api-key": apiKey }, cache: "no-store" }
  );

  if (!upstream.ok) {
    return Response.json(
      { error: "voice-provider-unavailable" },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }

  const data = (await upstream.json()) as { signed_url?: string };
  if (!data.signed_url) {
    return Response.json(
      { error: "voice-provider-unavailable" },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }

  return Response.json(
    { signedUrl: data.signed_url },
    { headers: { "Cache-Control": "no-store" } }
  );
}
