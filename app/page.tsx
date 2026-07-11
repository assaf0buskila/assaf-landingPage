import { LandingPage } from "@/components/site/LandingPage";

export default function Page() {
  // Server-side env presence only; the key itself never reaches the client.
  const voiceEnabled = Boolean(process.env.ELEVENLABS_API_KEY && process.env.ELEVENLABS_AGENT_ID);
  return <LandingPage voiceEnabled={voiceEnabled} />;
}
