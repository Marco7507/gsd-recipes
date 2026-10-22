---
phase: "01"
slug: "collaborative-culinary-magazine-design"
status: approved
reviewed_at: "2026-10-22"
shadcn_initialized: false
preset: none
created: "2026-10-22"
owner_visual_approval: pending
---

# Phase 1 — UI Design Contract

## Scope and Decision Authority

This contract specifies the review prototype for DES-01, not the final application. D-01–D-19 in `01-CONTEXT.md` are binding. Exact visual tokens below are concrete starting proposals for browser review, not owner-approved design decisions. Approval of this document's completeness cannot complete DES-01 or authorize Phase 2.

Use deterministic public recipe fixtures and local transient interactions. Keep scenario controls outside product screens under “Atelier de design — données de démonstration”. No real recipe POST, remote cache, production routing or persistent favorites is required in this phase. Success scenarios are explicitly simulated in the review shell.

Review sequence: foundations → interactive components → three catalog compositions → complete responsive screens. Record artifact revision/URL, viewport, owner feedback verbatim, incorporated changes, outstanding items and explicit decision for each stage. Only the owner's final explicit approval of the DS and complete screens releases Phase 2.

## Design System

| Property | Value |
|----------|-------|
| Tool | none; manual design system using CSS Modules and CSS custom properties |
| Preset | Not applicable |
| Component library | none; semantic HTML, native selects and native modal dialog |
| Icon library | none; simple consistent inline SVG icons, decorative when paired with text |
| Font | Proposed rounded display: Fredoka at 700; body: system-ui at 400 |
| Font fallback | ui-rounded, system-ui, sans-serif for headings; system-ui, sans-serif for body |
| Theme | Light cream only; no scaffold automatic dark theme |

The documented CSS approach and no-install research recommendation take precedence over the generic shadcn initialization suggestion. Do not ask the owner to choose implementation architecture. No installed product design system exists: `rg --files src` found scaffold files only on 2026-10-22. The component specimens below are planned deliverables, not claims about installed package exports.

Present Fredoka and the rounded system fallback as foundation specimens. Verify font availability and licensing before bundling; keep readable fallbacks if a font fails. Propose French name candidates “Miam !”, “À table !” and “Zeste” in identical specimens; use “Miam !” as a visibly provisional review name until selection.

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Icon/text micro gap |
| sm | 8px | Metadata and compact controls |
| md | 16px | Mobile page padding, field gaps |
| lg | 24px | Card padding, section contents |
| xl | 32px | Desktop grid gaps and page padding |
| 2xl | 48px | Section separation |
| 3xl | 64px | Major page divisions |

Use only these spacing tokens. Geometry exceptions: 44px minimum control targets, 2px borders and 3px focus outlines are dimensions rather than spacing tokens. Safe-area insets are browser environment values. Reserve a bottom-navigation height plus 16px and safe-area inset below mobile content; derive it from the actual rendered bar height.

## Typography

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Label and metadata | 16px | 400 | 1.5 |
| Body and inputs | 16px | 400 | 1.5 |
| Heading and card title | 24px | 700 | 1.2 |
| Compact display | 32px | 700 | 1.2 |
| Wide display | 48px | 700 | 1.2 |

Exactly four sizes (16, 24, 32, 48px) and two weights (400, 700). Compact display applies below the proposed 768px layout breakpoint; wide display applies above it. Body stays system-ui; headings use the display face. Use sentence case. Wrap complete recipe names, field messages and button labels; no line-clamping essential text. Constrain reading paragraphs to approximately 65 characters per line.

## Color

| Role | Proposed value | Usage |
|------|----------------|-------|
| Dominant (60%) | Cream #FFF8ED | Page and overlapping feature caption |
| Secondary (30%) | Pink #FFD6E2 and lemon #F4E66A | Decorative editorial panels and specimen backgrounds; not status indicators |
| Accent (10%) | Tomato #B52A18 | Primary CTA backgrounds, active navigation marker, selected favorite fill |
| Text | Ink #241A16 | Body, headings, icons, labels on cream/pink/lemon |
| Destructive | Burgundy #8C1740 | Ingredient/step removal labels only |
| Error | Burgundy #8C1740 | Error text and borders, always paired with text/icon explanation |
| Focus | Ink #241A16 with cream separation | Visible outline on controls across all accent panels |

