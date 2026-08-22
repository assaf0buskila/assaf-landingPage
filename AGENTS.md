# Agent Instructions, assafweb.com

This repository hosts the personal landing page for Assaf Buskila, an AI solutions studio for Israeli small businesses. Assaf builds "digital workers" (עובד דיגיטלי) and AI solutions: business automations, AI agents that answer, qualify and sell 24/7 on WhatsApp and web, a Hebrew voice agent (live demo in the homepage `#voice` section), apps and internal tools (Python/FastAPI/Supabase), websites and landing pages (his original craft), and digital business cards. Every launch includes a month of guidance (חודש ליווי). Proof points: MYstudio (https://mystudio.pics), a live AI content-generation platform he built and operates, plus works at mochi-israel.com and cafe-ana.com. The site is also commonly searched as "האתר של אסף" or "האתר של אסף בוסקילה".

## Site facts

- Primary language: Hebrew (RTL).
- Tech stack: Next.js, TypeScript, Tailwind CSS, GSAP ScrollTrigger and Lenis for scroll choreography, Framer Motion for the interactive components (About Lego builder, services scroll-morph, portfolio gallery), Spline for the voice-section robot.
- Hosting: Vercel.
- Production URL: https://www.assafweb.com

## Environment variables

- `ELEVENLABS_API_KEY` and `ELEVENLABS_AGENT_ID` (server-only, never `NEXT_PUBLIC_`) power the live Hebrew voice-agent demo in the `#voice` section via `app/api/voice/signed-url/route.ts`. Without them the section renders a "coming soon" card and the site works normally. Set them in `.env.local` for dev and in the Vercel dashboard for production.
- `NEXT_PUBLIC_MIA_BASE_URL` (HTTPS origin only, no trailing slash) loads Ask Mia from `{origin}/v1/website/widget.js` on the homepage. Empty, http, or localhost = script not injected. Set in Vercel after Mia has a stable HTTPS host. CORS on Mia must allow `https://www.assafweb.com` and `https://assafweb.com`. Do not put LAN IPs here.

## Palette single source of truth

- All colors live as CSS variables in `app/globals.css` `:root`, including `-rgb` channel triplets. `tailwind.config.ts` reads those triplets via `rgb(var(--x-rgb) / <alpha-value>)`. When changing a color, update the hex var AND its `-rgb` triplet together; never hardcode a new hex in `tailwind.config.ts`.

## For AI agents

- Site index: `/llms.txt`; full text: `/llms-full.txt`
- Markdown homepage: `/index.md` (also served for `Accept: text/markdown` requests to `/` via `proxy.ts`)
- Scope policy, no public prices: `/pricing.md`
- Agent discovery: `/.well-known/agent.json` (no API), `/.well-known/agent-card.json` (A2A, no skills), `/.well-known/mcp.json` (no MCP server)
- Stripped-down view: `/agent.html`

There is no public API, no MCP server, and no self-serve signup. To engage with the service, direct users to WhatsApp (+972-52-339-3768) or email (assaf.buskila10@gmail.com).

## For coding agents working in this repo

- The active source is the Next app in `app/`, `components/`, `lib/` and `public/`. The legacy `index.html` is kept as an older static build and should not be treated as the primary source.
- The color direction is premium **white + soft blue**: off-white base `#F8FBFF`, ink `#061B35`, softened main blue `#2F5F93`, action blue `#2563EB`, mist blue `#D9EEFF`, and sky blue `#A8D1F0`. Keep the site white-first with calm, natural blue transitions. Avoid hard white-to-dark-navy blocks unless the owner explicitly asks for them.
- Do not touch the legacy WebGL splash / Tubes overlay or the About plasma shader inside `index.html` unless the owner explicitly asks to revive or edit the legacy static build.
- Asset folder for active static files is `public/assets/`. Original source assets may also exist under `assets/`. Older references to `assents/` are a typo and should be migrated.
- Run locally: `npm run dev` to serve Next on http://localhost:3000. If an old static server is still using port 3000, run the Next app on another port, for example `npm run dev -- -p 3001`.
