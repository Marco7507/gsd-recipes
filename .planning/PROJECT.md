# GSD Recipes

## What This Is

A React frontend for discovering recipes from DummyJSON, with an ambitious responsive interface inspired by a culinary magazine. Users can browse, search and filter recipes, read ingredients and instructions, save local favorites, and submit new recipes. This is a personal project for practicing advanced React; the assistant will implement the entire application.

## Core Value

Make discovering and reading recipes enjoyable through a polished culinary magazine experience built with purposeful advanced React patterns.

## Requirements

### Validated

None yet — existing scaffolding has not been assessed as shipped product functionality. The user chose to skip codebase mapping.

### Active

- [ ] Browse recipes supplied by DummyJSON.
- [ ] Search recipes by name and filter the catalog; exact filters will be scoped during requirements definition.
- [ ] View recipe details, including ingredients and preparation instructions.
- [ ] Save favorites locally and retain them across browser sessions.
- [ ] Create a recipe through a validated form and send it to DummyJSON.
- [ ] Show an explicit success confirmation after a successful creation response; persistence of created recipes is not required.
- [ ] Provide transitions between pages using View Transitions, with routing integration selected during technical planning.
- [ ] Establish a genuine design system and a responsive culinary magazine visual identity.
- [ ] Dedicate a complete phase to design exploration, mockups and user feedback before implementing the application interface.
- [ ] Use French for interface text and English exclusively for code, including identifiers, filenames and comments.
- [ ] Use advanced React patterns and adopt libraries when justified by actual use cases.

### Out of Scope

- A custom backend or durable storage for submitted recipes — sending to DummyJSON and confirming success satisfies the learning goal.
- Automatic translation of API recipe content — the interface is French; supplied recipe content may retain its original language.

## Context

- The user wants hands-on exposure to advanced React concepts through a complete application, with the assistant performing implementation.
- The workspace contains React, TypeScript and Vite scaffolding, a package manifest, and installed dependencies. No existing product capabilities have been verified.
- The user explicitly mentioned TanStack, View Transitions and React Hook Form. Router and query-library choices must be evaluated for their respective purposes during planning; additional libraries should serve concrete use cases.
- React Hook Form is intended for recipe creation; detailed fields, validation rules, ingredient entry and instruction entry remain to be designed.
- The desired aesthetic is a culinary magazine. Typography, colors, layout, components and motion will be explored collaboratively in the dedicated design phase rather than treated as settled choices.
- Exact catalog filters remain open. Editing and deleting recipes were suggested but not explicitly accepted; they are not committed scope.
- DummyJSON endpoint behavior and supported payloads must be verified against official documentation before implementation.

## Constraints

- **Frontend**: React, building on the existing TypeScript/Vite workspace — the project is intended to develop advanced React skills.
- **Data source**: DummyJSON recipes API — use it for the catalog and recipe submissions.
- **Language**: French interface; English-only code and comments — explicit user requirement.
- **Creation behavior**: Confirm addition only after a successful API response; no persistence requirement for submitted recipes.
- **Design process**: A dedicated design phase must provide opportunities for user feedback before the final interface is implemented.
- **Implementation ownership**: The assistant builds the entire app; exercises or user-authored implementation are not the delivery model.
- **Library selection**: Choose libraries according to use cases and compatibility, avoiding dependencies added solely to increase complexity.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Build a recipe frontend using React and DummyJSON | Practice advanced React through a concrete complete application | — Pending |
| Use a culinary magazine aesthetic and a real design system | The user wants an ambitious, coherent interface | — Pending |
| Include a dedicated collaborative design phase | The user wants to review visual directions and give feedback | — Pending |
| Store favorites locally | Retain favorites without introducing a backend | — Pending |
| Submit new recipes to DummyJSON and confirm success | Practice forms and API mutations without requiring persistence | — Pending |
| Use View Transitions for page navigation | Explicit learning and interaction goal | — Pending |
| Evaluate TanStack libraries and use React Hook Form where appropriate | Practice useful ecosystem tools tied to real needs | — Pending |
| French interface and English-only code | Explicit language preference | — Pending |
| Skip codebase mapping during initialization | Explicit user choice | ✓ Confirmed |

## Evolution

This document evolves at phase transitions and milestone boundaries.

After each phase transition:
1. Move invalidated requirements to Out of Scope with a reason.
2. Move validated requirements to Validated with a phase reference.
3. Add newly discovered requirements to Active.
4. Record decisions and their outcomes.
5. Update What This Is if the product has changed.

After each milestone:
1. Review every section.
2. Check that Core Value still reflects the main priority.
3. Reconsider Out of Scope reasons.
4. Update Context with the current state.

---
*Last updated: 2026-10-22 after initialization*
