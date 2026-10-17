# Maintaining content

Edit a scenario in `src/content/scenarios/` and global fictional customer data in
`src/content/experience.js`. Keep rule values and record IDs language independent.
Translated editorial fields use `{ fi: "…", en: "…" }` on the owning record. Source
document titles may remain in their original language; do not translate identifiers,
policy dates, numbers or coverage status into different facts.

UI labels use semantic keys in `src/locales/catalogue.ts`. Both languages must
supply every key. Static shell elements use `data-i18n` or
`data-i18n-aria-label`; dynamic views use the same catalogue.

Every insurance, safety or health assertion needs source IDs, evidence status and
an explicit limitation. A source must identify its publisher/document, URL, checked
date and applicable section. Unverified values remain unknown. Proposed prevention
rewards and the introductory pet contact must stay labelled proposals. Emergency
contact instructions take precedence over eligibility and preparation tasks.

Run `npm run check:content` and the full checks after changes. For a changed rule,
add independent boundary expectations to the domain tests and exercise both
languages/affected profiles in the browser. Automated structure checks cannot
verify a source's truth, continuing validity or applicability to a real policy.
