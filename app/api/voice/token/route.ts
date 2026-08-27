export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const ELEVENLABS_TIMEOUT_MS = 8_000;

// Best-effort, in-process rate limit. Vercel runs several instances and
// recycles them, so this is a speed bump against casual abuse, not a
// guarantee. The authoritative cost controls belong in ElevenLabs.
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < WINDOW_MS);

  if (hits.size > 5_000) hits.clear();

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function isForeignOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host !== request.headers.get("host");
  } catch {
    return true;
  }
}

// Issues a short-lived token for a private ElevenLabs WebRTC conversation.
// The API key remains server-only.
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

  let upstream: Response;
  try {
    upstream = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${encodeURIComponent(agentId)}`,
      {
        headers: { "xi-api-key": apiKey },
        cache: "no-store",
        signal: AbortSignal.timeout(ELEVENLABS_TIMEOUT_MS),
      }
    );
  } catch (error) {
    console.error("[voice] ElevenLabs token request failed", error);
    return Response.json(
      { error: "voice-provider-timeout" },
      { status: 504, headers: { "Cache-Control": "no-store" } }
    );
  }

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => "<unreadable body>");
    console.error(
      `[voice] ElevenLabs conversation token failed: ${upstream.status} ${upstream.statusText} :: ${detail.slice(0, 500)}`
    );
    return Response.json(
      { error: "voice-provider-unavailable" },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }

  const data = (await upstream.json()) as { token?: string };
  if (!data.token) {
    console.error("[voice] ElevenLabs returned 200 without a token field");
    return Response.json(
      { error: "voice-provider-unavailable" },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }

  return Response.json(
    { conversationToken: data.token },
    { headers: { "Cache-Control": "no-store" } }
  );
}
