# Phase 1: Collaborative Culinary Magazine Design - Pattern Map

**Mapped:** 2026-10-22
**Files analyzed:** 22 proposed new/modified files (representative concrete filenames below)
**Analogs found:** 0 / 22 eligible tracked source analogs

## Scope and Provenance

This is the design-review prototype for DES-01. Its files are proposals derived from `01-RESEARCH.md` lines 133–149 and `01-UI-SPEC.md`; the directory-level research proposal does not lock every filename. The planner may consolidate files while retaining all review surfaces and state coverage.

`git ls-files -- src index.html package.json vite.config.ts` returned no paths. `git status --short` reports the application scaffold as untracked. The repository currently tracks planning documents and `AGENTS.md`, but no application source. Consequently **there are no eligible existing code analogs to assign**. Existing untracked scaffold paths below are inventory/integration observations, never copy-from analog assignments. Do not mistake files on disk or installed GSD tooling for established tracked application conventions. Preserve existing work and make source tracking an explicit execution responsibility if files are committed later.

## File Classification

| New/Modified File | Status | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|---|
| `design-review/index.html` | proposed new, optional entry | config | request-response | none | none |
| `src/design-review/main.tsx` | proposed new, optional entry | provider | event-driven | none | none |
| `src/design-review/DesignReviewApp.tsx` | proposed new | component | event-driven | none | none |
| `src/design-review/foundations/Foundations.tsx` | proposed new | component | transform | none | none |
| `src/design-review/components/ComponentGallery.tsx` | proposed new | component | event-driven | none | none |
| `src/design-review/components/RecipeCard.tsx` | proposed new | component | event-driven | none | none |
| `src/design-review/components/FavoriteButton.tsx` | proposed new | component | event-driven | none | none |
| `src/design-review/components/Navigation.tsx` | proposed new | component | event-driven | none | none |
| `src/design-review/components/FilterDialog.tsx` | proposed new | component | event-driven | none | none |
| `src/design-review/components/Feedback.tsx` | proposed new | component | transform | none | none |
| `src/design-review/components/RecipeRows.tsx` | proposed new | component | event-driven | none | none |
| `src/design-review/screens/Catalog.tsx` | proposed new; A/B/C and chosen states | component | transform, event-driven | none | none |
| `src/design-review/screens/RecipeDetail.tsx` | proposed new | component | transform, event-driven | none | none |
| `src/design-review/screens/Favorites.tsx` | proposed new | component | transform, event-driven | none | none |
| `src/design-review/screens/Creation.tsx` | proposed new | component | event-driven | none | none |
| `src/design-review/fixtures/recipes.ts` | proposed new | model | transform | none | none |
| `src/design-review/tokens.css` | proposed new | config | transform | none | none |
| `src/design-review/review.module.css` | proposed new; other component modules may follow | config | transform | none | none |
| `public/design-review/ASSETS.md` | proposed new; photo/font provenance | config | file-I/O | none | none |
| `vite.config.ts` | exists, untracked; change only if separate entry selected | config | batch | none | none |
| `package.json` | exists, untracked; change only if launch/build script needed | config | batch | none | none |
| `.planning/phases/01-collaborative-culinary-magazine-design/01-DESIGN-REVIEW.md` | proposed new | model | file-I/O | none | none |

Conditional alternative: if the planner chooses the existing root entry, modify the existing **untracked** `src/App.tsx`, `src/main.tsx` and `index.html` instead of creating the two optional entry files. `src/App.css` and `src/index.css` also exist untracked; do not inherit their global styling into the prototype accidentally. These alternatives are not counted as additional mandatory deliverables. Final application implementation remains gated by D-10.

## Pattern Assignments

### Entry, review shell and configuration

**Assigned analog:** none; tracked-source gate failed for the scaffold.

Existing scaffold inspection found React named imports, relative asset/style imports, single quotes and no JavaScript semicolons. Its entry renders a component within `StrictMode`. These are provisional observations, not established conventions or eligible copy-from excerpts. Existing build runs TypeScript before Vite; the Vite config includes the React plugin and compiler Babel preset. Preserve working integration and choose one exact review URL and production-build entry. A separate HTML entry must be explicitly included in the Vite build; development-server reachability alone is insufficient.

Apply research lines 135–149: isolated `src/design-review/`, explicit launch/build command, typechecked and reachable review surface. Use the UI contract's review-shell label and keep scenario selectors visually outside product screens. Do not add production routing, remote caching, persistent favorites or real POST requests for this phase.

### Foundations, tokens and styles

**Assigned analog:** none. Use `01-UI-SPEC.md` sections Design System through Shape, Imagery and Motion as the contract.

