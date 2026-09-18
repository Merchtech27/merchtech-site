---
name: merchtech-proposal-sow
description: Turn discovery notes about a promotional gifting company (distributor, supplier, decorator, corporate gifting firm) into a Merchtech proposal and Statement of Work. Use whenever Roger has notes, an email thread, a call transcript or a brief from a prospect and wants a proposal, SOW, quote, scope document or pricing options for an internal app, redemption site, company store or custom website. Trigger even if he only says "write up what we discussed" or "send them something".
---

# Merchtech Proposal and SOW

Merchtech sells software to promotional gifting companies under $5M revenue, USA first, worldwide after. Roger delivers solo. The proposal must be winnable by one person and honest about scope.

## Inputs required

Do not write until these are known. Ask for whatever is missing, in one message, as a short list.

1. Client: company name, city, what they sell, approximate size (staff or revenue band).
2. Problem: the manual process, lost time, or client demand driving the request. In their words where possible.
3. Deliverable type: internal app, redemption site, company store, campaign microsite, custom website, or integration.
4. Users: who uses it, how many, internal or external.
5. Data and systems: where data lives today (spreadsheets, CRM, ERP, email), and any platform the client already pays for.
6. Timeline: launch date or event date driving it.
7. Engagement model Roger wants to quote: fixed package, per-project quote, or retainer/subscription. If Roger has not chosen, present all three as options with placeholders.
8. Prices: from Roger only. Never invent. Use `[PRICE]` placeholders if not supplied.

## Stack selection

State the recommended stack in the proposal and say why in one sentence. Follow the Merchtech CLAUDE.md table: Apps Script + Sheets for low-traffic internal tools, static HTML/JS on Cloudflare Pages for redemption sites and microsites, Shopify + Liquid for storefront-style company stores, Node/React with a database only for multi-user apps with auth and relational data. Pick the lightest option that meets the brief.

## Output

Write to `clients/<client-slug>/proposal-<YYYY-MM-DD>.md`. Client-facing, so full prose, no bullets in the body except the pricing table and the deliverables list. Currency stated in every figure, USD for US clients.

Use this structure:

```
# Proposal: <Deliverable> for <Client>
Prepared by Merchtech, <date>

## Summary
Three or four sentences: what they need, what Merchtech will build, when, and the price band.

## Your situation
What was learned in discovery. Their words, their numbers. No assumptions presented as facts.

## What we will build
Plain description of the finished product from the user's point of view. Then a numbered deliverables list.

## How it works
Stack, hosting, where data lives, who owns accounts. One paragraph.

## Scope boundaries
What is not included. Name the likely asks that fall outside (extra integrations, design revisions beyond N rounds, content entry, ongoing changes).

## Timeline
Phases with durations, dependent on client inputs. Name the inputs the client must supply and by when.

## Investment
Table. One row per option if the engagement model is undecided. Payment schedule. What recurring costs the client pays directly (hosting, domains, Shopify plan).

## After launch
Support window, bug fix terms, how change requests are handled and priced.

## Next steps
What the client does to accept. What happens in the first week after acceptance.
```

Append a `## Statement of Work` section when Roger asks for an SOW or the client has accepted: deliverables with acceptance criteria, client responsibilities, change control, assumptions, and both parties' sign-off lines.

## Rules

- Every figure, date and system name traces to discovery notes or to Roger. Mark anything unconfirmed as `[CONFIRM: ...]` and list all such markers at the end of your reply to Roger.
- Acceptance criteria must be testable: "recipient can enter code X and see gift options within 2 seconds" not "site works well".
- One person builds this. If the scope needs a team, say so to Roger before writing.
- Keep the proposal under 1,500 words. Longer proposals lose small-business readers.
- Reply to Roger with the file path, the list of `[CONFIRM]` markers, and nothing else.

## Example

Input from Roger: "Talked to a 12-person distributor in Austin. They run holiday gift redemption for 3 corporate clients by email and spreadsheet, about 2,000 recipients a season, want a site where recipients pick 1 of 5 gifts and enter address, exports to their fulfilment sheet. Launch by Nov 1. Quote fixed price, I'll fill the number."

Output: `clients/austin-distributor/proposal-2026-09-18.md` with a static Cloudflare Pages site plus Sheets backend recommended, deliverables (code upload, gift pick page, address form, CSV export, admin sheet), timeline of 3 phases ending before Nov 1, investment table with `[PRICE]`, and `[CONFIRM: company legal name]`, `[CONFIRM: gift images supplied by client?]` listed.
