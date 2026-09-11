import Script from "next/script";
import { miaWidgetSrc } from "@/lib/mia";
import { AiHeroChat } from "@/components/site/AiHeroChat";

/**
 * The live Mia assistant, embedded as a box in the hero rather than a floating launcher.
 *
 * The widget mounts into the [data-mia-inline] container below, always open and with no
 * launcher, and sizes itself to that container. If the widget origin is not configured
 * (miaWidgetSrc returns null) we fall back to the scripted AiHeroChat demo so the hero is
 * never empty.
 */
export function MiaHeroChat() {
  const src = miaWidgetSrc();
  if (!src) return <AiHeroChat />;
  return (
    <div className="mia-hero-box" data-mia-inline aria-label="שיחה עם מיה">
      <Script src={src} strategy="afterInteractive" />
    </div>
  );
}
