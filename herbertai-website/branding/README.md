# Herbert AI — Brand assets

Master logo mark. Same design used live across the site (header, favicon, OG card).

## Files

| File | Use |
|---|---|
| `herbert-mark.svg` | Master mark — flat. Use this for everything (print, social avatars, decks). |
| `herbert-mark-glow.svg` | Mark with the green dot glow baked in, for dark backgrounds. |

## Where it's wired in the app (do not edit these to "rebrand" — edit the mark, then mirror)

- Header / mobile nav: inline SVG in `src/app/components/Header.js`
- Favicon (SVG): `src/app/icon.svg`
- Favicon (PNG fallback): `src/app/icon.js`
- Apple touch icon: `src/app/apple-icon.js`
- Link-share card: `src/app/opengraph-image.js`

## Colours

| Token | Hex | Role |
|---|---|---|
| Ink | `#0A0A0A` | Rounded square, body text |
| Cream | `#F5F0E5` | The "h", page background |
| Green | `#00FF88` | Accent dot, highlights |
| Green glow | `rgba(0,255,136,0.18)` | Ambient glow on dark |

## Mark anatomy

Rounded-square (`rx=7` on a 32-unit grid), lowercase bold "h" in the system sans, single green dot top-right at `cx=24.5 cy=8.5 r=2.4`.
