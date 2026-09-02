import Script from "next/script";
import { miaWidgetSrc } from "@/lib/mia";
import "./ask-mia-glass.css";

export function AskMiaWidget() {
  const src = miaWidgetSrc();
  if (!src) return null;
  return <Script src={src} strategy="afterInteractive" />;
}
