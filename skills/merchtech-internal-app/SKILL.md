---
name: merchtech-internal-app
description: Build an internal application for a promotional gifting company from a spec, covering order tracking and production boards, client intake portals for artwork and logos, vendor / SKU / product masters, quoting and proposal tools. Use whenever Roger has a spec, a proposal, or a description of a client's manual process and wants a working internal tool, back-office app, dashboard, tracker, portal or admin panel built. Trigger even if he says "they run this on a spreadsheet, make it an app" or names one of the four app types without saying "internal app".
---

# Merchtech Internal App Builder

Small promo companies run on spreadsheets and email. The app replaces one painful process, not the whole business. Build the smallest tool that removes that pain, in the lightest stack that fits.

## Inputs required

Ask for missing items in one message before building.

1. Process: the manual steps today, who does each, and where it breaks.
2. App type: order tracking / production board, client intake portal, vendor / SKU / product master, quoting tool, or other.
3. Users: names of roles, count, internal only or clients and vendors too.
4. Records: the entities and their fields. Ask for a sample spreadsheet if one exists; it is the spec.
5. Status flow: the states a record passes through and who moves it.
6. Notifications: who gets emailed on what event, if anything.
7. Existing systems: CRM, accounting, ecommerce, email provider. Integrate only what the client asked for.
8. Access: Google Workspace, Microsoft 365, or neither. This decides auth.

## Stack rules

| Condition | Stack |
|-----------|-------|
| Under about 10 internal users, Google Workspace, data fits in sheets, no external users | Google Apps Script web app + Google Sheets |
| External users (clients, vendors) need a no-login link | Apps Script web app, "Anyone" access, tokenised links per record |
| Multiple roles with different permissions, relational data, more than a few thousand records, or non-Google client | Node/React + PostgreSQL on DigitalOcean |

Default to Apps Script. Escalate to Node only when a condition above is met, and say which one to Roger before starting.

## Build sequence

Work in `clients/<client-slug>/app/`. Verify each step before the next.

1. Spec. `SPEC.md`: entities and fields, status flow as a list of transitions with the role allowed to make each, screens (one line each), notifications, out of scope. Get Roger's go-ahead on `SPEC.md` before writing code. Verify: every field in the client's sample sheet is either in the spec or listed as dropped.
2. Data. Apps Script: one tab per entity, header row matches `SPEC.md`, an `id` column with generated ids, `created_at` and `updated_at`. Node: migrations. Verify: a script or test inserts one record per entity and reads it back.
3. Backend. Apps Script: `Code.gs` with one function per operation the screens need, returning JSON, all writes through a single `write_(tab, row)` helper using `LockService`. Node: Express routes mirroring the same operations. Verify: each operation called once with valid and invalid input.
4. Screens. One HTML file per screen for Apps Script (`index.html` plus `includes`), plain JS, no framework. Table view with filters for the main entity, detail view with status actions, form for creation. Verify: complete one record through every status in the browser.
5. Notifications. `MailApp` or the client's transactional provider. One template per event in `SPEC.md`. Verify: send each to Roger's address.
6. Auth. Apps Script: restrict to domain, read `Session.getActiveUser()` for the actor. Node: email plus magic link, roles in the user table. Verify: a user outside the allowed set is refused.
7. Deploy and handover. Deployed URL in `README.md`. `HANDOVER.md`: URL, who has admin, how to add a user, how to add a status or field, backup method (sheet copy or database dump), and account ownership.

## Rules

- Follow the karpathy-guidelines skill: state assumptions, smallest code that works, no speculative features, verify each step.
- The client's spreadsheet is the source of truth for field names. Do not rename fields for tidiness.
- No dashboards, charts or reports unless the spec names them. A filtered table is a report.
- No integration is built without the client's credentials in hand and a stated event that triggers it.
- Apps Script files over about 600 lines total, or more than 8 sheet tabs, is the signal to stop and ask Roger whether Node is warranted.
- Reply to Roger with the folder path, deployed URL, and open `[CONFIRM]` items. Nothing else.

## Example

Brief: "Client: Peak Promo Group, Denver, 6 staff on Google Workspace. Orders tracked in a sheet with columns Order#, Client, Item, Qty, Vendor, Art Approved, In Production, Shipped, Notes. Sales updates Art Approved, production manager updates the rest, owner wants to see what is late. Email the salesperson when Shipped is set."

Result: `SPEC.md` with one entity `Order`, four statuses (New, Art Approved, In Production, Shipped), two roles, one notification; Apps Script app with an orders table filtered by status and a `late` filter (Roger to `[CONFIRM: what date defines late]`), detail view with role-gated status buttons, `MailApp` on Shipped; `HANDOVER.md`; domain-restricted deployment.
