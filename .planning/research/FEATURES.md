# Feature Research

**Domain:** React recipe discovery and simulated recipe submission
**Researched:** 2026-10-22
**Confidence:** LOW for externally sourced API findings under the required provider classifier; product scope is directly confirmed in PROJECT.md.

## Evidence and Scope

Scope comes from the user's decisions in `.planning/PROJECT.md`. Recommendations, complexity ratings and prioritization below are product judgments for this learning project, not competitor research or measured market expectations. No competitor comparison was conducted.

The research-plan seam selected Context7, but neither its tools nor `ctx7` were available. Official documentation was fetched with the web tool instead. `query classify-confidence --provider webfetch --verified` returned LOW; retain that tool-assigned tier rather than silently upgrading it. Endpoint behavior should receive a smoke check during implementation.

## Verified API Surface

Source: [DummyJSON recipes documentation](https://dummyjson.com/docs/recipes), consulted 2026-10-22. The following condensed evidence summary is the basis for recommendations:

- `GET /recipes` returns `recipes`, `total`, `skip`, `limit`; default page size is 30. `limit=0` requests all; `limit`, `skip`, `select` support pagination/projection.
- `GET /recipes/:id` retrieves details. `GET /recipes/search?q=...` searches. `sortBy` and `order=asc|desc` sort.
- `GET /recipes/tags`, `/recipes/tag/:tag` and `/recipes/meal-type/:mealType` provide tag and meal access. Generic cuisine, difficulty, duration and combined-filter endpoints are not documented.
- Fields include `id`, `name`, `image`, `ingredients`, `instructions`, `prepTimeMinutes`, `cookTimeMinutes`, `servings`, `difficulty`, `cuisine`, `caloriesPerServing`, `tags`, `mealType`, `rating`, `reviewCount`, `userId`.
- `POST /recipes/add` accepts JSON; the example provides `name` and permits other recipe data. It returns a simulated created recipe with an ID, without server persistence. Documentation does not define comprehensive required-field validation. Update/delete also simulate changes.

Do not hardcode example totals or assume search can be combined with arbitrary undocumented query parameters.

## Feature Landscape

### Table Stakes for This Project

These are launch requirements because of explicit user scope or necessary completion of those flows.

| Feature | Why Expected Here | Complexity | Notes |
|---------|-------------------|------------|-------|
| Responsive recipe catalog | Core discovery journey | MEDIUM | Image-led cards, useful metadata, deliberate loading, error and empty states. |
| Name search | Explicit scope | MEDIUM | Preserve query in URL; clearing search and browser navigation should behave predictably. |
| Useful catalog filters | Explicit scope; exact controls remain open | MEDIUM | Recommend cuisine, difficulty and maximum total time. Final selection belongs in requirements/design. |
| Recipe detail route | Ingredients and steps are core content | MEDIUM | Direct URL loading, missing recipe state, readable numbered steps, meaningful back navigation. |
| Local favorites | Explicit scope | MEDIUM | Toggle from cards/details, show saved collection and retain across sessions; storage failures must not break reading. |
| Validated creation form | Explicit learning and product scope | HIGH | React Hook Form with repeatable ingredient and instruction fields; practical schema proposed below. |
| Creation result feedback | Explicit acceptance condition | MEDIUM | Pending, successful and failed submission states; acknowledge success only after HTTP success and a valid response. |
| French interface | Explicit requirement | MEDIUM | Navigation, labels, errors, empty states and confirmation in French. API recipe content may remain original. Code, filenames and comments remain English. |
| Accessible interaction | Quality recommendation needed for polished delivery | MEDIUM | Keyboard operation, focus handling, field error association, announced submission status and readable contrast. |

### Differentiators Required by the Brief

The template's differentiator category does not make these optional: the user explicitly requested them.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Collaborative culinary magazine design | Establish the intended product identity before implementation | HIGH | Complete design phase with alternative visual directions, responsive mockups and user feedback. Autonomy does not remove this gate. |
| Genuine design system | Consistency across reading, discovery and forms | HIGH | Agree tokens, typography, spacing, layout, imagery treatment, controls and interactive states during design. |
| Page View Transitions | Purposeful advanced React/navigation practice | MEDIUM/HIGH | Include graceful normal navigation and reduced-motion handling; do not make content access depend on animation support. |

### Anti-Features and Deferred Scope

| Feature | Why Requested | Why Problematic Here | Alternative |
|---------|---------------|----------------------|-------------|
| Durable created-recipe library | Natural expectation after creating content | Contradicts accepted simulated-creation scope | Show an honest confirmation and do not promise future retrieval. |
| Accounts and cross-device favorites | Synchronization | Adds backend/auth scope absent from the brief | Local favorites. |
| Edit/delete recipe flows | Broader CRUD practice | Not explicitly accepted; would add simulated workflows without strengthening core value | Defer until requested. |
| Automatic recipe translation | Fully French reading experience | Explicitly out of scope | Translate interface labels only. |
| Nutrition/diet/allergen guarantees | Common cooking use case | Not a validated dataset capability | Display supplied information without inferring guarantees. |
| Image uploads | Attractive creation feature | Requires storage beyond current scope | Optional image URL with fallback; decide in form design. |
| Submitted ID as a permanent detail route | Convenient post-submit navigation | Creates a false persistence expectation | Keep a transient success panel and a link back to catalog. |

## Filtering and Pagination Recommendation

**Product/architecture judgment:** for this bounded demo catalog, fetch the complete recipe collection once with `limit=0`, derive name search and combined cuisine/difficulty/time filters on the client, then paginate the resulting set. This avoids presenting incomplete counts or applying a filter to only one fetched page. Compute total time as preparation plus cooking time. Derive cuisine and difficulty options from the dataset rather than maintaining guessed enums.

The documented search endpoint remains available if a later phase chooses server-backed search. In that case, define query-cache keys and filter composition deliberately, and retrieve the full candidate set before additional local filtering. Do not mix independent search/tag results and imply intersection semantics. A paged-server alternative is valid only after confirming endpoint combinations and result metadata.

Neither pagination style nor sorting is committed product scope yet. Prefer accessible page controls or a load-more control over mandatory infinite scrolling; decide with the design review. URL-backed query/filter state is recommended for refresh, sharing and browser history.

## Creation Form Recommendation

**Product judgment, not a claimed API contract:** require a trimmed recipe name, at least one nonblank ingredient, at least one nonblank instruction, nonnegative integer preparation/cooking minutes, positive integer servings, a cuisine value and a difficulty choice. Confirm the exact field set during form design. Optional image URL, meal type and tags can be added only if the design benefits. Do not ask users to invent rating, review counts or an author ID.

Provide add/remove controls for ingredients and ordered instructions; stable row identity, useful field errors, preserved values after a failed request and prevention of duplicate in-flight submission provide meaningful advanced-form practice. A schema must express the app's rules explicitly rather than relying on permissive mock-server acceptance.

Submission acceptance: a successful response yields a clearly visible French confirmation, ideally naming the submitted recipe. Example copy: “Recette envoyée avec succès.” Add concise explanatory copy that this demonstration does not save recipes permanently. Announce status accessibly. HTTP/network failure must retain inputs and offer retry; no success on submit-click alone. Never refetch a synthetic recipe ID to validate success or append it as a durable favorite. A new form/reset action after success is a design choice, not an implicit resubmission.

## Feature Dependencies

```text
Collaborative design review -> design system -> final product screens
API contract + loading/error patterns -> catalog -> search/filters
Recipe identity + detail fetch -> detail route -> card/detail navigation
Recipe identity -> persistent favorite storage -> favorites collection
Creation schema + dynamic fields -> POST mutation -> success/error feedback
Router + stable layouts -> View Transitions + focus/reduced-motion behavior
French copy conventions -> all interface states
```

Design exploration can use fixture content before production API integration. Final UI implementation follows user feedback. Favorites and creation can proceed independently after shared primitives, contracts and routing exist; both depend on consistent French feedback components.

## MVP Definition

### Launch With (v1)

- [ ] Reviewed magazine visual direction and implemented responsive design system.
- [ ] Catalog, name search, agreed filters, loading/error/empty states.
- [ ] Directly accessible detail pages with ingredients and instructions.
- [ ] Local favorites with a saved-recipes view and empty state.
- [ ] Validated creation form, real DummyJSON POST and explicit success confirmation.
- [ ] Page View Transitions with accessible fallback behavior.
- [ ] French interface and English-only implementation naming/comments.

### Add After Validation (v1.x)

- [ ] Additional filters or sorts only if catalog usability warrants them.
- [ ] Print-friendly reading or ingredient checkboxes if requested after core delivery.

### Future Consideration (v2+)

- [ ] Edit/delete flows only with explicit scope approval.
- [ ] Durable recipes/accounts only with an intentional backend/data-source change.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Design exploration and design system | HIGH | HIGH | P1 |
| Catalog and details | HIGH | MEDIUM | P1 |
| Search and agreed filters | HIGH | MEDIUM | P1 |
| Local favorites | HIGH | MEDIUM | P1 |
| Creation and response confirmation | HIGH | HIGH | P1 |
| Navigation transitions | HIGH (explicit learning goal) | MEDIUM/HIGH | P1 |
| Additional sorting/reading utilities | MEDIUM | LOW/MEDIUM | P2 |
| Accounts and persistent submissions | LOW for agreed goal | HIGH | Deferred |

P1 means required for the agreed first release, not every feature belongs in the first implementation phase.

## Sources

- `.planning/PROJECT.md` — confirmed scope, constraints and unresolved decisions.
- [Official DummyJSON Recipes documentation](https://dummyjson.com/docs/recipes) — endpoint and field evidence; accessed 2026-10-22. Provider-classified confidence: LOW (official source inspected directly; no live behavior test performed).

---
*Feature research for GSD Recipes. Product judgments are identified separately from documented API facts.*
