import { NextRequest, NextResponse } from "next/server";

// Agents ask for the homepage with `Accept: text/markdown` (llms.txt convention).
// Serve them the Markdown alternate instead of the full HTML+JS page.
export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  if (accept.includes("text/markdown")) {
    return NextResponse.rewrite(new URL("/index.md", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
