# Project Research Summary

**Project:** GSD Recipes
**Domain:** React recipe discovery SPA with a culinary magazine design system
**Researched:** 2026-10-22
**Overall confidence:** MEDIUM; API behavior and installed-version compatibility still need implementation checks.

### Executive Summary

Build on the existing React, TypeScript and Vite scaffold. The product combines a polished recipe-reading experience with advanced but purposeful React work: typed navigation, remote-data caching, URL-backed discovery, resilient local favorites and a dynamic validated creation form. The first phase must explore magazine-style visual directions with the user and establish an agreed responsive design system before final interface implementation. Autonomous execution does not replace this explicit feedback gate.

Use TanStack Router for navigation and validated URL criteria, TanStack Query for remote data, React Hook Form with Zod for creation, and a small local favorites provider. Prefer fetching the bounded complete DummyJSON catalog once, deriving combined search and filters, then paginating the result. Treat a successful recipe POST as a submission receipt: DummyJSON simulates creation, so confirmation must not promise a saved recipe or link to a durable detail page.

The main risks are incomplete filtering, duplicated state ownership, misleading submission success and animation that interferes with navigation. Address them through explicit boundaries, API contract checks and behavior-focused tests. View Transitions progressively enhance otherwise functional navigation; browser support and the installed React/router integration must be verified rather than inferred from package ranges or current documentation.

## Key Findings

### Recommended Stack

Detailed evidence: [STACK.md](STACK.md).

| Technology | Recommendation and purpose |
|---|---|
| React, TypeScript, Vite | Preserve the existing scaffold; inspect the lockfile, engines, compiler setup and baseline build before changing versions. Manifest declarations are not verified installed versions. |
| TanStack Router v1 documentation family | Typed route parameters, validated search parameters and documented navigation transition integration. Resolve a compatible exact release during foundation work. |
| TanStack Query v5 documentation family | One remote-data cache, reusable query options, request lifecycle and creation mutation state. Share options between loaders and components. |
| Native fetch | Small typed HTTP adapter with HTTP-status checks, response validation and AbortSignal propagation. |
| React Hook Form v7, Zod v4, compatible resolver | Dynamic object rows, application-owned validation rules and typed payload mapping. Verify actual package compatibility before installation. |
| CSS Modules and CSS custom properties | Explicit editorial typography, semantic tokens and reusable component states. Add selected Radix primitives only when approved interactions need them. |
| Vitest, Testing Library, MSW, Playwright | Deterministic behavior tests and real-browser journey checks; resolve versions against the actual toolchain. |

No global state library, backend, SSR framework or separate route-animation library is justified by current scope. Router integration should own route View Transitions. React's current component-level ViewTransition documentation is not sufficient evidence that the installed package and routing combination work together; verify before adopting another mechanism.

### Expected Features

Detailed scope and recommendations: [FEATURES.md](FEATURES.md).

**Required first release:** responsive catalog; name search and agreed filters; recipe details with ingredients and instructions; persistent local favorites; validated recipe creation sent to DummyJSON; explicit French success feedback after a successful usable response; French interface and English-only implementation; collaborative magazine design, a real design system and page View Transitions.

**Recommended decisions, still to confirm:** cuisine, difficulty and maximum total preparation-plus-cooking time filters; URL-backed criteria; accessible pagination or load-more; object-row ingredient/instruction entry; persistent inline submission acknowledgment. Exact controls and form fields belong in requirements and design, not in assumed scope.

**Deferred:** editing/deletion, accounts, durable submitted recipes, translation of API content, image uploads, nutrition guarantees and speculative reading utilities. The design system and motion are explicit requirements, not optional differentiators. A saved-recipes view is a sensible way to make favorites useful and should be captured explicitly in requirements.

### Architecture and State Ownership

Detailed boundaries: [ARCHITECTURE.md](ARCHITECTURE.md).

| State or responsibility | Owner |
|---|---|
| API recipes, request errors and remote freshness | TanStack Query plus typed API adapter |
| Committed search, filters and pagination | Validated Router URL parameters |
| Uncommitted search text and transient controls | Closest component |
| Favorite recipe IDs | Small provider and versioned localStorage adapter |
| Creation values, row identity and field errors | React Hook Form and schema |
| Submission request and returned receipt | Mutation state |
| Visual consistency and accessible states | Shared tokens and UI primitives |

Organize by feature with thin routes, recipe API/query modules, catalog/detail/creation modules, favorites and genuinely shared UI. Avoid mirroring Query data into context or localStorage. A stable complete-catalog query key represents the fetched collection; locally derived filters do not require separate remote cache entries. If a future request changes server parameters, include every such parameter in its key.

