/** Public Mia origin for the Ask Mia widget. Empty = do not load the script. */

export function miaWidgetSrc(): string | null {
  const raw = process.env.NEXT_PUBLIC_MIA_BASE_URL?.trim() ?? "";
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return null;
    const host = url.hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1") return null;
    return `${url.origin}/v1/website/widget.js`;
  } catch {
    return null;
  }
}
