# Architecture Research

**Domain:** React recipe discovery SPA backed by DummyJSON
**Researched:** 2026-10-22
**Confidence:** MEDIUM — official documentation verified; concrete integration and browser behavior require implementation checks. Confidence resolver: `classify-confidence --provider websearch --verified` returned MEDIUM.

## Standard Architecture

### System Overview

```text
Browser: responsive magazine interface
  App shell + route views + shared design primitives
       |                |                  |
  TanStack Router   React Hook Form    Favorites provider
  URL/navigation    creation draft     in-memory IDs
       |                |                  |
  TanStack Query queries / mutation     localStorage adapter
       |
  Typed recipe API adapter + native fetch
       |
  DummyJSON REST API
```

**Recommendation:** Keep the existing React/TypeScript/Vite SPA and organize by feature. Use TanStack Router to coordinate navigation and validated URL state, TanStack Query as the sole server-data cache, React Hook Form for creation, and a small favorites context with browser persistence. This gives advanced React practice through useful boundaries without introducing a backend, Redux, an event bus or a generic repository framework. Architectural choices below are recommendations, not externally established product requirements.

### Component Responsibilities

| Component | Responsibility | Typical implementation |
|---|---|---|
| App providers | Stable QueryClient, typed router context, favorites lifetime | Construct client once outside route render cycles |
| Routes | Parse params/search, coordinate preload, render page states | Thin route modules with page-specific error/not-found handling |
| Recipe API | HTTP behavior, response checks, payload mapping | Typed functions receiving AbortSignal; check response.ok before parsing success |
| Query options | Shared keys, query functions and freshness policy | Reusable catalog/detail option factories |
| Catalog | Search/filter controls and result composition | Validated URL inputs, derived selectors, cards |
| Recipe detail | Ingredients, ordered instructions and metadata | Semantic article with loading/error/not-found states |
| Favorites | Toggle and retain IDs; derive matching recipes | Context + reducer/state + versioned localStorage adapter |
| Creation | Form draft, validation, dynamic rows and POST lifecycle | React Hook Form plus TanStack mutation |
| Design system | Tokens and reusable accessible controls | CSS custom properties, small primitives, component variants |

## Recommended Project Structure

```text
src/
├── app/                  # Providers and router composition
├── routes/               # Thin route entry points
├── features/
│   ├── recipes/
│   │   ├── api/          # Recipe types, HTTP calls and query options
│   │   ├── components/   # RecipeCard, RecipeMetadata
│   │   ├── catalog/      # Catalog page, URL model and selectors
│   │   ├── detail/       # Recipe detail page
│   │   └── creation/     # Form schema, field arrays, mutation and confirmation
│   └── favorites/        # Storage adapter, provider, button and favorites page
└── shared/
    ├── ui/               # Button, Field, Notice, layout primitives
    ├── styles/           # Tokens, global styles and motion rules
    └── lib/              # Only genuinely shared utilities
```

Keep recipe-specific helpers within recipes. Routes compose feature exports rather than containing HTTP or form logic. Favor direct imports and small explicit APIs; avoid creating barrel layers and abstraction files before needed. English filenames, identifiers and comments; French visible text and accessible labels. API recipe content retains its supplied language.

## Architectural Patterns

### Pattern 1: One owner per kind of state

| State | Owner | Persistence |
|---|---|---|
| API recipes, loading, request errors | TanStack Query | Memory cache |
| Committed search, filters, page/sort when selected | Validated router search params | URL/history |
| Search input before debounce or submission | Local component state | None |
| Favorite IDs | Favorites provider | Versioned localStorage |
| Creation fields and validation | React Hook Form | None required |
| Creation request and successful response | Mutation state | Current form session |
| Menu/dialog visibility | Closest component | None |

Router search params support validation and typed navigation [S2]. Use them for shareable catalog state; do not mirror committed filters into a global context. Reset pagination when search/filter conditions change. Choose history replacement for rapid input changes and deliberate navigation entries for committed actions. Debouncing limits requests; deferred rendering alone does not.

### Pattern 2: Router coordinates; Query caches

Use shared query-option factories from route preload/load and page hooks. Router external-data integration is intended to coordinate a cache owned by a separate library [S1]. Avoid separate route and component fetch implementations. Include every request-changing variable in the query key [S3]. Example key families:

```typescript
const recipeKeys = {
  all: ['recipes'] as const,
  catalog: (params: CatalogRequest) => ['recipes', 'catalog', params] as const,
  detail: (id: number) => ['recipes', 'detail', id] as const,
}
```

The loader API must be selected against the actual installed Query version: current documentation includes evolving prefetch APIs, so do not copy an older `ensureQueryData` tutorial without checking compatibility. Define freshness deliberately to avoid immediate redundant refetch after preloading. Cancellation-sensitive search should use ordinary query hooks and pass Query's signal into fetch; Query documents limitations with Suspense cancellation [S4]. An aborted request must not become a visible French error notification.

For combined catalog filters, settle one complete-dataset strategy during phase research. Either use supported API endpoint combinations or fetch a bounded complete dataset and derive search/filter/pagination locally. Never filter only the current API page while reporting whole-catalog counts. If filtering locally, the remote query key represents the dataset fetched, not each local display filter. DummyJSON documents list/search/tag/meal endpoints; arbitrary combinations must not be assumed [S5].

### Pattern 3: Separate form model from API payload

Use object rows such as `ingredients: [{ value: '' }]` and `instructions: [{ value: '' }]`, then map validated rows to API string arrays at submission. React Hook Form field arrays do not support primitive arrays and require generated row identity for rendering; stable v7 uses `field.id`, whereas the documentation flags a different beta API [S6]. Pin a stable release and follow its matching docs.