For the current modest dataset, request the documented `limit=0`, verify completeness and size, derive combined criteria across the entire collection, then paginate. Reset pagination when criteria change. Do not filter only a fetched page or assume arbitrary search/cuisine/difficulty combinations are supported by the API. The documented search endpoint is an alternative transport strategy, not an additional mandatory request for every local search.

### Critical Pitfalls and Prevention

Detailed failure modes: [PITFALLS.md](PITFALLS.md).

1. **Simulated creation mistaken for durable data:** confirm only after HTTP success and expected response validation. Keep the receipt in mutation state; never manufacture persistent detail links, favorites or catalog insertions from its ID. Preserve input on failure and prevent duplicate in-flight submits.
2. **Incorrect filter results:** derive against a complete candidate dataset before pagination; count the filtered results and test a match located beyond the first API page.
3. **Competing data owners:** share Query options across router and components, pass cancellation signals and retain URL authority over committed criteria. An aborted request should not appear as a user-facing error.
4. **Motion blocks navigation:** use one transition owner, unique captured-element names, reduced-motion treatment and ordinary navigation fallback. Focus, titles and scroll require their own behavior.
5. **Fragile forms and persistence:** use stable generated field-array keys and object rows mapped to API string arrays; validate blank and invalid numbers deliberately. Validate stored favorite IDs and catch storage failures, continuing in memory.

Design loading, empty, failed, invalid, pending and successful states alongside ideal screens. Keep favorite buttons separate from card links. Reserve image geometry, provide broken-image fallbacks and load below-fold images lazily. Render remote content as text.

## Implications for Roadmap

Seven phases fit the requested standard granularity. The sequence below is a recommendation for the roadmapper, not an approved feature expansion.

### Phase 1: Collaborative Editorial Design

**Rationale:** The user explicitly wants a full design phase and opportunities to react before implementation.
**Delivers:** alternative magazine directions, desktop/mobile catalog and detail concepts, creation and favorites concepts, feedback iterations, approved tokens, components and interaction/state contract.
**Addresses:** visual identity, responsive usability, French copy, accessibility and motion direction.
**Avoids:** isolated screen styling and a design system that omits focus, failures or form states.

### Phase 2: Technical Foundation and Design Primitives

**Rationale:** Shared contracts and reliable routing must exist before independent feature implementation.
**Delivers:** verified baseline toolchain and dependency compatibility, providers, typed API boundary and fixtures, query conventions, route skeleton, approved design primitives and a small transition integration spike.
**Addresses:** purposeful advanced React architecture and real API integration.
**Avoids:** version assumptions, duplicated fetching and competing animation mechanisms. Smoke-check documented GET/POST contracts without treating simulated additions as persistent.

### Phase 3: Catalog Discovery

**Rationale:** Establish recipe identity, reusable cards and the main user journey before dependent views.
**Delivers:** full-dataset loading, name search, agreed combined filters, URL restoration, pagination choice, responsive cards and loading/error/empty states.
**Addresses:** browsing and finding recipes.
**Avoids:** filtering after pagination, misleading counts, redundant full-catalog requests and uncontrolled URL/state duplication.

### Phase 4: Recipe Reading and Navigation Transitions

**Rationale:** Build on the catalog's cards, recipe contracts and foundation routing spike.
**Delivers:** direct detail routes, ingredients and ordered instructions, missing-recipe handling, catalog/detail/back transitions, intentional focus/title/scroll behavior and motion fallbacks.
**Addresses:** recipe reading and the requested page transitions.
**Avoids:** broken refresh/deep links, duplicate transition names and navigation dependent on animation support.

### Phase 5: Resilient Local Favorites

**Rationale:** Recipe identity and shared cards are stable; this can run independently of creation after shared files are assigned clearly.
**Delivers:** card/detail toggles, saved collection, refresh persistence, empty/unavailable-recipe handling and graceful storage failure.
**Addresses:** local favorites across sessions.
**Avoids:** favorites restricted to the current page, malformed storage crashes and synthetic submitted IDs becoming permanent saved items.

### Phase 6: Validated Recipe Submission

**Rationale:** Reuse foundation fields, feedback patterns and API error contracts; parallelizable with favorites when ownership does not overlap.
**Delivers:** agreed form schema, ingredient/step field arrays, numeric validation, POST mutation, pending/error recovery and persistent accessible French success acknowledgment.
**Addresses:** React Hook Form practice and the user's explicit end-of-addition confirmation.
**Avoids:** premature success, duplicate submits, unstable array rows, lost input and false persistence promises.

