// Client-side helpers for the ElevenLabs voice demo: the microphone gate and
// the visitor context we hand the agent at conversation start.
//
// Both follow the ElevenLabs guidance for browser voice agents: enable the
// browser's own echo cancellation / noise suppression / AGC on the input
// track, and pass what we already know about the visitor as dynamic
// variables so the agent does not waste turns asking for it.

/**
 * Constraints for the microphone track. `@elevenlabs/client` already applies
 * the same three flags (plus voice isolation and mono) to the stream it
 * captures for the session, so this is not a workaround for the SDK: it is the
 * permission-gate stream we open ourselves, and it must not be the one weak
 * link that hands the browser an unprocessed track.
 */
export const MIC_CONSTRAINTS: MediaTrackConstraints = {
  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true,
  // Mono captures better for echo cancellation and is all the agent consumes.
  channelCount: { ideal: 1 },
};

/**
 * Asks for the microphone before anything else happens, then releases it.
 *
 * Two reasons this runs ahead of the signed-URL fetch rather than inside the
 * SDK's own start path: a visitor who denies the prompt no longer burns one of
 * their five signed URLs per 10 minutes, and a denial becomes a distinct,
 * catchable failure instead of the generic "the agent is busy" copy. The
 * React hook's `startSession` returns void, so a rejection inside it can only
 * ever reach us through `onError` with no way to tell the causes apart.
 */
export async function requestMicrophone(): Promise<void> {
  if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
    throw new Error("microphone-unsupported");
  }

  const stream = await navigator.mediaDevices.getUserMedia({ audio: MIC_CONSTRAINTS });
  // The SDK opens its own stream a moment later; holding this one would leave
  // a second "recording" indicator lit for the whole call.
  stream.getTracks().forEach((track) => track.stop());
}

const SOURCE_LABELS: Array<[RegExp, string]> = [
  [/instagram/, "אינסטגרם"],
  [/facebook|fb\.com|fbclid/, "פייסבוק"],
  [/wa\.me|whatsapp/, "וואטסאפ"],
  [/linkedin|lnkd\.in/, "לינקדאין"],
  [/tiktok/, "טיקטוק"],
  [/youtube|youtu\.be/, "יוטיוב"],
  [/google|bing|duckduckgo/, "חיפוש בגוגל"],
  [/chatgpt|openai|claude|perplexity|gemini/, "עוזר AI"],
];

function labelSource(raw: string): string {
  const value = raw.toLowerCase();
  for (const [pattern, label] of SOURCE_LABELS) {
    if (pattern.test(value)) return label;
  }
  return raw;
}

function partOfDay(hour: number): string {
  if (hour < 5) return "לילה";
  if (hour < 12) return "בוקר";
  if (hour < 17) return "צהריים";
  if (hour < 21) return "ערב";
  return "לילה";
}

/**
 * What the site already knows about the visitor, in the agent's own language.
 *
 * Deliberately non-identifying: entry point, page, device class and local
 * time, all of which the agent would otherwise have to ask for (or get wrong,
 * like greeting someone with "בוקר טוב" at midnight). No IP, no user agent
 * string, nothing that survives the call.
 *
 * Every key is always present with a real fallback value: an agent prompt that
 * references `{{visitor_source}}` fails to start if the variable is missing, so
 * "כניסה ישירה" is safer than omitting the key.
 */
export function collectVisitorContext(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);

  const referrerHost = (() => {
    try {
      const host = new URL(document.referrer).hostname;
      return host && host !== window.location.hostname ? host.replace(/^www\./, "") : "";
    } catch {
      return "";
    }
  })();

  const rawSource = params.get("utm_source") || referrerHost;
  const israelTime = new Intl.DateTimeFormat("he-IL", {
    timeZone: "Asia/Jerusalem",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
  }).format(new Date());
  const israelHour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jerusalem",
      hour: "2-digit",
      hour12: false,
    }).format(new Date())
  );

  return {
    visitor_source: rawSource ? labelSource(rawSource) : "כניסה ישירה",
    visitor_campaign: params.get("utm_campaign") || "ללא קמפיין",
    visitor_page: window.location.pathname || "/",
    visitor_device: window.matchMedia("(max-width: 899px)").matches ? "נייד" : "מחשב",
    visitor_local_time: israelTime,
    visitor_time_of_day: partOfDay(Number.isNaN(israelHour) ? 12 : israelHour),
  };
}