60/30/10 describes approximate UI surface balance excluding photographs, not a pixel quota. Pink and lemon are decorative secondary surfaces, justified by the locked multicolor identity; tomato is the sole action accent. Accent reserved for the primary action per section, the current navigation marker and selected favorite symbol. Neutral controls, links and inputs use ink with underline/border/shape cues. Never put tomato text on pink or lemon without checking the actual pairing.

Before the foundations checkpoint, compute and record contrast for all actual text/control/focus pairs. Require 4.5:1 for normal text and 3:1 for large text and essential non-text boundaries. Palette values are proposals until these checks and owner review. Keep photo captions on opaque cream, not over uncontrolled image pixels. Error and destructive share a hue but differ through labels and context; neither adds a competing brand accent.

## Shape, Imagery and Motion

Proposed shapes: 16px radius for cards and panels, 8px for fields, pill shape for filter chips and primary actions. Use 2px ink borders on selected interactive specimens; avoid decorative borders around every content region. Food photography is the strongest visual anchor. Feature crops use 16:9 on desktop and 4:3 on mobile; card photos use 4:3, object-fit cover. Review actual food cropping. Reserve image space before load and show an intentional cream/pink fallback on failure. Retain source/license notes for selected assets; do not reuse scaffold imagery.

Motion proposal: 160ms color/opacity response on controls; no elastic movement or looping decorative animation. Simulated loading uses static skeletons and an announced loading label. Reduced motion removes transitions and smooth scrolling. Route/image transition specimens may demonstrate intent; production transition ownership remains a later-phase concern.

## Planned Component Specimens

These are prototype work to create, not an installed component inventory. Every applicable specimen exposes default, hover, focus-visible, selected, disabled, loading and error states; mark genuinely inapplicable states in the review gallery.

| Specimen | Required behavior |
|----------|-------------------|
| Buttons and text links | Clear primary/secondary hierarchy, wrapped labels, 44px targets, visible focus |
| Text and numeric fields | Persistent labels, hints, required indication, linked French errors |
| Native selects | Cuisine, difficulty and maximum total time; neutral styling |
| Filter chips | Active values with named remove controls and reset affordance |
| Modal filter panel | Labeled native dialog, visible close, initial focus, Escape, contained keyboard focus and return to trigger |
| Recipe cards | Photo, full title, total time, cuisine, independent favorite button; avoid nested interactive links |
| Favorite toggle | Named add/remove action, aria-pressed state, shape plus fill distinction |
| Shared navigation | Desktop header; mobile bottom bar with icons and visible labels |
| Pagination | Current page identified, disabled previous/next boundaries, preserves active choices |
| Feedback and skeletons | Loading, empty, error/retry and success; reserve stable layout |
| Ingredient and step rows | Add/remove, ordered step numbering, one blank row minimum |

## Responsive Screens and Hierarchy

Use fluid layouts, review samples at 320, 390, 768 and 1440px, and keyboard/zoom reflow. Proposed breakpoint: 768px; adjust only through documented review. Maximum content width: 1200px. Grid proposal: one column on mobile, two at intermediate widths, three on wide screens. The page must never horizontally overflow. Labels wrap, images shrink and navigation height may grow.

