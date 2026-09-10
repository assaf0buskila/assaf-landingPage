// Next.js Route Handler: https://nextjs.org/docs/app/api-reference/file-conventions/route
import { missingResponse, proxyHeaders, proxyHandoff } from "@/lib/handoff-proxy";

export const dynamic = "force-dynamic";
const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ALLOWED_EXTRAS = new Set(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid", "ref"]);

/** Legacy UUID handoff route. Keep it for links issued before Leo v2. */
export async function GET(request: Request) {
  const query = new URL(request.url).searchParams;
  const id = query.get("h");
  const unknownParams = Array.from(query.keys()).filter((key) => key !== "h" && !ALLOWED_EXTRAS.has(key));
  if (query.getAll("h").length !== 1 || !id || unknownParams.length > 0 || !UUID_V4.test(id)) return missingResponse();
  return proxyHandoff(`/go/assaf?h=${encodeURIComponent(id)}`);
}

// Next otherwise implements HEAD using GET, which would record a handoff click.
export function HEAD() {
  return new Response(null, { status: 405, headers: { ...proxyHeaders, Allow: "GET" } });
}