Keep field errors inline, focus the first invalid field, and preserve entered values after failed submissions. Disable duplicate submission while pending. A successful HTTP response plus valid expected response shape triggers a persistent in-page French confirmation with an accessible status announcement. DummyJSON POST is simulated and does not save the recipe [S5]. Therefore keep its result as a submission receipt: do not invalidate the catalog expecting it to appear, insert it as permanent server data, add it to favorites, or redirect to an API detail URL for the synthetic ID. Reset only after successful submission or explicit user action.

### Pattern 4: Motion enhances ordinary navigation

Use TanStack Router's `viewTransition` navigation integration [S7] as the single transition owner. Do not independently wrap the same navigation in `document.startViewTransition`. Start with page transitions; add recipe-image shared transitions only after proving unique transition names and reliable snapshots. Use native links and route focus/title/scroll behavior regardless of animation. Respect reduced motion, provide ordinary navigation when unsupported, and avoid making transitions a condition for loading data. MDN documents the browser API and its distinct same-document/cross-document mechanisms [S8]. Exact animation duration, imagery and typography belong to the collaborative design phase.

## Data Flow

1. **Catalog:** validated URL → normalized catalog request or local selector → shared query options → fetch → Query cache → cards and result count. Keep old results visibly marked while an update is pending when appropriate.
2. **Detail:** card link/preload → numeric ID validation → detail query → semantic article. Show an intentional not-found state for invalid/missing recipes.
3. **Favorites:** button action → provider state → storage adapter → subscribed buttons/list. Save IDs, resolve current recipes through the API/cache, and handle missing recipes gracefully. Storage failures must leave toggles usable in memory; localStorage access can throw and is origin-specific [S9]. A small provider is sufficient; use an external-store subscription only if cross-tab synchronization is deliberately required.
4. **Creation:** validated object rows → payload mapper → POST mutation → response receipt → French confirmation. Network failure → preserved form and retry action.

## Design System and Accessibility Boundaries

Begin with a complete collaborative design phase: editorial direction options, responsive catalog/detail/form mockups, user feedback and an agreed token/component contract. Define semantic colors, spacing scale, typography roles, radii, image ratios, breakpoints, focus treatment and motion tokens before building the full UI. Keep recipe cards and typography feature-aware while foundational fields/buttons remain domain-neutral.

Design loading, empty, failed, favorited, invalid and submitted states with the same care as the ideal catalog. Include keyboard navigation, visible focus, meaningful headings, sufficient contrast, reduced-motion behavior, field labels and announced feedback in acceptance criteria. Product polish and accessibility belong inside each feature phase rather than being deferred wholesale to a final audit.

## Scaling Considerations

| Scale | Architecture adjustments |
|---|---|
| Personal learning app | Static SPA, bounded API data, local favorites, one QueryClient |
| Larger catalog | API-side composed filtering/pagination, image optimization, cache-key and request profiling |
| Production traffic | Reassess API availability and quotas, hosting, SEO and durable data requirements before adding infrastructure |

First optimize oversized images, duplicated requests and rendering waterfalls. Add route code splitting where useful; do not add virtualization, workers or microfrontends without measurements. Static hosting must rewrite deep links to the SPA entry point.

## Anti-Patterns

- **Fetching in useEffect for each page:** repeats cache/error/race handling. Share API functions and query options instead.
- **Putting everything in context:** couples unrelated updates. Preserve the ownership table above.
- **Caching simulated creation as real catalog content:** creates broken detail links after refresh. Show a submission receipt instead.
- **Filtering paginated subsets:** silently omits matching recipes. Derive against a complete dataset or verified server filters.
- **Using array indexes for ingredient identity:** removals can associate inputs with the wrong row. Use library-generated keys.
- **Decorative design system only:** tokens without error/focus/responsive states do not provide consistent behavior. Specify complete component states during design.

## Dependency-Aware Build Order

1. **Collaborative design:** user feedback, magazine direction, responsive screen concepts, tokens and interaction contract. Required before final interface implementation.
2. **Foundation:** existing scaffold verification, router/query providers, design primitives, API adapter and request error contract.
3. **Catalog:** dataset/filter strategy, URL state, recipe cards and complete loading/empty/error behavior.
4. **Detail and navigation:** reuse cards/data contracts, add detail route, shared-image transitions, focus/scroll and motion fallbacks.
5. **Favorites:** depends on recipe identity/card contracts; can proceed independently of creation once foundation stabilizes.
6. **Creation:** form rows, payload contract and mutation receipt; parallelizable with favorites when shared fields/buttons are available.
7. **Integration verification:** keyboard and responsive flows, unsupported/reduced-motion paths, request failures, persistence recovery and direct-route reloads.

## Sources

All checked 2026-10-22. MEDIUM confidence per resolver for verified web research. Source-backed capabilities are distinguished from project-specific design recommendations. Context7 MCP and CLI were unavailable; direct official documentation was the fallback.

- [S1: TanStack Router — external data loading](https://tanstack.com/router/latest/docs/guide/external-data-loading)
- [S2: TanStack Router — search params](https://tanstack.com/router/latest/docs/guide/search-params)
- [S3: TanStack Query — query keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
- [S4: TanStack Query — cancellation](https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation)
- [S5: DummyJSON — recipes](https://dummyjson.com/docs/recipes)
- [S6: React Hook Form — useFieldArray](https://react-hook-form.com/docs/usefieldarray)
- [S7: TanStack Router — navigation](https://tanstack.com/router/latest/docs/guide/navigation)
- [S8: MDN — View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
- [S9: MDN — localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---
*Architecture research for: GSD Recipes*
*Researched: 2026-10-22*
