import { buildLeoWhatsAppUrl } from "@/lib/leo-entry";

const allowed = new Set(["page", "campaign"]);

export function GET(request: Request): Response {
  const url = new URL(request.url);
  if ([...url.searchParams.keys()].some((key) => !allowed.has(key))) {
    return new Response(null, { status: 404, headers: headers() });
  }
  const page = single(url.searchParams, "page");
  const campaign = single(url.searchParams, "campaign");
  if (page === null || campaign === null) return new Response(null, { status: 404, headers: headers() });
  return new Response(null, {
    status: 303,
    headers: { ...headers(), Location: buildLeoWhatsAppUrl({ page, campaign }) },
  });
}

export function HEAD(): Response {
  return new Response(null, { status: 405, headers: headers() });
}

function single(params: URLSearchParams, name: string): string | undefined | null {
  const values = params.getAll(name);
  return values.length > 1 ? null : values[0];
}

function headers(): Record<string, string> {
  return { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" };
}
