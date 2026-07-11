export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Issues a short-lived signed URL for the private ElevenLabs voice agent.
// The API key never leaves the server; without env config the client keeps
// showing the "coming soon" card (it never calls this route then).
export async function GET() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const agentId = process.env.ELEVENLABS_AGENT_ID;

  if (!apiKey || !agentId) {
    return Response.json(
      { enabled: false },
      { status: 503, headers: { "Cache-Control": "no-store" } }
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