One token source feeds every specimen and all three catalog variants. Use CSS Modules for local styles and CSS custom properties for shared roles. Existing purple, automatic dark theme, centered root layout and scaffold typography are not product decisions. Present font/name/color proposals for owner review, calculate contrast for actual pairs, and retain asset/font licensing notes. Review 320, 390, 768 and 1440px, long labels, missing assets and reduced motion.

### Shared components and screen files

**Assigned analog:** none. Implement semantic HTML/native controls from the UI contract and research examples rather than importing a fictitious installed component inventory.

| Files | Reference and pattern to implement |
|---|---|
| `ComponentGallery.tsx`, `Feedback.tsx` | UI-SPEC Planned Component Specimens and Resolved State Criteria; expose applicable interaction states, static skeletons, status/alert feedback and retry controls. |
| `RecipeCard.tsx`, `FavoriteButton.tsx` | UI-SPEC card/favorite specimens; full title, image, total time and cuisine; independent link/button targets; named toggle and `aria-pressed`. |
| `Navigation.tsx` | UI-SPEC Responsive Screens and Hierarchy; desktop header, labeled mobile bottom bar, current-page semantics, safe bottom clearance. |
| `FilterDialog.tsx` | RESEARCH Code Examples native dialog example; UI-SPEC draft/applied filter contract; explicit apply, cancel/Escape discard, modal focus return. |
| `RecipeRows.tsx`, `Creation.tsx` | UI-SPEC creation/row specimens, Copywriting Contract and Accessibility review; one row minimum, ordered labels, reversible removal, focus management, linked field errors and preserved input after simulated failure. |
| `Catalog.tsx` | RESEARCH comparison pattern and UI-SPEC catalog rows; identical fixtures/tokens in structurally distinct A/B/C, selected composition state gallery, combined search/filter demonstration and pagination reset. |
| `RecipeDetail.tsx`, `Favorites.tsx` | UI-SPEC screen/state matrix; continuous detail reading with anchors, zero/one/many favorites, photo fallback and unavailable item. |

There is no existing auth, API-error wrapper, form-validation framework, schema, store or component-test pattern to copy. Authentication is outside this product scope. Validation and asynchronous feedback are local review demonstrations, not production API boundaries.

### Fixtures and approval evidence

**Assigned analog:** none. Fixtures use typed deterministic recipe samples, including long names/rows, zero/one/many collections and image failure. Snapshot realistic content; browser rendering must not depend on API uptime. Asset records identify source/license and local usage.

The review record follows RESEARCH Sequential review gates with feedback evidence: stage, artifact revision/URL, viewport, verbatim owner feedback, changes made, unresolved items and explicit decision. Do not prepopulate acceptance. Foundation approval precedes components, component approval precedes catalog comparison, composition selection precedes the remaining screens, and complete approval releases Phase 2.

## Shared Patterns

No tracked code excerpts are emitted because none passed the source gate. Copyable implementation examples are explicitly illustrative in RESEARCH, not existing project code. Planner actions should cite those examples and the UI contract directly, rather than claiming established code patterns.

- **State ownership:** one local review shell owns screen/scenario selection; product interactions use transient React state. Keep draft filters separate from applied filters and preserve creation input across scenario failure.
- **Feedback:** French UI and validation; English code, filenames and comments. Simulated success is labeled “Simulation : aucun envoi réel” outside product content. No durable creation or prototype favorites promise.
- **Accessibility:** semantic landmarks/labels; skip link; visible focus; button types; pressed/current semantics; linked field errors; focused error summary; polite pending/success status and failure alert. Native dialog must support Escape and focus return.
- **Resilience:** reserved image geometry and fallback, wrapping content, static loading specimens, no horizontal overflow, bottom-navigation clearance, reduced-motion transitions/scrolling.
- **Verification:** use existing build and source-focused lint checks plus actual browser state/keyboard/viewport evidence. There is no current test suite analog. Do not install a production test stack solely to claim design approval; missing browser evidence must be recorded honestly.

## No Analog Found

All 22 files in File Classification have no eligible tracked source analog. The reason is repository provenance, in addition to the absence of established product components: the only application files present are untracked starter files. Use RESEARCH and UI-SPEC patterns instead. No runtime mirror or dependency source is an acceptable substitute.

## Metadata

**Analog search scope:** Git-tracked repository inventory, `src/`, root HTML/package/Vite scaffold, phase context/research/UI contract, roadmap/requirements/project constraints.
**Source/config files inspected:** 7 existing untracked scaffold files; no tracked application source available.
**Pattern extraction date:** 2026-10-22
**Source changes made:** none; only this pattern map was written.
