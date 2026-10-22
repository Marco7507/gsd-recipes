# Roadmap: GSD Recipes

## Overview

GSD Recipes begins with a complete collaborative design phase so the project owner can choose and approve the culinary magazine direction before final interface implementation. The approved direction then guides complete vertical slices for catalog discovery, recipe reading and navigation, local favorites, and recipe submission. The last phase accepts the shared visual, responsive, French-language, and accessibility qualities across the finished experience; those qualities remain implementation constraints throughout every feature phase.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions

- [ ] **Phase 1: Collaborative Culinary Magazine Design** - Explore, refine, and explicitly approve the complete responsive design direction.
- [ ] **Phase 2: Catalog Discovery** - Deliver the technical baseline inside a complete browse, search, filter, and pagination experience.
- [ ] **Phase 3: Recipe Reading and Navigation** - Let users open resilient recipe pages and move between supported pages with progressive transitions.
- [ ] **Phase 4: Local Favorites** - Let users save recipes consistently and revisit a browser-persistent collection.
- [ ] **Phase 5: Recipe Creation Receipt** - Let users validate and submit a recipe while receiving honest, recoverable response feedback.
- [ ] **Phase 6: Integrated Experience Quality** - Accept the design system, responsiveness, French interface, and accessibility across all journeys.

## Phase Details

### Phase 1: Collaborative Culinary Magazine Design

**Goal**: The project owner approves a complete culinary magazine design direction before final interface implementation begins.
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: DES-01
**Success Criteria** (what must be TRUE):
  1. The project owner can compare distinct culinary magazine visual directions grounded in the product's real content and journeys.
  2. The project owner can review mobile and desktop mockups covering catalog, recipe detail, favorites, creation, and their key loading, empty, error, pending, and success states.
  3. The project owner can provide feedback on typography, color, spacing, components, imagery, motion, focus, and interaction behavior and see that feedback incorporated.
  4. The project owner explicitly approves the resulting responsive design system and screen direction before Phase 2 final interface work starts.

**Plans**: 5 plans

Plans:
**Wave 1**
- [ ] 01-01-PLAN.md — Prove the local review tracer and obtain foundations feedback.

**Wave 2** *(blocked on Wave 1 completion)*
- [ ] 01-02-PLAN.md — Build and review the complete interactive component system.

**Wave 3** *(blocked on Wave 2 completion)*
- [ ] 01-03-PLAN.md — Compare three catalog compositions and record the owner selection.

**Wave 4** *(blocked on Wave 3 completion)*
- [ ] 01-04-PLAN.md — Extend the selected direction across all responsive screens and states.

**Wave 5** *(blocked on Wave 4 completion)*
- [ ] 01-05-PLAN.md — Incorporate feedback and obtain final explicit approval before Phase 2.

**UI hint**: yes

### Phase 2: Catalog Discovery

**Goal**: Users can reliably browse and narrow the complete DummyJSON recipe catalog through a finished discovery journey.
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: CAT-01, CAT-02, CAT-03, CAT-04, CAT-05, CAT-06, CAT-07, CAT-08
**Success Criteria** (what must be TRUE):
  1. Users can browse recipe cards populated from DummyJSON with an image, name, and useful cooking metadata.
  2. Users can search by name and combine cuisine, difficulty, and maximum total-time filters against the complete candidate collection.
  3. Users can move through pages of matching results without losing active search and filter choices.
  4. Users can distinguish catalog loading, no-result, and request-failure states and retry a failed request.

**Plans**: TBD
**UI hint**: yes

### Phase 3: Recipe Reading and Navigation

**Goal**: Users can open and read recipes through resilient direct routes with progressive page transitions.
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: READ-01, READ-02, NAV-01
**Success Criteria** (what must be TRUE):
  1. Users can open a recipe directly or from a catalog card and read its ingredients and ordered preparation instructions.
  2. Users see a useful unavailable-recipe or request-error state when a detail page cannot be loaded.
  3. Supported page navigations use View Transitions while navigation still works without browser support and when reduced motion is requested.

**Plans**: TBD
**UI hint**: yes

### Phase 4: Local Favorites

**Goal**: Users can maintain and revisit a consistent local collection of favorite recipes.
**Mode:** mvp
**Depends on**: Phase 3
**Requirements**: FAV-01, FAV-02, FAV-03
**Success Criteria** (what must be TRUE):
  1. Users can add or remove a favorite from recipe cards and detail pages and see the same state in both places.
  2. Saved favorites remain available after refresh or browser reopening when local storage is available.
  3. Users can browse a dedicated favorites page and understand the empty state when nothing is saved.

**Plans**: TBD
**UI hint**: yes

### Phase 5: Recipe Creation Receipt

**Goal**: Users can submit a valid recipe to DummyJSON and receive accurate, accessible feedback without a persistence promise.
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: CREATE-01, CREATE-02, CREATE-03, CREATE-04, CREATE-05, CREATE-06
**Success Criteria** (what must be TRUE):
  1. Users can enter the recipe's required descriptive and numeric fields and add or remove ingredient and ordered instruction rows.
  2. Users see French field errors before submission for missing values, blank rows, invalid nonnegative integer times, and invalid positive integer servings.
  3. Users can submit a valid recipe once while the request is in progress, with duplicate concurrent submissions prevented.
  4. Users see an accessible French confirmation only after a successful creation response, clearly presented as a receipt rather than durable storage.
  5. Users keep their entered values after a failed submission and can retry.

**Plans**: TBD
**UI hint**: yes

### Phase 6: Integrated Experience Quality

**Goal**: Users experience one coherent, responsive, French, and accessible application across every completed feature.
**Mode:** mvp
**Depends on**: Phase 3, Phase 4, Phase 5
**Requirements**: DES-02, DES-03, UX-01, UX-02
**Success Criteria** (what must be TRUE):
  1. Users encounter consistent approved typography, colors, spacing, components, and interaction states throughout the application.
  2. Users can browse, read, save, and create recipes on mobile and desktop without horizontal page overflow.
  3. Users see French navigation, labels, validation, and feedback throughout, while recipe content supplied by the API may remain in its original language.
  4. Users can operate navigation, filters, favorite controls, and the creation form by keyboard with visible focus, and assistive technology receives form errors and submission status.

**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phase 1 gates final interface work. Phase 2 establishes the catalog slice and shared baseline. Phases 3 and 5 may then proceed in parallel; Phase 4 follows Phase 3, and Phase 6 follows all feature phases.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Collaborative Culinary Magazine Design | 1/5 | Component gallery in progress | - |
| 2. Catalog Discovery | 0/TBD | Not started | - |
| 3. Recipe Reading and Navigation | 0/TBD | Not started | - |
| 4. Local Favorites | 0/TBD | Not started | - |
| 5. Recipe Creation Receipt | 0/TBD | Not started | - |
| 6. Integrated Experience Quality | 0/TBD | Not started | - |
