# Architecture

Vite builds two static HTML entries with a shared application. The repository base
is `/junctionx_if_submission/`; no client-side server rewrite is required.
The PDF is copied from `public/` without modification. There is no backend.

The migration deliberately retains the DOM UI while establishing explicit module
imports and repository-owned checks. `src/content/scenarios/` contains sourced
scenario records; `src/ui/icons.js` contains local SVG paths. `src/app/` owns
application lifecycle and event wiring. `src/domain/` owns pure typed rules with
explicit configuration, independent of translated display content and the DOM.

In-memory state is separate for visitors and existing customers. Scenario state
persists across tabs within the page; reload starts a new simulation. No health
observations or task history belong in navigation URLs. One-use introductory
contact remains consumed across policy/language switches within the customer state.

## Remaining extraction boundaries

The original rendering layer is still JavaScript while the rule and routing
boundaries become strict TypeScript. The initial content migration retains the
validated FI-to-EN path overlays and original CSS cascade. Replacing those with
semantic catalogues, extracting feature views and consolidating CSS are subsequent
reviewable steps, not prerequisites to reproducing this baseline. Do not expand
source-string translations or append another historical style override.

Source/reference checks establish structural consistency only. Human review of
primary sources is needed before factual publication or product integration.
