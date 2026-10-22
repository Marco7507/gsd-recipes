---
phase: "01"
slug: "collaborative-culinary-magazine-design"
status: draft
nyquist_compliant: true
wave_0_complete: false
created: "2026-10-22"
---

# Phase 01 — Validation Strategy

## Test Infrastructure

Existing TypeScript/Vite build and Oxlint support manual browser acceptance. No new test framework is required for this design-only phase.

- Quick command: `node_modules/.bin/oxlint src`
- Full command: `npm run build`
- Configuration: existing Vite, TypeScript and Oxlint configuration.
- Expected automated feedback: under 30 seconds based on research observations.

## Sampling Rate

- After each prototype task: scoped lint; build after entry, TypeScript or CSS changes; inspect the affected rendered scenario.
- After each review stage: build and review current scenarios on mobile and desktop, including keyboard operation.
- Before phase verification: all automated checks pass and the owner explicitly approves the complete responsive direction.
- Maximum target automated feedback latency: 30 seconds.

## Per-Task Verification Map

The plan set assigns every validation obligation to an exact task. Threat references are phase-unique; `T-01-SC` is the reserved supply-chain row repeated by contract.

| Plan / Task | Wave | Behavior | Requirement | Test Type | Automated Command | Manual Evidence | Threat Refs | Status |
|-------------|------|----------|-------------|-----------|-------------------|-----------------|-------------|--------|
| 01-01 / Task 1 | 1 | Reachable fixture-only review tracer and revision ledger | DES-01 | Build + entry smoke | `npm run build` | Open executor-provided root URL | T-01-01, T-01-02, T-01-03 | Pending |
| 01-01 / Tasks 2–3 | 1 | Complete foundations followed by explicit owner review | DES-01 | Lint/build + owner decision | `node_modules/.bin/oxlint src`; `npm run build` | Four-width foundations review | T-01-01, T-01-02 | Pending |
| 01-02 / Tasks 1–3 | 2 | Complete interactive components/states followed by separate owner review | DES-01 | Lint/build + keyboard review | `node_modules/.bin/oxlint src`; `npm run build` | Component/state, dialog and focus review | T-01-04, T-01-05, T-01-06 | Pending |
| 01-03 / Tasks 1–3 | 3 | Three same-system catalog compositions and explicit A/B/C selection | DES-01 | Lint/build + comparison | `node_modules/.bin/oxlint src`; `npm run build` | Mobile/desktop comparison and decision | T-01-07, T-01-08, T-01-09 | Pending |
| 01-04 / Tasks 1–3 | 4 | Selected catalog, detail, favorites and creation state matrix | DES-01 | Lint/build + browser acceptance | `node_modules/.bin/oxlint src`; `npm run build` | 123 UI pairs; keyboard/reflow/motion review | T-01-10, T-01-11, T-01-12 | Pending |
| 01-05 / Tasks 1–3 | 5 | Feedback incorporation and final owner-only Phase 2 release gate | DES-01 | Lint/build + explicit approval | `node_modules/.bin/oxlint src`; `npm run build` | Approval tied to exact final revision | T-01-13, T-01-14, T-01-15 | Pending |

## Wave 0 Requirements

- [ ] 01-01 Task 1 creates a reachable review entry and documents the exact URL and launch command.
- [ ] 01-03 Task 1 provides typed deterministic fixtures; 01-02 through 01-04 provide reachable scenario selectors.
- [ ] 01-01 Task 1 establishes the feedback/approval ledger; every checkpoint adds its stage-specific checklist and evidence.
- [x] Every validation behavior is assigned to an exact plan/task and phase-unique threat references.

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual foundations | DES-01 | Owner preference | Review palette, typography, shapes and proposed French names; record feedback and explicit validation. |
| Interactive components | DES-01 | Rendered interaction and owner judgment | Inspect hover, focus, selected, disabled, loading and error states; incorporate feedback before catalog comparisons. |
| Catalog selection | DES-01 | Comparative design choice | Compare three distinct compositions using the same approved DS at mobile and desktop widths. |
| Screen/state completeness | DES-01 | Visual and behavioral review | Walk the RESEARCH.md coverage matrix; verify all states without real POST requests. |
| Accessibility and responsiveness | DES-01 | Browser behavior | Check 390px and 1440px plus 320px and an intermediate width; use Tab/Shift+Tab, Escape, dialog focus return and reduced motion. Verify bottom navigation obscures no controls. |
| Final direction approval | DES-01 | Only the owner can approve | Incorporate feedback, identify the artifact revision, and record explicit approval of the complete DS and responsive screens before Phase 2. |

## Validation Sign-Off

- [x] All implementation tasks have runnable automated verification; checkpoints carry explicit human-only evidence.
- [x] No consecutive implementation sequence lacks automated verification.
- [x] Wave 1 assigns all missing review infrastructure to 01-01 before expansion.
- [x] No watch-mode verification commands are used.
- [x] Automated commands reuse the previously exercised sub-30-second build and scoped lint paths.
- [x] The completed plan/task/threat map has been checked and `nyquist_compliant` is true.

**Approval:** Pending. The brief and research do not approve the visual design.
