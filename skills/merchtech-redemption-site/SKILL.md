---
name: merchtech-redemption-site
description: Build a deployable gift redemption website for a promotional gifting client from a brief. Covers code or voucher gift pick sites, company stores with per-person budgets or points, event or campaign microsites with a form, and points-based rewards portals. Use whenever Roger asks for a redemption site, gift selection page, employee gift portal, swag store, holiday gift site, campaign landing page with capture, or any site where a recipient claims or chooses merchandise. Trigger even when he just pastes a client brief and says "build this".
---

# Merchtech Redemption Site Builder

Recipients of a promotional gift visit a link, prove eligibility, choose an item, give a shipping address. The client exports the results to fulfil orders. That is the whole product. Build exactly that, in the lightest stack that meets the brief.

## Inputs required

Ask for missing items in one message before building.

1. Site type: (a) code/voucher gift pick, (b) company store with budget or points per person, (c) campaign microsite with a form, (d) ongoing points rewards portal.
2. Eligibility: unique codes, email allowlist, open link, or SSO. Roughly how many recipients.
3. Catalogue: item names, descriptions, images, sizes/variants, and any per-item limits. Who supplies images.
4. Capture fields: name, email, address, phone, size, gift message, anything custom. Which countries ship.
5. Branding: client logo, primary colour, font if any. Otherwise neutral defaults.
6. Deadline: close date for redemptions and launch date.
7. Export: who receives orders and in what form (CSV, Google Sheet, email per order).
8. Domain: client's subdomain or a Merchtech-provided one.

## Stack rules

| Site type | Default | Reason |
|-----------|---------|--------|
| (a) code gift pick, (c) campaign microsite | Static HTML/CSS/JS on Cloudflare Pages + Google Sheet via Apps Script web app for code check and order write | No server to run, free hosting, client can see orders live in the sheet |
| (b) company store with budgets | Shopify + Liquid if the client already uses or will pay for Shopify; otherwise same static + Sheets pattern with a budget column | Shopify handles cart, variants, and checkout without custom code |
| (d) points rewards portal, ongoing | Node/React with a database on DigitalOcean | Balances change over time, needs auth and audit |

Do not jump to Node for (a) or (c). Two thousand recipients over a season is well within Apps Script limits.

## Build sequence

Work in `clients/<client-slug>/site/`. Verify each step before the next.

1. Data model. Write `README.md` with the sheet tabs and columns: `Codes` (code, used, used_at), `Catalogue` (sku, name, description, image_url, variants, limit), `Orders` (timestamp, code, sku, variant, name, email, address lines, country, notes). Verify: every capture field from the brief has a column.
2. Backend. `apps-script/Code.gs` exposing `doGet` for catalogue and code validation and `doPost` for order submission, returning JSON. Mark codes used atomically with `LockService`. Verify: curl the deployed URL with a test code, confirm the row appears and a second use is rejected.
3. Frontend. Single `index.html` with inline CSS and JS, three states: enter code, pick gift, confirm address. Mobile first. No framework. Read the API URL from one constant at the top. Verify: full flow in a browser on a phone-width viewport, error states for bad code and used code.
4. Branding. Apply client logo, colour and font as CSS variables at the top of the file. Verify: nothing else in the file references a colour literal.
5. Export. Orders tab is the export. Add a `Fulfilment` tab with a `QUERY` or filter view if the client wants only unfulfilled rows. Verify: client can open the sheet and read orders without instructions.
6. Deploy. Cloudflare Pages from the `site/` folder, custom domain if supplied. Apps Script deployed as web app, "Anyone" access, execute as owner. Verify: live URL works with a fresh code; note both URLs in `README.md`.
7. Handover. `HANDOVER.md`: live URL, sheet URL, how to add codes, how to add or remove gifts, how to close redemptions (set a flag cell the frontend reads), and who owns which account.

## Rules

- No accounts, carts or payments unless the site type requires them.
- Store nothing beyond the capture fields the client asked for. Say in `HANDOVER.md` that the client is the data owner and should delete the sheet after fulfilment if they have no retention need.
- Images: use the client's. If missing, use a labelled grey placeholder and list it as a `[CONFIRM]` item. Never fetch stock images.
- One `index.html`, one `Code.gs`. If either exceeds about 400 lines, stop and ask Roger whether the brief has grown beyond type (a) or (c).
- Reply to Roger with the folder path, the two URLs once deployed, and the open `[CONFIRM]` items. Nothing else.

## Example

Brief: "Client: Lone Star Promo, Austin. Holiday campaign for their customer Baylor Dental, 300 employees, each gets an emailed code, picks 1 of 4 gifts (tumbler, blanket, backpack, gift card), enters home address, US only, closes Dec 10. Export to CSV for their kitting vendor. Logo attached, colour #1F4E79."

Result: `clients/lone-star-promo/site/` containing `README.md`, `apps-script/Code.gs`, `index.html`, `HANDOVER.md`; a Google Sheet with 300 codes and 4 catalogue rows; live on Cloudflare Pages; `[CONFIRM: gift card denomination and delivery method]` raised because a gift card is not a shipped item.