### Phase 7: Integrated Quality and Delivery Readiness

**Rationale:** Verify interactions across completed features; accessibility remains part of earlier phases too.
**Delivers:** real-browser journeys, responsive/design consistency review, reduced-motion and unavailable-transition checks, direct-route reload verification, image/performance review and documented remaining constraints.
**Addresses:** complete usable delivery rather than isolated happy paths.
**Avoids:** public-API-dependent tests, inaccessible transient confirmation and regressions between favorites, filters and navigation.

### Research Flags

- **Deeper planning research:** Phase 2 for exact dependency compatibility, API smoke checks and transition ownership; Phase 3 for dataset completeness and final combined-filter strategy; Phase 4 for actual browser/route integration; Phase 6 for stable RHF/resolver behavior and payload/response expectations.
- **Standard implementation patterns:** Phase 5 storage/provider behavior and Phase 7 browser verification have established approaches; research only unresolved project-specific issues. Phase 1 needs visual exploration and user feedback rather than speculative technology research.
- The project has research-before-phase enabled. These flags prioritize depth; they do not override that configured workflow.

### Confidence Assessment

| Area | Confidence | Evidence and limits |
|---|---|---|
| Stack | MEDIUM | Official documentation reviewed; installed packages, peer dependencies and baseline build unverified. |
| Features | HIGH for user scope; LOW for classified external API evidence | PROJECT.md directly records decisions. FEATURES.md's provider resolver classified fetched official API evidence LOW; no live contract tests were performed. |
| Architecture | MEDIUM | Official library patterns support recommendations; concrete integration remains untested. |
| Pitfalls | MEDIUM | Official contracts and platform guidance support risks; project-specific prevention strategies are engineering judgments. |

Researchers used official web documentation because Context7 tools and CLI were unavailable. Their provider-classifier tiers differ; retain those recorded tiers rather than claiming uniform high confidence. Overall MEDIUM reflects a coherent plan with important bounded implementation checks remaining.

### Gaps to Address

- Confirm exact filters, pagination interaction, required creation fields and image treatment during requirements/design.
- Inspect installed versions and baseline tooling; documentation families and manifest ranges do not establish compatible resolved releases.
- Verify actual dataset size/completeness, representative response shapes and simulated POST behavior. The mock server's permissiveness is not a validation specification.
- Agree target browsers and test route transitions there, including disabled support and reduced motion. Do not assume React and router transition APIs should be combined.
- Confirm the eventual hosting environment provides SPA rewrites for direct detail URLs; no deployment platform is selected yet.

## Sources

Primary official sources aggregated from the four research artifacts; accessed by researchers on 2026-10-22. No additional live experiments were performed during synthesis.

- [DummyJSON recipes](https://dummyjson.com/docs/recipes): fields, list/search/tag endpoints, pagination and simulated creation.
- [TanStack Router external data loading](https://tanstack.com/router/latest/docs/guide/external-data-loading), [search parameters](https://tanstack.com/router/latest/docs/guide/search-params) and [navigation](https://tanstack.com/router/latest/docs/guide/navigation): state ownership and route integration.
- [TanStack Router View Transitions example](https://tanstack.com/router/latest/docs/framework/react/examples/view-transitions): navigation motion reference requiring installed-version checks.
- [TanStack Query query keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys) and [cancellation](https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation): cache identity and request signals.
- [React Hook Form field arrays](https://react-hook-form.com/docs/usefieldarray), [registration](https://react-hook-form.com/docs/useform/register), [official resolvers](https://github.com/react-hook-form/resolvers) and [Zod](https://zod.dev/): dynamic forms and validation integration.
- [React ViewTransition](https://react.dev/reference/react/ViewTransition): current component-level reference; installed integration remains unverified.
- [MDN View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API), [transition names](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/view-transition-name) and [reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion): progressive enhancement and motion preferences.
- [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) and [image element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img): persistence failure modes and image loading.
- [Radix accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility) and [WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/): interactive primitives and acceptance considerations.
- [Vitest](https://vitest.dev/guide/), [Testing Library](https://testing-library.com/docs/react-testing-library/intro/), [MSW](https://mswjs.io/docs/) and [Playwright](https://playwright.dev/docs/intro): proposed verification tooling.
- [PROJECT.md](../PROJECT.md): confirmed scope and explicit user constraints; source of requirements rather than external market evidence.

---
*Research completed: 2026-10-22. Ready for requirements and roadmap definition.*
