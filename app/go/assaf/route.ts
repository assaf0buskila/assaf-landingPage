// Next.js Route Handler: https://nextjs.org/docs/app/api-reference/file-conventions/route
import { legacyHandoffId, missingResponse, proxyHeaders, proxyHandoff } from "@/lib/handoff-proxy";

export const dynamic = "force-dynamic";

/** Legacy UUID handoff route. Keep it for links issued before Leo v2. */
export async function GET(request: Request) {
  const id = legacyHandoffId(request);
  if (!id) return missingResponse();
  return proxyHandoff(`/go/assaf?h=${encodeURIComponent(id)}`);
}

// Next otherwise implements HEAD using GET, which would record a handoff click.
export function HEAD() {
  return new Response(null, { status: 405, headers: { ...proxyHeaders, Allow: "GET" } });
}
