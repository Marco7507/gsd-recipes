<!-- GSD:project-start source:PROJECT.md -->

## Project

**GSD Recipes**

A React frontend for discovering recipes from DummyJSON, with an ambitious responsive interface inspired by a culinary magazine. Users can browse, search and filter recipes, read ingredients and instructions, save local favorites, and submit new recipes. This is a personal project for practicing advanced React; the assistant will implement the entire application.

**Core Value:** Make discovering and reading recipes enjoyable through a polished culinary magazine experience built with purposeful advanced React patterns.

### Constraints

- **Frontend**: React, building on the existing TypeScript/Vite workspace — the project is intended to develop advanced React skills.
- **Data source**: DummyJSON recipes API — use it for the catalog and recipe submissions.
- **Language**: French interface; English-only code and comments — explicit user requirement.
- **Creation behavior**: Confirm addition only after a successful API response; no persistence requirement for submitted recipes.
- **Design process**: A dedicated design phase must provide opportunities for user feedback before the final interface is implemented.
- **Implementation ownership**: The assistant builds the entire app; exercises or user-authored implementation are not the delivery model.
- **Library selection**: Choose libraries according to use cases and compatibility, avoiding dependencies added solely to increase complexity.

<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->

## Technology Stack

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| React / React DOM | Existing manifest: `^19.3.1`; official docs identify React 19.3 | Component model, concurrent rendering, transitions | Preserve the scaffold; advanced concepts should solve loading, navigation and form UX rather than add abstractions. Exact installed patch must be checked from lockfile before implementation. |
| TypeScript | Existing manifest: `~6.0.3` | Strict domain, API and route typing | Build on existing tooling; use `strict`, typed boundaries and schema inference. This exact release was not independently registry-verified. |
| Vite | Existing manifest: `^8.3.4` | SPA development and production build | Fits a frontend-only project without a custom backend; preserve the scaffold and verify plugin/Node compatibility in foundation work. |
| TanStack Router | v1 documentation family; resolve exact stable patch during implementation | Typed routes, validated URL search state, navigation transitions | Catalog search/filter state belongs in shareable URLs; official examples demonstrate View Transitions. |
| TanStack Query | v5 documentation family; resolve exact stable patch | Remote recipe cache, loading/error states, cancellation and mutation state | Keep server state separate from local favorites and form inputs. Use shared query options from route loaders and components. |
| Native Fetch API | Browser platform | Typed API service transport | Query needs a promise-returning transport, not Axios. Check `response.ok`, pass AbortSignal and validate the response boundary. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| React Hook Form | v7 documentation family | Recipe creation and field-level form state | Use `useFieldArray` for ingredient/step rows; use object rows such as `{ text: string }`, then map to API string arrays. Its docs explicitly exclude flat field arrays. |
| Zod | v4; official site currently announces 4.6 | Form and external payload schemas with inferred types | Define distinct creation and API-response schemas; avoid coercion that converts an empty required numeric field to zero. |
| `@hookform/resolvers` | Exact compatible stable version to resolve | Connect Zod to React Hook Form | Official resolver documentation supports Zod, including v4 imports and input/output inference. |
| Radix Primitives | Exact stable version to resolve per primitive | Dialog, popover and other complex interactive behavior | Add only primitives required by approved designs. Style them with project tokens; Radix handles important focus/keyboard patterns but does not certify the whole application. |
| CSS Modules + CSS custom properties | Platform/Vite features | Editorial layouts, semantic design tokens and component styling | Recommended initial styling approach: typography, spacing, colors, radii, elevation, motion and responsive rules are explicit and reusable. A design system does not require a large component framework. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Existing Oxlint + TypeScript build | Lint and type safety | Keep the existing toolchain; assess current config before adding overlapping tools. |
| Existing React Compiler Babel plugin (`^1.0.0` declared) | Potential render optimization | Presence in package.json does not prove activation. Inspect Vite/Babel config and verify supported integration; profile before manual memoization. |
| Vitest | Unit and component integration runner | Pick a release whose Vite and Node support matches the actual scaffold. Test filters, schemas, favorites storage and mutation states. |
| React Testing Library + user-event + jsdom | Behavior-focused component tests | Include `@testing-library/dom` peer dependency; query by role/label and test visible behavior. |
| MSW | Deterministic API success, failure and latency fixtures | Intercept requests at the network boundary; avoid tests dependent on the public DummyJSON uptime. |
| Playwright + axe-core integration | Browser journeys, visual checks and automated accessibility checks | Cover responsive layouts, keyboard flow, reduced motion, creation confirmation and persistence. Real browsers are required to evaluate actual View Transition behavior. Automated accessibility checks supplement manual keyboard review. |