| Surface | Visual anchor and composition | Required review states |
|---------|------------------------------|------------------------|
| Review shell | Current review stage and its specimen; controls visually separate from product | Foundations, components, catalog comparisons, complete screens; missing assets and long specimen labels |
| Catalog A | Full-width feature photo with centered cream overlap, search directly reachable, regular card grid below | Loaded mobile and desktop |
| Catalog B | Offset cream overlap and asymmetric editorial opening; same feature, search and regular grid | Loaded mobile and desktop |
| Catalog C | Taller lead crop with broad lower cream overlap, alternative search/filter placement; regular grid | Loaded mobile and desktop |
| Selected catalog | Feature photo first, clear title and search second, then results | Loading, no results, failure/retry, active search/combined filters, pagination; zero/one/many results |
| Recipe detail | Food photo and recipe name, then facts and readable sections | Loaded, loading, unavailable, failure/retry, favorite off/on, missing photo, long ingredients/steps |
| Favorites | Collection heading then saved-card grid | Empty, one, many, missing photo, temporarily unavailable recipe |
| Creation | Page heading then information → ingredients → preparation | Initial, partial, valid, field errors, row add/remove, pending, failure preserving input/retry, simulated success |

Catalog variants use identical content, type, palette, metadata and component specimens; composition differences must remain structural after mobile reflow. Obtain owner selection before extending detail/favorites/creation. Cards show total time and cuisine; difficulty stays in filters.

Mobile navigation labels: “Recettes”, “Favoris”, “Créer une recette”. Give the active destination both a shape marker and current-page semantics. Search stays visible outside the filter panel. Panel edits are drafts: “Voir les recettes” applies and closes; closing or Escape discards unapplied changes. Reopening starts from applied choices. “Réinitialiser les filtres” clears draft selections; applying commits that reset. Search and filter changes return pagination to the first page.

Mobile detail remains one scrolling page: image → information → ingredients → ordered preparation. Provide “Voir les ingrédients” and “Voir la préparation” anchors. Creation remains one scrolling form, with no wizard. Desktop may place facts/ingredients beside preparation while preserving meaningful reading and keyboard order.

## Copywriting Contract

| Element | French copy |
|---------|-------------|
| Review stage action | “Valider les fondations”, “Valider les composants”, “Choisir cette composition”, “Approuver la direction complète” |
| Catalog opening CTA | “Découvrir les recettes” |
| Search label / placeholder | “Rechercher une recette” / “Pizza, soupe, poulet…” |
| Open / close filters | “Ouvrir les filtres” / “Fermer les filtres” |
| Filter apply / reset | “Voir les recettes” / “Réinitialiser les filtres” |
| Filter labels | “Cuisine”, “Difficulté”, “Temps total maximum” |
| Result count | “Aucune recette”, “1 recette”, “{count} recettes” |
| Catalog empty heading | “Aucune recette ne correspond à votre recherche” |
| Catalog empty body | “Essayez un autre nom ou retirez des filtres pour découvrir d’autres recettes.” |
| Catalog empty action | “Effacer la recherche et les filtres” |
| Catalog loading / failure | “Chargement des recettes…” / “Les recettes n’ont pas pu être chargées. Réessayez pour les afficher.” |
| Retry catalog / detail | “Recharger les recettes” / “Recharger la recette” |
| Recipe unavailable | “Cette recette est introuvable. Retrouvez d’autres idées dans le catalogue.” + “Explorer les recettes” |
| Detail failure | “Cette recette n’a pas pu être chargée. Réessayez pour lire les ingrédients et la préparation.” |
| Image fallback | “Photo indisponible” |
| Favorite accessible names | “Ajouter {recipe} aux favoris” / “Retirer {recipe} des favoris” |
| Favorites empty | “Vos prochaines envies commencent ici” / “Ajoutez des recettes aux favoris pour les retrouver ici, dans ce navigateur.” + “Explorer les recettes” |
| Favorite unavailable item | “Cette recette est momentanément indisponible.” + “Retirer cette recette des favoris” |
| Storage fallback specimen | “Vos favoris restent disponibles pour cette visite, mais ne peuvent pas être conservés dans ce navigateur.” |
| Pagination | “Page précédente”, “Page suivante”, “Aller à la page {page}” |
| Creation labels | “Nom de la recette”, “Temps de préparation (min)”, “Temps de cuisson (min)”, “Nombre de portions”, “Cuisine”, “Difficulté” |
| Field-array actions | “Ajouter un ingrédient”, “Retirer l’ingrédient {number}”, “Ajouter une étape”, “Retirer l’étape {number}” |
| Required field | “Renseignez {field}.” |
| Time validation | “Saisissez un nombre entier de minutes supérieur ou égal à 0.” |
| Servings validation | “Saisissez un nombre entier de portions supérieur ou égal à 1.” |
| Blank ingredient / step | “Renseignez cet ingrédient.” / “Décrivez cette étape.” |
| Validation summary | “Vérifiez les champs indiqués avant d’envoyer votre recette.” |
| Creation CTA / pending | “Envoyer la recette” / “Envoi de la recette…” |
| Submission failure | “La recette n’a pas pu être envoyée. Vos informations sont conservées. Réessayez.” + “Réessayer l’envoi” |
| Submission receipt | “Recette envoyée” / “L’API de démonstration a accepté votre recette. Cet ajout n’est pas conservé dans le catalogue.” |
| Receipt next action | “Revenir aux recettes” |
| Review simulation label | “Simulation : aucun envoi réel” |

