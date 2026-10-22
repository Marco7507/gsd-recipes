# Walking Skeleton — GSD Recipes Design Review

**Phase:** 1
**Generated:** 2026-10-22
**Scope adaptation:** Phase 1 is the locked design-approval phase. Its walking skeleton proves the complete owner-review path and deliberately does not invent the database, API, authentication, production routing, persistence, or final application delivery assigned to later phases.

## Capability Proven End-to-End

The project owner can open the compiled local React review surface, interact with deterministic culinary specimens, provide revision-bound feedback, and reach an explicit human approval gate.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Existing React 19 + TypeScript + Vite workspace | Preserves the required frontend scaffold and proves the review artifact with the production build toolchain. |
| Data layer | Typed local recipe fixtures plus transient React state | Phase 1 must render deterministic scenarios without remote API uptime, real POSTs, persistence, or a fabricated database. |
| Authentication | None | The product has no account scope and the design-review surface contains no private capability. |
| Review target | Local Vite root URL with documented `npm run dev`; `npm run build` for compiled reachability | Gives the owner a real responsive browser surface without selecting production hosting during design. |
| Directory layout | Isolated `src/design-review/` with foundations, components, screens and fixtures | Keeps the review implementation distinguishable from Phase 2's final interface while allowing approved tokens and patterns to guide it. |
| Approval evidence | Versioned `01-DESIGN-REVIEW.md` plus blocking-human checkpoints | A rendered button or automated check cannot impersonate owner approval. |

## Stack Touched in Phase 1

- [x] Existing project scaffold — build, lint and root React entry are exercised.
- [x] Review entry — one reachable root URL renders the staged owner-review shell.
- [x] Local data/state — typed fixtures are read and real interactive transient state is updated.
- [x] UI — filters, favorites, rows, scenarios and review navigation are interactive.
- [x] Local execution — exact launch URL/command and compiled build checks are documented.
- [ ] Database read/write — not applicable to the approved design-only boundary; introducing one would contradict the fixture-only research and Phase 1 decisions.
- [ ] API read/write — not applicable until the feature phases; no DummyJSON transport or simulated persistence is presented as real.

## Out of Scope (Deferred to Later Slices)

- Phase 2 owns production routing, TanStack selection, remote DummyJSON catalog data and the final catalog interface.
- Phase 3 owns recipe-detail data loading and View Transitions.
- Phase 4 owns browser-persistent favorites.
- Phase 5 owns validated DummyJSON recipe submission and response-gated receipt behavior.
- Phase 6 owns final cross-feature acceptance of the approved design system, responsiveness, French interface and accessibility.

## Subsequent Slice Plan

Each later phase adds a user-facing vertical slice while respecting the explicitly approved Phase 1 direction:

- Phase 2: browse, search, filter and paginate the live recipe catalog.
- Phase 3: open resilient recipe detail routes with progressive transitions.
- Phase 4: save and revisit local favorites.
- Phase 5: validate and submit a recipe with honest response feedback.
- Phase 6: accept the integrated responsive, French and accessible experience.
