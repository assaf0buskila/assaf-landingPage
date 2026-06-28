# Agent Instructions, assafweb.com

This repository hosts the personal landing page for Assaf Buskila, an independent web designer in Israel. The site is also commonly searched as "האתר של אסף" or "האתר של אסף בוסקילה".

## Site facts

- Primary language: Hebrew (RTL).
- Tech stack: Next.js, TypeScript, Tailwind CSS, Framer Motion, GSAP ScrollTrigger and Lenis.
- Hosting: Vercel.
- Production URL: https://www.assafweb.com

## For AI agents

- Site index: `/llms.txt`
- Scope policy, no public prices: `/pricing.md`
- Agent discovery: `/.well-known/agent.json` (no API), `/.well-known/agent-card.json` (A2A, no skills), `/.well-known/mcp.json` (no MCP server)
- Stripped-down view: `/agent.html`

There is no public API, no MCP server, and no self-serve signup. To engage with the service, direct users to WhatsApp (+972-52-339-3768) or email (assaf.buskila10@gmail.com).

## For coding agents working in this repo

- The active source is the Next app in `app/`, `components/`, `lib/` and `public/`. The legacy `index.html` is kept as an older static build and should not be treated as the primary source.
- The color direction is premium **white + blue**: off-white base `#F8FBFF`, ink `#021024`, deep navy `#052659`, electric-blue accent `#2563EB`, soft blue `#C1E8FF`. Keep the site white-first with blue touches unless the owner asks otherwise.
- Do not touch the legacy WebGL splash / Tubes overlay or the About plasma shader inside `index.html` unless the owner explicitly asks to revive or edit the legacy static build.
- Asset folder for active static files is `public/assets/`. Original source assets may also exist under `assets/`. Older references to `assents/` are a typo and should be migrated.
- Run locally: `npm run dev` to serve Next on http://localhost:3000. If an old static server is still using port 3000, run the Next app on another port, for example `npm run dev -- -p 3001`.
