# Merchtech

Software services for promotional gifting companies under $5M revenue, worldwide. USA first.
Operated solo by R Roger Daniel Fernando with Claude. Separate brand from CompanyStore.IO / Hourglass Essentials.

## Purpose of this project

Build and maintain the skills, templates and reference material needed to deliver:

1. Internal applications: order tracking / production boards, client intake portals, vendor / SKU / product masters, quoting and proposal tools.
2. Redemption websites: code or voucher gift pick, company stores with budgets or points, event or campaign microsites, points-based rewards portals.
3. Other technical services: custom app and website development supporting a client's business.

## Folder layout

```
Merchtech/
  CLAUDE.md            this file
  skills/              one folder per skill, each with SKILL.md
  templates/           reusable code and document scaffolds
  clients/<slug>/      one folder per client: brief, proposal, code, notes
  docs/                Merchtech marketing site (GitHub Pages serves this folder)
  docs/                decisions, pricing, positioning
```

Create folders on first use. Do not scatter files outside this layout.

## Stack defaults

Pick the lightest option that meets the brief. Confirm with Roger before a build starts.

| Need | Default |
|------|---------|
| Internal tool, low traffic, spreadsheet-backed data | Google Apps Script web app + Google Sheets |
| Redemption site, microsite, static content | HTML/CSS/JS on Cloudflare Pages |
| Storefront-style company store | Shopify + Liquid |
| Multi-user app with auth, relational data, APIs | Node/React with a database on DigitalOcean |

Integrations (CRM, accounting, payments) are decided per client. Do not assume Zoho, HubSpot, Stripe or any other platform until the client states it.

## Skills to build, in order

1. proposal-sow-generator: discovery notes in, scoped proposal and SOW out.
2. redemption-site-builder: brief in, deployable redemption site out (all four redemption types above).
3. internal-app-builder: spec in, GAS or Node app out.

Each skill lives in `skills/<name>/SKILL.md`. Write skills with the skill-creator skill. Keep each skill self-contained: inputs, outputs, stack choice rules, checklist, example.

## Relationship to CompanyStore.IO assets

Merchtech is independent. Existing CompanyStore tools (OTS, CS Intake, SKU portal, RSM store, Core-5 brand) are not to be copied into client deliverables.
Exception: the Merchtech website may borrow structure and patterns from CompanyStore assets but must use its own design language, colour system and typography. Define these in `docs/design.md` before building the site.

## Working rules

- Do not invent facts, clients, prices or metrics. If unknown, say "I don't know" and ask.
- Wait for the full brief before writing. Ask for missing inputs.
- Replies to Roger: minimal, precise, no dashes, no emphasis on complete sentences, under 5 sentences unless detail is requested.
- Client-facing documents (proposals, SOWs, specs, site copy): complete and professional. Prose over bullets. Cite sources for any external claim.
- Code: real, working code only. HTML, CSS, JS by default. Liquid for Shopify. GAS for Sheets-backed tools.
- Prices: USD for US clients. State currency in every quote.
- Save durable outputs to the client folder, not only to chat.

## Open decisions

- Engagement model: fixed packages, per-project quotes, or retainer/SaaS. Undecided. Skills must support all three until chosen.
- Merchtech website design language: not yet defined.
- Pricing: not yet defined.

## Related

- US lead generation plan: promotional gifting companies under $3M revenue, city by city, per lead capture business name, email and domain.