Review buttons express an intended decision but clicking one alone is not evidence of owner approval; record explicit owner feedback and acceptance. Removing a favorite is immediate and reversible by toggling again. Removing a filled ingredient/step offers “Restaurer l’ingrédient” / “Restaurer l’étape” until the next row edit; restore original position/content and focus. Disable removal of the last row. Recipe deletion is outside scope; no generic confirmation modal is needed.

French applies to UI and validation. Fixture/API recipe content may remain English. In the prototype, success only follows the selected simulated successful-response scenario; never imply an actual request occurred. In the final application, success must follow a successful API response. Prevent concurrent submission; failed submissions retain entered values.

## Accessibility and Interaction Review

Use semantic headings, landmarks, buttons, links and labels. Add “Aller au contenu”. Every icon-only control has a specific accessible name; repeated decorative icons are hidden from assistive technology. Favorite controls expose pressed state; navigation exposes current page. Focus has an ink outline with cream separation on vivid backgrounds. Do not communicate selection, errors or success by color alone.

Keep errors adjacent to their fields, linked by aria-describedby and aria-invalid. On invalid submit, focus the error summary with links to fields. Announce pending/success through a polite status region and submission failures through an alert without repeating messages on each keystroke. On row addition focus the new field; after removal focus the adjacent row or add control; after restoration focus the restored field. Maintain numbered step labels after edits.

Check Tab/Shift+Tab, Enter/Space, native select keys, dialog Escape/focus return, anchor targets, reduced motion, long text, photo failure and creation controls near the bottom bar. Document actual browser evidence; a successful build does not establish visual or accessibility approval.

## UI Considerations

The owner confirmed element classification with “confirmé”, then selected “1” to specify the eight proposed state rules on 2026-10-22. The compiled `ui-consideration-probe.cjs` engine was rerun using explicit element-kind overrides and validated resolutions: 123 applicable element/category pairs, 123 resolved with explicit acceptance criteria, 0 backstop, 0 unresolved, 0 unclassified. These are specification results, not evidence that the prototype has been built or tested.

### Confirmed Element Classification

| ID | Surface/specimen | Kinds |
|----|------------------|-------|
| E1 | Review shell | nav, static-content, interactive-control |
| E2 | Catalog A | list-collection, media, interactive-control |
| E3 | Catalog B | list-collection, media, interactive-control |
| E4 | Catalog C | list-collection, media, interactive-control |
| E5 | Selected catalog | list-collection, media, interactive-control |
| E6 | Recipe detail | static-content, media, interactive-control |
| E7 | Favorites | list-collection, media, interactive-control |
| E8 | Creation | form, list-collection |
| E9 | Shared navigation | nav, static-content |
| E10 | Modal filter panel | form, interactive-control |
| E11 | Recipe cards | list-collection, media, interactive-control |
| E12 | Favorite toggle | interactive-control |
| E13 | Ingredient and step rows | form, list-collection |
| E14 | Buttons and text links | interactive-control, static-content |
| E15 | Text and numeric fields | form, static-content |
| E16 | Native selects | form, interactive-control |
| E17 | Filter chips | list-collection, interactive-control |
| E18 | Pagination | nav, interactive-control |
| E19 | Feedback and skeletons | static-content, interactive-control |
| E20 | Imagery and motion specimens | media, static-content |

