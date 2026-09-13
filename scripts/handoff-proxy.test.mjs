import assert from "node:assert/strict";
import test, { afterEach } from "node:test";
import {
  isAssafWhatsAppDestination,
  legacyHandoffId,
  proxyHandoff,
  proxyHeaders,
  trustedAgentOrigin,
  trustedHandoffPhone,
  validShortHandoffRequest,
} from "../lib/handoff-proxy.ts";

const originalFetch = globalThis.fetch;
const originalOrigin = process.env.LEO_AGENT_PUBLIC_URL;
const originalPhone = process.env.LEO_HANDOFF_PHONE;

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalOrigin === undefined) delete process.env.LEO_AGENT_PUBLIC_URL;
  else process.env.LEO_AGENT_PUBLIC_URL = originalOrigin;
  if (originalPhone === undefined) delete process.env.LEO_HANDOFF_PHONE;
  else process.env.LEO_HANDOFF_PHONE = originalPhone;
});

test("configuration accepts only a clean HTTPS origin and E.164 digits", () => {
  process.env.LEO_AGENT_PUBLIC_URL = "https://leo.assafweb.com";
  process.env.LEO_HANDOFF_PHONE = "972523393768";
  assert.equal(trustedAgentOrigin()?.href, "https://leo.assafweb.com/");
  assert.equal(trustedHandoffPhone(), "972523393768");

  for (const origin of ["http://leo.assafweb.com", "https://leo.assafweb.com:8443", "https://leo.assafweb.com/path", "https://user@leo.assafweb.com"]) {
    process.env.LEO_AGENT_PUBLIC_URL = origin;
    assert.equal(trustedAgentOrigin(), undefined);
  }
  for (const phone of ["+972523393768", "0523393768", "1", "972523393768x"]) {
    process.env.LEO_HANDOFF_PHONE = phone;
    assert.equal(trustedHandoffPhone(), undefined);
  }
});

test("short links require one 22-character token and no query", () => {
  const token = "Abcd_efgh-ijklmnopqr12";
  assert.equal(token.length, 22);
  assert.equal(validShortHandoffRequest(new Request(`https://www.assafweb.com/l/${token}`), token), true);
  assert.equal(validShortHandoffRequest(new Request(`https://www.assafweb.com/l/${token}?utm_source=x`), token), false);
  assert.equal(validShortHandoffRequest(new Request(`https://www.assafweb.com/l/${token}?`), token), false);
  assert.equal(validShortHandoffRequest(new Request("https://www.assafweb.com/l/short"), "short"), false);
  assert.equal(validShortHandoffRequest(new Request("https://www.assafweb.com/l/%41bcd_efgh-ijklmnopqr12"), token), false);
});

test("legacy links accept exactly one h UUID and no tracking extras", () => {
  const id = "5ca1ab1e-d22a-4c10-8dca-f3e0201188c2";
  assert.equal(legacyHandoffId(new Request(`https://www.assafweb.com/go/assaf?h=${id}`)), id);
  for (const query of [`h=${id}&utm_source=x`, `h=${id}&h=${id}`, "h=not-a-uuid", "x=1", ""]) {
    assert.equal(legacyHandoffId(new Request(`https://www.assafweb.com/go/assaf?${query}`)), undefined);
  }
});

test("redirect destination is the configured wa.me number with one bounded text", () => {
  const phone = "972523393768";
  assert.equal(isAssafWhatsAppDestination(`https://wa.me/${phone}?text=${encodeURIComponent("היי אסף")}`, phone), true);
  for (const location of [
    `http://wa.me/${phone}?text=hello`,
    `https://wa.me/972500000000?text=hello`,
    `https://wa.me/${phone}?text=hello&text=again`,
    `https://wa.me/${phone}?text=hello&utm_source=x`,
    `https://wa.me/${phone}?text=`,
    `https://wa.me/${phone}?text=${"x".repeat(351)}`,
  ]) assert.equal(isAssafWhatsAppDestination(location, phone), false);
});

test("proxy forwards only a bounded validated redirect with private response headers", async () => {
  process.env.LEO_AGENT_PUBLIC_URL = "https://leo.assafweb.com";
  process.env.LEO_HANDOFF_PHONE = "972523393768";
  let input;
  let init;
  globalThis.fetch = async (nextInput, nextInit) => {
    input = nextInput;
    init = nextInit;
    return new Response(null, { status: 303, headers: { Location: "https://wa.me/972523393768?text=hello", "X-Upstream-Secret": "no" } });
  };
  const response = await proxyHandoff("/l/Abcd_efgh-ijklmnopqr12");
  assert.equal(input.href, "https://leo.assafweb.com/l/Abcd_efgh-ijklmnopqr12");
  assert.equal(init.method, "GET");
  assert.equal(init.redirect, "manual");
  assert.equal(init.cache, "no-store");
  assert.ok(init.signal instanceof AbortSignal);
  assert.equal(response.status, 303);
  assert.equal(response.headers.get("location"), "https://wa.me/972523393768?text=hello");
  assert.equal(response.headers.get("x-upstream-secret"), null);
  for (const [name, value] of Object.entries(proxyHeaders)) assert.equal(response.headers.get(name), value);
});

test("proxy fails closed for missing settings, upstream misses, invalid redirects, and fetch errors", async () => {
  delete process.env.LEO_AGENT_PUBLIC_URL;
  delete process.env.LEO_HANDOFF_PHONE;
  assert.equal((await proxyHandoff("/l/token")).status, 503);

  process.env.LEO_AGENT_PUBLIC_URL = "https://leo.assafweb.com";
  process.env.LEO_HANDOFF_PHONE = "972523393768";
  globalThis.fetch = async () => new Response(null, { status: 404 });
  assert.equal((await proxyHandoff("/l/Abcd_efgh-ijklmnopqr12")).status, 404);
  globalThis.fetch = async () => new Response(null, { status: 303, headers: { Location: "https://evil.example/" } });
  assert.equal((await proxyHandoff("/l/Abcd_efgh-ijklmnopqr12")).status, 503);
  globalThis.fetch = async () => { throw new Error("timeout"); };
  assert.equal((await proxyHandoff("/l/Abcd_efgh-ijklmnopqr12")).status, 503);
  let called = false;
  globalThis.fetch = async () => { called = true; return new Response(null, { status: 404 }); };
  assert.equal((await proxyHandoff("//evil.example/l/Abcd_efgh-ijklmnopqr12")).status, 503);
  assert.equal(called, false);
});
