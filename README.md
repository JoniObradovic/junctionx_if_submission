# If rinnalla

**One small step today. A more carefree tomorrow.**

A bilingual life-situation companion that helps people prevent problems,
understand relevant insurance information and find useful support before a
claim happens. Built for the JunctionX challenge **If Insurance Could Do More**.

## Try the demo

Open **[index.html](index.html)** in a browser. No installation, build, server or
account is required. Keep the supplied folders together; the application also
works offline. Select **EN** or **FI** in the top corner to change language.

- **New customer:** explore practical preparations and insurance questions
  without assuming an existing policy or customer benefit.
- **Existing customer:** select a fictional insurance portfolio and see the
  guidance, example price and relevant services change.
- **[If staff](personnel.html):** explore synthetic customer analytics with
  filters that update the totals, charts and customer table together.

**[Pitch deck — standalone English PDF](presentation/If-rinnalla-demo-EN.pdf)**

## A short walkthrough

1. **New home:** choose Existing customer with Home, dog and travel insurance.
   Complete the kitchen leak checks and floor-drain cleaning. The illustrative
   annual premium changes from **€529.20 to €513.00**; undo a task to reverse it.
   Open the pipework task and change its year to explore the separate,
   conditional age-deduction example.
2. **Home away:** switch between winter and summer, adjust the trip duration
   and select tasks for a neighbour. The checklist and shareable message update
   immediately. Copying also offers selectable text for manual copying.
3. **First baby:** switch between new and second-hand equipment and filter by
   topic. Safety checks adapt to the equipment; insurance guidance also adapts
   to the selected customer profile.
4. **Pet wellbeing:** a dog-insured example shows If Eläinapu contact guidance.
   Switch to Home insurance only to see the proposed complimentary contact.
   Emergency signs always replace the remote-service route with urgent guidance.
5. **If staff:** filter the policy type to Dog insurance. Three fictional
   customers become one matching customer, with all analytics following the
   same selection.

The information buttons explain the reasoning and business hypotheses. Source
details next to guidance show the publisher, document/version, checked date,
applicability and limitations.

## What the prototype demonstrates

Four situations share one reactive workspace: new home, home away, first baby
and pet wellbeing. New and existing customers receive different introductions,
policy prompts and service routes. The separate staff view is analytical.

The product hypothesis is that timely, understandable actions and relevant
support can improve customer confidence and reduce avoidable problems. Claims
savings, retention and satisfaction improvements have **not been measured**.

All customer records, prices and analytics are fictional. The task-based
prevention discount and complimentary pet-support contact are **product
proposals, not current If offers**. Actual eligibility, pricing and cover depend
on the customer's contract and the applicable terms. Task completion does not
prove safety, approve a discount or guarantee a successful claim.

Service actions only simulate a handoff: nothing is sent, booked, purchased or
connected. Role selection is not authentication. State stays in the page's
memory and resets on reload; there is no backend, telemetry or persistent
storage. The prototype uses prepared rules and content, not a live AI model or
medical diagnosis. Guidance uses a **2026** reference year; source metadata was
checked on **17 October 2026**. Opening external source links requires internet
access; using the demo does not.

## Technologies and source

Plain **HTML, CSS and vanilla JavaScript**, with local SVG icons and system
fonts. There are no runtime dependencies or build steps.

- `index.html` and `personnel.html`: customer workspace and staff analytics.
- `css/nordic-theme.css`: responsive If-inspired styling.
- `js/app.js`: state, calculations, rendering and interactions.
- `knowledge/*.js`: Finnish content, English translations, rules and sources.
- `assets/icons.js`: local icon definitions.

Both pages load classic scripts in order: icons, the four numbered knowledge
modules, then the application. This keeps the source editable and permits
direct `file:///` use as well as static web hosting.
