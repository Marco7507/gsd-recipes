---
phase: "01"
slug: "collaborative-culinary-magazine-design"
status: draft
nyquist_compliant: false
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

Planning is blocked pending UI-SPEC.md. Assign exact task IDs, waves and unique threat references when plans exist; the rows below are coverage obligations, not invented task assignments.

| Behavior | Requirement | Test Type | Automated Command | Manual Evidence | Status |
|----------|-------------|-----------|-------------------|-----------------|--------|
| Reachable review surface | DES-01 | Build + browser smoke | `npm run build` | Open documented review URL | Pending |
| Foundations and component states | DES-01 | Lint + owner review | `node_modules/.bin/oxlint src` | Separate feedback and validation records | Pending |
| Three catalog compositions | DES-01 | Build + comparison | `npm run build` | Mobile/desktop comparison and selection | Pending |
| Complete screens and states | DES-01 | Build + scenario review | `npm run build` | Catalog, detail, favorites, creation matrix | Pending |
| Keyboard, responsive layout and motion | DES-01 | Browser acceptance | `npm run build` | Focus, Escape, focus return, reflow, reduced motion | Pending |
| Final approval before Phase 2 | DES-01 | Human approval | N/A — human decision | Explicit approval tied to artifact revision | Pending |

## Wave 0 Requirements

- [ ] Create a reachable prototype entry and document the exact URL and launch command.
- [ ] Provide deterministic fixtures and reachable scenario selectors.
- [ ] Establish feedback and approval records plus a repeatable browser checklist.
- [ ] Assign these checks to actual plan tasks after UI-SPEC preflight passes.

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

- [ ] All actual tasks have automated verification or explicit manual-only justification.
- [ ] No three consecutive implementation tasks lack automated verification.
- [ ] Wave 0 covers missing review infrastructure.
- [ ] No watch-mode verification commands.
- [ ] Automated feedback latency remains under 30 seconds.
- [ ] Set `nyquist_compliant: true` only after the completed plan map is checked.

**Approval:** Pending. The brief and research do not approve the visual design.
