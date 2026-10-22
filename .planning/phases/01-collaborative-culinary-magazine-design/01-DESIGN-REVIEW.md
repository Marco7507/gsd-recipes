# Design review ledger

## Foundations — F01

- Stage: foundations; proposal only
- Launch: `npm run dev -- --host 0.0.0.0 --port 5187 --strictPort`
- Review URL: http://localhost:5187/
- Build: `npm run build`
- Revision: F01
- Viewports awaiting owner review: 320, 390, 768, 1440 CSS px
- Owner feedback verbatim:
- Changes requested:
- Changes incorporated:
- Unresolved items: foundations review pending; subsequent stages blocked
- Name choice:
- Typography choice:
- Token/shape direction:
- Explicit owner decision:

Reopening or rebuilding this revision never records approval. UI interactions are temporary previews only.

## Asset provenance — verified 2026-10-22

| Asset | Source / origin | License | Local usage | Availability | Fallback |
|---|---|---|---|---|---|
| Fredoka variable TTF, rendered at 700 | https://github.com/google/fonts/tree/main/ofl/fredoka ; raw file `Fredoka[wdth,wght].ttf` | SIL Open Font License 1.1; full license at `public/design-review/Fredoka-OFL.txt` | `public/design-review/fredoka.ttf`; titles and name specimens | Downloaded; valid TTF; Chromium font check passed | ui-rounded, system-ui, sans-serif; interactive comparison |
| Body / rounded fallback | User operating system | System-provided; no font redistributed | CSS system-ui and ui-rounded | Chromium renders system fallback | sans-serif |
| Pasta photograph, Lisa Fotios, Pexels 1279330 | https://www.pexels.com/photo/cooked-pasta-on-white-plate-1279330/ ; https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg | https://www.pexels.com/license/ ; website use and modification permitted | `public/design-review/pasta.jpg`; cover and crop specimen | Downloaded valid 1600×1067 JPEG; both browser images loaded at naturalWidth 1600 | Reserved pink/cream geometry with “Photo indisponible” |

Source pages consulted before inclusion. Pexels photo page was unavailable to the web reader; the image CDN returned the actual image and the official Pexels license was retrieved. Source/license evidence is resolved for these assets. No third-party packages installed; existing lockfile unchanged.

## Automated and browser evidence — F01

- `npm run build`: passed for the tracer and complete foundations.
- `node_modules/.bin/oxlint src`: passed.
- Chromium headless: 320, 390, 768, 1440 CSS px; five review scenarios at each width; no horizontal overflow in all 20 cases.
- Both local images loaded; Fredoka loaded. Name toggle, fallback font toggle, first Tab to skip link, reduced-motion removal of transitions passed.
- Screenshots inspected at 390 and 1440; supporting captures and machine results in `evidence/`.
- Browser automation used an existing Chromium installation via CDP; no dependencies added. Initial automation accidentally targeted browser chrome; discarded results and reran against the page target.
- Owner visual review, complete keyboard traversal, zoom preference and final aesthetic judgment remain pending. Browser evidence never supplies owner approval.
- Ports 5173 and 5174 were occupied; exact active review URL is http://localhost:5187/.

## Review checklist awaiting owner

At 320, 390, 768, 1440 CSS px: compare names, typography/fallback, palette, shape, spacing, crop/fallback and long/error/loading specimens. Use Tab and Enter to inspect focus; test system reduced motion.

- Reviewed revision:
- Reviewed viewports:
- Verbatim feedback:
- Requested revisions:
- Unresolved owner items:
- Explicit foundation decision:

Plan 01-01 Task 3 is pending (blocking-human). Plans 01-02 through 01-05 remain blocked by this review sequence. DES-01 remains pending.

## Actual contrast pairs

| Pair | Ratio | Assessment |
|---|---|---|
| Ink / cream | 16.12:1 | Pass normal text |
| Ink / pink | 12.94:1 | Pass normal text |
| Ink / lemon | 13.26:1 | Pass normal text |
| Cream / tomato | 6.01:1 | Pass normal text |
| Burgundy / cream | 8.61:1 | Pass normal text |
| Burgundy / pink | 6.91:1 | Pass normal text |
| Ink / tomato (separated focus only) | 2.68:1 | Not used for normal text; focus has cream separation |

Inverse chrome/hover pairs share the same ratio. Focus on tomato has cream separation (cream/tomato ratio above); ink/cream outline exceeds 3:1. Input borders use ink/cream. Skeletons and decorative swatches are not essential boundaries.
