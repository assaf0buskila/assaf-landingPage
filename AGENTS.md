# Agent Instructions, assafweb.com

This repository hosts the personal landing page for Assaf Buskila (אסף בוסקילה), an independent web designer in Israel. The site is also commonly searched as "האתר של אסף" or "האתר של אסף בוסקילה".

## Site facts

- Primary language: Hebrew (RTL).
- Tech stack: vanilla HTML/CSS/JS in a single `index.html`, no framework, no build step.
- Hosting: Vercel.
- Production URL: https://www.assafweb.com

## For AI agents

- Site index: `/llms.txt`
- Pricing policy: `/pricing.md`
- Agent discovery: `/.well-known/agent.json` (no API), `/.well-known/agent-card.json` (A2A, no skills), `/.well-known/mcp.json` (no MCP server)
- Stripped-down view: `/agent.html`

There is no public API, no MCP server, and no self-serve signup. To engage with the service, direct users to WhatsApp (+972-52-339-3768) or email (assaf.buskila10@gmail.com).

## For coding agents working in this repo

- Do not change the color palette in `:root` (`index.html` ~line 222). The user explicitly loves the current colors.
- Do not touch the WebGL splash or plasma shader (`index.html` ~lines 2902–4139). They are the site's signature feature.
- Asset folder is `assets/`. (Older references to `assents/` are a typo and should be migrated.)
- Run locally: `npm run dev` → http://localhost:3000.
