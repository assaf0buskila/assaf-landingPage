import { missingResponse, proxyHeaders, proxyHandoff } from "@/lib/handoff-proxy";

export const dynamic = "force-dynamic";
const CAPABILITY_TOKEN = /^[A-Za-z0-9_-]{22}$/;

export async function GET(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  // Reject query strings rather than forwarding or recording untrusted data.
  if (new URL(request.url).search || !CAPABILITY_TOKEN.test(token)) return missingResponse();
  return proxyHandoff(`/l/${encodeURIComponent(token)}`);
}

// Next otherwise implements HEAD via GET, which would record a handoff open.
export function HEAD() {
  return new Response(null, { status: 405, headers: { ...proxyHeaders, Allow: "GET" } });
}
