# Merchtech design language

Direction: dark, technical. Reads as a software company, not a merch supplier.

## Colour

| Token | Value | Use |
|-------|-------|-----|
| --bg | #0B0D10 | page background |
| --bg-2 | #13161B | cards, alternate sections |
| --line | #23272F | borders, rules |
| --text | #E6E8EB | body text |
| --muted | #8B929C | secondary text, labels |
| --accent | #F5A524 | one accent: links, buttons, highlights |
| --accent-ink | #0B0D10 | text on accent |

One accent only. No gradients. No colour literals outside `style.css`.

## Type

Headings and body: Inter, system fallback. Labels, code, figures: JetBrains Mono, monospace fallback.
Scale: 14 / 16 / 18 / 24 / 32 / 48. Line height 1.5 body, 1.15 headings. Max text width 68ch.

## Layout

Container 1120px, 24px gutters. Sections 96px vertical padding desktop, 64px mobile. 12px radius on cards, 1px `--line` border, no shadows.

## Voice

Short sentences. Name the problem, name the fix. No adjectives without evidence. No claims about clients or results that have not happened.

## Files

`style.css` holds all tokens and components. Each page is standalone HTML with duplicated header and footer; no build step. Contact is a single `mailto:` constant repeated in each page's header and footer.
