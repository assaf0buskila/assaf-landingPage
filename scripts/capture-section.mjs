import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { spawn } from "node:child_process";

const [url, selector, out] = process.argv.slice(2);
const settleMs = Number(process.env.CAPTURE_WAIT_MS || "2200");

if (!url || !selector || !out) {
  console.error("Usage: node scripts/capture-section.mjs <url> <selector> <out>");
  process.exit(1);
}

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9300 + Math.floor(Math.random() * 400);
const userDataDir = path.join(process.cwd(), ".tmp", `assaf-cdp-capture-${process.pid}`);

function requestJson(path, method = "GET", body) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: "127.0.0.1",
        port,
        path,
        method,
        headers: body ? { "content-type": "application/json" } : undefined,
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(error);
          }
        });
      },
    );
    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForTabs() {
  for (let i = 0; i < 40; i += 1) {
    try {
      const tabs = await requestJson("/json");
      const tab = tabs.find((item) => item.type === "page");
      if (tab) return tab;
    } catch {}
    await wait(250);
  }
  throw new Error("Chrome did not expose a page target");
}

function send(ws, method, params = {}) {
  const id = send.nextId++;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      send.pending.delete(id);
      reject(new Error(`${method} timed out`));
    }, 8000);
    send.pending.set(id, { resolve, reject, timer });
  });
}

send.nextId = 1;
send.pending = new Map();

function rejectPending(error) {
  for (const pending of send.pending.values()) {
    clearTimeout(pending.timer);
    pending.reject(error);
  }
  send.pending.clear();
}

async function dataToText(data) {
  if (typeof data === "string") return data;
  if (data instanceof ArrayBuffer) return Buffer.from(data).toString("utf8");
  if (ArrayBuffer.isView(data)) {
    return Buffer.from(data.buffer, data.byteOffset, data.byteLength).toString("utf8");
  }
  if (data?.arrayBuffer) return Buffer.from(await data.arrayBuffer()).toString("utf8");
  return String(data);
}

await fs.mkdir(userDataDir, { recursive: true });

const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-gpu",
    "--disable-gpu-compositing",
    "--disable-gpu-sandbox",
    "--disable-software-rasterizer",
    "--disable-dev-shm-usage",
    "--disable-features=DawnGraphite,Vulkan,UseSkiaRenderer,CanvasOopRasterization",
    "--disable-breakpad",
    "--disable-crash-reporter",
    "--disable-crashpad",
    "--disable-extensions",
    "--hide-scrollbars",
    "--no-default-browser-check",
    "--no-first-run",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    "--window-size=1600,1200",
    url,
  ],
  { stdio: ["ignore", "ignore", "pipe"] },
);

let chromeError = "";
chrome.stderr?.on("data", (chunk) => {
  chromeError += String(chunk);
});

try {
  const tab = await waitForTabs().catch((error) => {
    const details = chromeError.trim();
    if (details) throw new Error(`${error.message}\n\nChrome stderr:\n${details}`);
    throw error;
  });
  const ws = new WebSocket(tab.webSocketDebuggerUrl);

  ws.addEventListener("message", async (event) => {
    const message = JSON.parse(await dataToText(event.data));
    if (message.id && send.pending.has(message.id)) {
      const pending = send.pending.get(message.id);
      send.pending.delete(message.id);
      clearTimeout(pending.timer);
      if (message.error) pending.reject(new Error(message.error.message));
      else pending.resolve(message.result);
    }
  });
  ws.addEventListener("close", () => rejectPending(new Error("Chrome websocket closed")));
  ws.addEventListener("error", () => rejectPending(new Error("Chrome websocket error")));

  await new Promise((resolve) => ws.addEventListener("open", resolve, { once: true }));
  await send(ws, "Page.enable");
  await send(ws, "Runtime.enable");
  await wait(settleMs);
  await send(ws, "Runtime.evaluate", {
    expression: `
      (() => {
        const el = document.querySelector(${JSON.stringify(selector)});
        if (!el) throw new Error('selector not found');
        el.scrollIntoView({ block: 'center', inline: 'nearest' });
        return true;
      })()
    `,
    awaitPromise: true,
  });
  await wait(900);
  const screenshot = await send(ws, "Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  await fs.writeFile(out, Buffer.from(screenshot.data, "base64"));
  ws.close();
} finally {
  chrome.kill();
}