### Resolved State Criteria

Each grouped row applies to every listed element in its relevant context; it does not require network activity for local-only controls. Copy is referenced from the Copywriting Contract rather than duplicated here. The complete state gallery belongs to the selected composition; A/B/C comparison views demonstrate the populated layout with shared specimens providing the other states.

| Category | Element(s) | Status | Resolution / Reason |
|----------|------------|--------|---------------------|
| empty | E2, E3, E4, E5, E6, E7, E8, E10, E11, E13, E15, E16, E17, E20 | ✅ covered | Empty collections show the matching Copywriting Contract message and recovery action; creation starts with one blank ingredient and step; absent photos use the reserved fallback. Empty filter selections mean no restriction and produce no active chips. |
| loading | E1–E20 | ✅ covered | Loading uses stable skeletons and announced status; pending submission blocks duplicate sends. Local navigation, panel controls and favorite toggles remain available without fabricated requests; loading specimens demonstrate pending feedback. |
| error | E1–E20 | ✅ covered | Failures show the matching Copywriting Contract message and retry; submitted values remain intact; failed images show the fallback without shifting layout. Shared navigation and local controls remain usable when the containing screen fails. |
| populated | E2, E3, E4, E5, E6, E7, E8, E11, E13, E17, E20 | ✅ covered | Representative fixture content renders with the declared hierarchy on mobile and desktop, including image, full title, time and cuisine where applicable. Filled forms and row lists retain readable values and ordered steps. |
| partial | E2, E3, E4, E5, E7, E8, E10, E11, E13, E15, E16, E17 | ✅ covered | Available information and entered values remain visible; missing required fields are identified with linked errors; missing optional content never removes surrounding content. Partially selected filters show only applied choices after explicit application. |
| overflow | E1, E2, E3, E4, E5, E6, E7, E8, E9, E11, E13, E14, E15, E17, E18, E19, E20 | ✅ covered | Fluid containers, wrapping labels and shrinking images prevent horizontal page overflow at 320, 390, 768 and 1440px; bottom navigation never covers content or focus. |
| long-text | E1–E20 | ✅ covered | Full recipe names, ingredients, instructions, labels and error messages wrap without essential-content truncation; long input values remain editable using native field scrolling. |
| zero-one-many | E2, E3, E4, E5, E7, E8, E11, E13, E17 | ✅ covered | Zero, one and many items render without placeholder gaps; result counts use the Copywriting Contract singular/plural labels; field arrays retain at least one editable row. |

Browser verification must exercise these states during the staged review. Approval of the criteria does not imply owner visual approval or a passing implementation test.

## Registry Safety

No component registries or third-party blocks used. Manual CSS/semantic HTML system; no shadcn installation. No registry vetting applies.

## Checker Sign-Off

Seven-dimension review performed inline on 2026-10-22 using the gsd-ui-checker criteria (no independent subagent review). Element classification and state rules confirmed by the owner; compiled coverage validation completed with all 123 applicable pairs explicitly resolved.

- [x] Dimension 1 Copywriting: PASS — specific actions, empty/error recovery and reversible removal declared.
- [x] Dimension 2 Visuals: PASS — focal points, responsive hierarchy, photographs and icon labels declared.
- [x] Dimension 3 Color: PASS — 60/30/10 roles and enumerable accent uses; secondary colors have decorative roles.
- [x] Dimension 4 Typography: PASS — four distinct sizes and two weights, with line heights.
- [x] Dimension 5 Spacing: PASS — explicit standard scale; geometry exceptions justified.
- [x] Dimension 6 Registry Safety: PASS — manual system and no component registries.
- [x] Dimension 7 Inventory Provenance: PASS — no installed-component inventory; specimens explicitly planned.

**Technical approval:** approved 2026-10-22 for Phase 1 planning. **Owner visual approval:** pending future browser reviews. No phase completion or final design acceptance is asserted.
