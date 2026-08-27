/** Public Mia origin for the Ask Mia widget. Empty = do not load the script. */

export function miaWidgetSrc(): string | null {
  const raw = process.env.NEXT_PUBLIC_MIA_BASE_URL?.trim() ?? "";
  if (!raw) return null;
  try {
    const url = new URL(raw);
    const host = url.hostname.toLowerCase();
    const isLocal = host === "localhost" || host === "127.0.0.1";
    if (isLocal) {
      if (process.env.NODE_ENV !== "development") return null;
      if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    } else if (url.protocol !== "https:") {
      return null;
    }
    return `${url.origin}/v1/website/widget.js`;
  } catch {
    return null;
  }
}
