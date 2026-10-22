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

## Owner foundations decision — 2026-10-22

- Reviewed artifact: F01, commit `0c1202c`, http://localhost:5187/.
- Verbatim owner response: “Miam ! C'est bien. Je valide le design”
- Explicit foundation decision: approved.
- Selected product name: Miam !
- Typography / palette / shapes: F01 accepted as presented; no requested changes.
- Reviewed viewports: not specified by the owner; four-width automated evidence exists separately.
- Unresolved foundation items: none reported.
- Scope: closes Plan 01-01 Task 3 and permits component review. Component, composition and complete-screen approvals are future stages.

## Components — C01

- Revision: C01, based on accepted F01.
- URL: http://localhost:5187/ ; default “Composants” stage, foundations remain reachable.
- Foundation feedback applied: Miam ! is now displayed as the chosen name. Palette, Fredoka/system typography, shapes and spacing retained exactly as accepted; no visual revision requested.
- Inventory: buttons/links, text/numeric fields, native selects, filter dialog and chips, recipe card and sibling favorite control, desktop/mobile navigation, pagination, ingredient/step rows, feedback/skeletons.
- State ownership: transient React state only; no fetch, storage, route or added package.
- Task 1 checks: build and scoped lint passed; 13 Chromium behavior checks passed (dialog drafts/apply/focus, pagination reset, favorite semantics, row add/remove/restore and one-row minimum, independent card targets).
- Owner feedback verbatim:
- Reviewed states/viewports:
- Requested changes:
- Changes incorporated after component review:
- Unresolved component items:
- Explicit component decision:

### C01 component-state verification — 2026-10-22

- Task 2 complete; Task 3 awaits owner component review.
- Seven selectable states: default, hover, focus, selected, disabled, loading, error. Form/row specimens reset on mode change, explicitly labeled in review chrome.
- E9–E19 state inventory is rendered in the gallery; applicable interactions and specifically inapplicable states are explained per component. Local interactions do not fabricate transport waits.
- `node_modules/.bin/oxlint src`: passed.
- `npm run build`: passed.
- Chromium: 43 behavior assertions passed; 28 width/state combinations (320, 390, 768, 1440 × seven modes) with long text and missing image, no horizontal page overflow; dialog reflow checked at each width.
- Keyboard: initial modal focus, nine forward Tabs, reverse Tab wrap, Escape/discard and focus return passed. A forward wrap issue found during review was fixed using a boundary Tab handler on the native dialog.
- Rows: add/remove/restore focus, restored content, one-row minimum and step renumbering passed.
- Form: required and numeric integer validation, focused linked summary, pending status, synchronous concurrent-send guard, failure retaining inputs, explicit held wait and response-gated simulated success passed.
- Reduced motion disables every rendered transition and smooth scroll; visible button targets are at least 44px high, pagination targets also at least 44px wide.
- Local licensed food image and Fredoka from F01 retained. No added color pairing beyond F01 measurements: cream/ink review chrome, cream/tomato actions, ink/cream inputs, burgundy/cream errors/removal, ink/pink cards. Focus has contrasting separation.
- Source check: no fetch, XMLHttpRequest, localStorage, sessionStorage or raw HTML injection in design-review code.
- Desktop/mobile screenshots inspected; evidence and repeatable CDP script saved under `evidence/C01-*`. Screenshots capture default state following interaction checks; active sample filters/favorite are demonstration state only.

### C01 owner checklist — pending

At mobile/desktop widths, try the state selector, filter drafts/apply/cancel, favorite, pagination, row add/remove/restore, form errors, delayed failure/retry and success. Use Tab, Shift+Tab and Escape. Compare long labels, missing photos and reduced motion.

- Reviewed revision: C01
- Owner feedback verbatim:
- Reviewed viewports and states:
- Requested revisions:
- Unresolved owner concerns:
- Explicit component decision:

Foundation approval is recorded above; component approval remains blank. Catalog comparisons (01-03), complete screens (01-04) and final approval (01-05) await their planned review stages.

## Owner component decision and corrections — C02 — 2026-10-22

- Reviewed artifact: C01.
- Verbatim response: “Quand on hover un bouton marron il devient noir, je n'aime pas cet effet, rend simplement le bouton plus foncé. Pareil quand on hover dans la pagination le bouton actif, son fond passe de noir à rose mais du coup on ne voit plus le texte car il est blanc sur rose. Juste enlève le hover de l'élément actif car ça ne sert à rien. Le reste des composants est approuvé”
- Requested correction 1: replace black primary hover with a darker shade of the same tomato/brown color.
- Requested correction 2: active pagination item has no hover change, in both real pointer and simulated hover.
- Applied revision: C02; shared `--tomato-hover: #972315` and active-page exclusions. Disabled primary controls excluded from hover.
- Explicit component decision: accepted with these two concrete corrections; remaining components approved.
- Owner-reviewed widths: not specified.
- Additional review is not required for implementing the exact requested corrections; verify the corrected computed styles before proceeding.