## Installation

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| TanStack Router | React Router | React Router also documents View Transitions; use it if its route model is preferred. View Transitions alone do not require TanStack. TanStack wins here for typed search parameters and the user's stated interest. |
| CSS Modules + tokens + selected Radix primitives | Tailwind + shadcn/ui | Adopt when the design implementation benefits from utility composition and editable component templates. Do not choose default component styling before the editorial direction is approved. |
| Vite SPA | TanStack Start / Next.js | Reconsider if server rendering, indexed editorial content, server-side secrets or backend logic become actual requirements. |
| Fetch | Axios | Consider only for a concrete transport feature that justifies another dependency. |
| Small local favorites store | Zustand / Redux Toolkit | Add when client state develops meaningful cross-feature complexity; favorites alone do not establish that need. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Two owners wrapping the same navigation in browser transitions | Router and application transition wrappers can compete over snapshots and scheduling | Begin with Router's documented View Transition integration and test shared-image behavior. |
| Ad hoc `useEffect` fetching throughout page components | Repeats caching, race handling and error/loading behavior | Query options and Query hooks with Router preloading. |
| Animation library solely for route transitions | Browser transitions already address the explicit requirement | Native View Transition API and CSS; add another library only for separate approved interactions. |
| Custom accessible dialog/select behavior from scratch | Keyboard and focus correctness are substantial work | Semantic HTML or selected Radix primitives. |
| Treating a simulated POST as durable catalog data | It creates links and cached entries that may disappear after reload | Confirm the server response explicitly without promising persistence. |

## Stack Patterns by Variant

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| React and React DOM | Matching resolved versions | Do not upgrade one independently. Manifest ranges alone do not prove installed versions. |
| TanStack Router v1 + Query v5 | Official external-data-loading integration pattern | Inject the QueryClient through router context and share query options. SPA loading does not require an SSR adapter. |
| React Hook Form v7 + Zod v4 | A resolver release with documented v4 support | Verify peers and inferred schema input/output types; numeric transforms can make those types differ. |
| Vite `^8.3.4` + plugin-react `^6.1.2` + TypeScript `~6.0.3` | Existing scaffold declarations | Exact peer/engine compatibility has not been verified; run existing build before extending the stack. |
| Vitest + Vite + Node | Select matching supported versions | Do not assume the newest Vitest supports every existing Vite/Node combination. |

## Sources

- [TanStack Router View Transitions example](https://tanstack.com/router/latest/docs/framework/react/examples/view-transitions) — native navigation integration.
- [TanStack Router navigation](https://tanstack.com/router/latest/docs/guide/navigation) — navigation transition controls.
- [TanStack Router external data loading](https://tanstack.com/router/latest/docs/guide/external-data-loading) — Query-backed route loading.
- [TanStack Query installation](https://tanstack.com/query/latest/docs/framework/react/installation) and [overview](https://tanstack.com/query/latest/docs/framework/react/overview) — v5 documentation family and server-state role.
- [React ViewTransition](https://react.dev/reference/react/ViewTransition) — current v19.3 reference and component-level animation API.
- [MDN View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) and [reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion) — browser capabilities and motion preference.
- [React Hook Form useFieldArray](https://react-hook-form.com/docs/usefieldarray) — dynamic form rows and limitations.
- [Official Hook Form resolvers repository](https://github.com/react-hook-form/resolvers) and [Zod](https://zod.dev/) — schema integration and v4 documentation.
- [Radix accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility) — primitive behavior and accessibility responsibilities.
- [React Router View Transitions](https://reactrouter.com/how-to/view-transitions) — viable routing alternative.
- [Vitest guide](https://vitest.dev/guide/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), [MSW introduction](https://mswjs.io/docs/), [Playwright installation](https://playwright.dev/docs/intro) — proposed verification tools.

<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `$gsd-fast` for a trivial task inline, with no subagents and no PLAN.md
- `$gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `$gsd-debug` for investigation and bug fixing
- `$gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `$gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
