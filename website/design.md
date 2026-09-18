# Merchtech design language

Direction: dark, technical, motion-led. Reads as a software company, not a merch supplier.

## Colour (from the logo kit)

| Token | Value | Use |
|-------|-------|-----|
| --bg | #0B0D10 | page background |
| --bg-2 / --bg-3 | #13161B / #1A1E25 | cards, alternate sections, device bars |
| --line | #23272F | borders, rules |
| --text | #E6E8EB | body text |
| --ground | #F4F1EA | wordmark, logo highlights |
| --muted | #8B929C | secondary text, labels |
| --accent | #D97B2B | kraft orange from the kit: links, buttons, highlights |
| --accent-ink | #0B0D10 | text on accent |

One accent only. No colour literals outside `style.css` and the inline SVG art in `site.js`.

## Type

Headings and body: Space Grotesk 700 / 500. Labels, code, figures: IBM Plex Mono. Both from Google Fonts.
Wordmark: Space Grotesk 700, lowercase, letter-spacing -0.04em, "merch" in ground and "tech" in accent.

## Motion

Hero: unboxing loop from the logo kit rebuilt in CSS on dark. Headline words rise in sequence. Sections reveal on scroll. Nav mark lid lifts on hover. All motion respects prefers-reduced-motion.

## Demos

Five client-side demos in `site.js`, mounted by `data-demo`: redemption, board, quote, kit, designer. Illustrative data only. Nothing is stored or sent.

## Files

`style.css` tokens and components. `site.js` demos and reveal. Pages are standalone HTML generated from one template; header and footer are identical on every page. Contact is a single `mailto:` constant.
