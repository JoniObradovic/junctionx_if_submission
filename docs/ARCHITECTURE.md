# Architecture

Vite builds `index.html` and `personnel.html` as a static application under
`/junctionx_if_submission/`. The main entry can display localized recovery UI
if an application chunk fails to load. The approved PDF is copied unchanged from
`public/`. There is no backend, authentication or runtime service dependency.

## Boundaries

- `src/domain/models.ts`: scenario identities and explicit in-memory state types.
- `src/domain/pricing.ts`: fictional premium calculation in integer cents.
- `src/domain/engine.ts`: injected scenario/fixture configuration, state transitions,
  task applicability, deduction bands, urgency, service eligibility and analytics.
- `src/app/`: bootstrap, audience state, delegated events and allowlisted URL state.
- `src/features/`: home, absence, baby, pet and staff rendering/update functions.
- `src/ui/`: shared controls, evidence, dialogs, audience shell and recovery UI.
- `src/content/scenarios/`: rules and sourced editorial records for each case.
- `src/content/experience.js`: global roles, invented portfolios and staff records.
- `src/locales/`: typed semantic UI keys and resolution of record-local FI/EN text.
- `src/styles/`: tokens, base, components, scenarios, audience, analytics, layout and
  branding. `theme.css` owns import order so existing cascade behavior is preserved.

The core, routing and catalogues use strict TypeScript. DOM view modules remain
JavaScript in this incremental migration, with lint and browser coverage. They
receive dependencies explicitly and read current state on each call; capturing
an audience or language at factory creation would create stale views. A full UI
framework or conversion of every DOM view to TypeScript is a separate follow-up.

## State and content

Visitor and customer state are separate. Tasks persist across scenarios within a
page. Reload starts a new simulation; URLs retain only language, role, scenario
and optional fictional portfolio. Health observations, task evidence and drafts
never enter the URL. The introductory contact stays consumed across role,
portfolio and language switches within the customer page state.

The domain engine receives canonical Finnish configuration once. Views select
translated records by identity, so translation cannot alter clinical routing or
prices. Each translated content field stores its own `fi` and `en` values on the
record. Reordering an array carries those values with it. Shell elements declare
semantic keys explicitly instead of walking and matching document text.

Clipboard revisions prevent delayed results from writing to a changed view.
Text remains manually selectable if clipboard permission is denied. Adaptive
layout measures intrinsic card heights and schedules writes in animation frames;
it preserves DOM and keyboard order, with print and reduced-motion support.

## Evidence and checks

`npm run check` runs formatting, lint, strict core types, unit/content tests and a
production build. Playwright exercises built HTTP output, including the repository
prefix, in three engines and a mobile configuration. CI installs browser libraries
and uploads failure traces/screenshots. Only a passing main build can publish.

Content checks validate source references, dates, evidence limits, translation
keys, record identities and researched constraints. They establish structural
consistency, not factual accuracy. Review primary sources before changing advice.
No claim-success rate, real reward entitlement or medical safety is inferred.
