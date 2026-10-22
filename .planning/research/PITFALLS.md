# Pitfalls Research

**Domain:** React culinary-magazine frontend consuming DummyJSON
**Researched:** 2026-10-22
**Confidence:** MEDIUM (resolver: `classify-confidence --provider websearch --verified`; official documentation consulted directly). Recommendations below are project-specific inferences from those sources.

## Critical Pitfalls

### 1. Treating a simulated creation as a persisted recipe

**What goes wrong:** A success screen links to a returned recipe ID that cannot subsequently be fetched, or a newly submitted item disappears after query invalidation.

**Why it happens:** A successful POST looks like a conventional backend write. DummyJSON explicitly documents that additions are simulated.

**How to avoid:** Model creation as submission plus acknowledgment. Show French success feedback only after checking the successful HTTP response and usable response body. Keep the returned data in mutation state if a summary is useful; do not add a durable detail link, favorite, or catalog entry for that simulated ID. Preserve entered values on failure and prevent duplicate submissions while pending. Do not automatically retry a user-triggered POST.

**Warning signs:** Redirecting to `/recipes/<new-id>`, invalidating the catalog to “show the addition,” or displaying success before the response.

**Phase to address:** API foundation and recipe creation. Verify success, HTTP failure, malformed response and network failure separately. Source: [DummyJSON recipes](https://dummyjson.com/docs/recipes).

### 2. Filtering only the current page

**What goes wrong:** An apparently empty filter hides matching recipes on other pages; counts describe the unfiltered server result.

**Why it happens:** Client filters are added after server pagination, or developers assume undocumented combinations of search, cuisine and difficulty are supported.

**How to avoid:** For the small learning catalog, prefer fetching the complete collection with documented `limit=0`, validating it, applying search/filter/sort across that collection, then paginating the result. Confirm actual dataset size and completeness during implementation. If choosing server pagination instead, verify every combined endpoint behavior and keep unsupported filters out of that flow. Reset page when criteria change; make URL state authoritative for shareable criteria.

**Warning signs:** `.filter()` runs on only ten fetched recipes; `total` remains unchanged for a narrowed result; restoring a URL gives different results.

**Phase to address:** Catalog architecture. Test with a fixture where the only match is beyond the first server page. This recommendation is an inference from [DummyJSON pagination and endpoints](https://dummyjson.com/docs/recipes), not a claim that arbitrary server-side combinations are supported.

### 3. Incorrect query identity and competing data stores

**What goes wrong:** Old criteria display under new controls, detail screens fetch redundant data, or global state and Query cache diverge.

**Why it happens:** Query keys omit request variables, request completion is copied into component state, and cancellation is assumed to happen automatically.

**How to avoid:** Include every request-changing parameter in the query key. A complete-catalog request can have one stable key while local derived filters live in URL state. Pass Query's supplied `signal` into `fetch`; avoid parallel manual effects fetching the same resource. Keep favorites and form drafts separate from server data.

**Warning signs:** A key of `['recipes']` fronts requests with differing server search terms; effects call `setRecipes`; rapid navigation produces stale flashes.

**Phase to address:** Data foundation and catalog. Verify rapid changes under delayed responses and Back navigation. Sources: [Query keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys), [cancellation](https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation).

### 4. Motion becomes a navigation dependency

**What goes wrong:** Unsupported View Transitions break navigation, repeated shared-element names skip animations, or motion preferences are ignored.

**Why it happens:** The animation and route change are coupled; every card uses the same transition name; visual transition completion is confused with accessibility focus management.

**How to avoid:** Navigation must succeed without animation. Use supported router integration after a compatibility spike; feature-detect direct native calls. Give captured elements unique names and clean temporary names. Respect `prefers-reduced-motion`; define focus, document title and scroll behavior separately. Avoid adding a second animation library for the same route transition.

**Warning signs:** A bare `document.startViewTransition()` call, animation rejection in the console, invisible destination focus, or full motion with reduced motion enabled.

**Phase to address:** Design motion contract, then routing spike before full screen implementation. Verify normal, unsupported and reduced-motion paths plus rapid repeated navigation. Sources: [MDN View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using), [unique transition names](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/view-transition-name), [React motion guidance](https://react.dev/reference/react/ViewTransition). The latter is guidance, not a recommendation to adopt a particular React release-channel API.

## Integration Gotchas

| Integration | Common mistake | Correct approach and verification |
|-------------|----------------|-----------------------------------|
| React Hook Form arrays | Passing API `string[]` directly to field arrays or using array indices as keys | Use form rows such as `{ value: string }`, generated stable row keys for the selected stable RHF version, and map to strings at submission. Remove a middle row and confirm remaining values and errors stay attached correctly. |
| RHF numeric fields | Assuming `type="number"` guarantees a valid numeric payload | Normalize intentionally; `valueAsNumber` can yield `NaN`. Validate finite values, integer requirements and sensible bounds. Check blank, zero, negative, decimal and excessive values. |
| Storage | Unguarded `JSON.parse` and `setItem` crash the app | Validate a versioned list of unique recipe IDs, catch access/parse/write failures and continue in memory with concise French feedback when persistence fails. Verify corrupt JSON, wrong shapes and thrown storage access. |
| Favorites | Rendering only favorites found in the current page | Resolve saved IDs against the full catalog or explicit detail queries; handle unavailable recipes without crashing. Reload on a page that initially contains none of the favorites. |

Sources: [RHF field arrays](https://react-hook-form.com/docs/usefieldarray), [RHF registration](https://react-hook-form.com/docs/useform/register), [localStorage exceptions and lifetime](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). Version-specific array APIs must be checked against the installed release; current docs also expose beta information.

## Technical Debt Patterns

| Shortcut | Immediate benefit | Long-term cost | When acceptable |
|----------|-------------------|----------------|-----------------|
| Fetch in every component | Fast first prototype | Duplicate requests and inconsistent errors | Throwaway spike only |
| Add Redux, animation and UI libraries speculatively | More advanced-looking stack | Overlapping ownership and more integration work | Only when a concrete unmet need is demonstrated |
| Style each screen independently | Faster isolated screenshots | Inconsistent spacing, focus and responsive behavior | Exploration mockups; consolidate before product UI |
| Copy all remote recipes to localStorage | Easy offline-looking demo | Stale snapshots and two sources of truth | Outside current requirements |

## Performance Traps

| Trap | Symptoms | Prevention | When it breaks |
|------|----------|------------|----------------|
| Eager loading every editorial image | Slow first useful paint on mobile | Load below-fold images lazily; keep the main visible image eager | Already relevant on a throttled mobile connection |
| No reserved image geometry | Cards and controls shift during load | Explicit dimensions or aspect ratio and a stable failure placeholder | Cold image cache |
| Repeated full-catalog downloads | Navigation waterfall and flicker | Query cache with an intentional freshness policy | Revisiting pages or changing filters |
| Premature virtualization | Complexity in focus, browser Find and transitions | Paginate a modest grid; measure before virtualizing | Becomes relevant only when measured DOM cost warrants it |

Image behavior source: [HTML image element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img). Do not invent CDN resize URLs without verifying support.

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Inject recipe strings as HTML | Untrusted external/user content becomes executable markup | Render names, ingredients and instructions as React text |
| Treat localStorage as trusted input | Corrupt or manually modified IDs destabilize favorites | Validate shape and IDs on read; store no credentials |
| Request real image uploads without backend support | Misleading form promises and oversized submissions | Scope an image field only after verifying API behavior; a file preview is not an upload |

## UX Pitfalls

| Pitfall | User impact | Better approach |
|---------|-------------|-----------------|
| Beautiful design system covers only default states | Users cannot recover from errors or operate controls by keyboard | Define focus, disabled, selected, invalid, pending, empty and error states during design |
| Favorite button nested in a card link | Conflicting interaction and invalid semantics | Separate semantic link and button; expose favorite state and an accessible French name |
| A short-lived toast is the only confirmation | Success is missed by assistive technology or distracted users | Persistent inline success region with appropriate status announcement and clear next action |
| French interface mixed with English library errors | Incoherent form experience | Provide French labels, errors and statuses while retaining English code and original API content |
| Dense editorial mobile layouts | Cropped text and inaccessible controls | Review 320px layout, long recipe names, zoom, keyboard focus and touch targets |

Accessibility basis: [WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/) (keyboard, focus visibility, reflow, error identification, status messages). These checks should inform design reviews rather than wait for final polish.

## “Looks Done But Isn't” Checklist

- [ ] Catalog: search and combined filters examine the whole intended dataset; pagination and result counts agree.
- [ ] Navigation: opening a detail URL directly, refreshing and using Back work; hosting serves the SPA entry for nested routes.
- [ ] Creation: no success on failed HTTP responses; repeat clicks do not produce concurrent submissions; no persistent detail link is fabricated.
- [ ] Form arrays: middle-row removal preserves other inputs; invalid numbers and whitespace-only rows are rejected with French errors.
- [ ] Favorites: persistence survives refresh; unavailable storage and corrupt data do not break rendering.
- [ ] Motion: normal navigation works with no native transition API and with reduced motion.
- [ ] Design system: keyboard-only journey, visible focus, mobile layout and loading/error/empty states have been reviewed.
- [ ] Images: broken images have a usable fallback and slow loading does not move controls.

## Recovery Strategies

| Pitfall | Recovery cost | Recovery steps |
|---------|---------------|----------------|
| Simulated IDs in catalog or favorites | MEDIUM | Remove synthetic persisted entries; replace redirect with submission acknowledgment |
| Page-local filters | MEDIUM | Centralize complete-data derivation or redesign server query contract; reset pagination |
| Motion blocks routing | LOW | Disable animation wrapper while preserving navigation; reintroduce behind capability checks |
| Invalid stored favorites | LOW | Discard only the invalid favorites payload, initialize empty and continue in memory |
| Inconsistent screen styling | HIGH after many screens | Consolidate tokens and primitives, then migrate one screen at a time |

## Pitfall-to-Phase Mapping

Phase names are proposed responsibilities, not finalized phase numbers.

| Pitfall | Prevention phase | Verification |
|---------|------------------|--------------|
| Incomplete visual/accessibility states | Collaborative design | Approve mobile/desktop mockups and state matrix with the user |
| Incorrect API assumptions and cache identity | Foundation | Contract fixtures, HTTP error handling, delayed-request scenario |
| Fragile transition integration | Foundation routing spike | Detail/back/refresh with support disabled and reduced motion |
| Filters after pagination | Catalog | Known off-page match and combined-criteria fixture |
| Corrupt or unavailable storage | Favorites | Reload, malformed storage and throwing storage adapter |
| Misleading simulated creation | Recipe creation | Success/failure mutation paths and acknowledgment without durable link |
| Array identity and numeric conversion | Recipe creation | Middle-row deletion and invalid-number cases |
| Image cost and cross-screen inconsistencies | Final verification, with design prevention | Throttled mobile journey, keyboard journey and broken-image scenario |

## Research Limitations

Context7 tools and CLI were unavailable; official web documentation was used as fallback. The research-plan seam was executed. This artifact is based on documented contracts, not live POST experiments or installed-package compatibility tests. Filter choices and form fields remain product decisions; avoid treating inferred recommendations as accepted requirements.

---
*Pitfalls research for GSD Recipes; researched 2026-10-22.*
