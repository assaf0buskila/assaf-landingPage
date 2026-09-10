import assert from "node:assert/strict";
import test from "node:test";
import { buildLeoWhatsAppUrl } from "../lib/leo-entry.ts";

const greeting = "היי ליאו, אשמח להכיר אותך";

test("Leo WhatsApp prefill stays clean for every attribution shape", () => {
  for (const attribution of [{}, { page: "/services/ai" }, { campaign: "summer_2026" }, { page: "/services/ai", campaign: "summer_2026" }]) {
    const text = new URL(buildLeoWhatsAppUrl(attribution)).searchParams.get("text");
    assert.equal(text, greeting);
    assert.doesNotMatch(text, /leo-attribution/u);
  }
});
