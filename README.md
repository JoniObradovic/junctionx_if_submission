# If rinnalla

**Small actions today. Greater peace of mind tomorrow.**

A hackathon prototype exploring how an insurer can earn trust before a claim:
practical prevention guidance, transparent illustrative rewards and useful help
for new and existing customers.

[Open the English demo](https://joniobradovic.github.io/junctionx_if_submission/?lang=en) ·
[Existing customer](https://joniobradovic.github.io/junctionx_if_submission/?lang=en#asiakas) ·
[Staff analytics](https://joniobradovic.github.io/junctionx_if_submission/personnel.html?lang=en) ·
[Pitch deck (PDF)](https://joniobradovic.github.io/junctionx_if_submission/presentation/If-rinnalla-demo-EN.pdf)

## What the prototype demonstrates

- Four situations: a new home, leaving home empty, a first baby and pet wellbeing.
- Different guidance for visitors and fictional customers with different policies.
- A proposed prevention reward: completed eligible actions change a fictional premium.
- A proposed one-use pet-help introduction for existing customers without pet cover.
- Read-only staff analytics from three invented customer records.
- Finnish and English views, accessible controls and responsive layouts.

All customers, policies and prices are fictional. Rewards and the complimentary
contact are **product proposals**, not current If offers. Published benefits have
sources and applicability limits. No measured claims-success percentage is known.
Pet guidance is not diagnosis; emergency instructions override insurance eligibility.
No booking, message, quote or insurance transaction is sent. State stays in memory
and resets on reload. Do not enter real personal or health information.

## Develop

Use Node **24.22.0** and npm **11** (versions are pinned in `.node-version` and
`package.json`). With nvm: `nvm install && nvm use`.

```sh
npm ci
npm run dev
```

Open `http://localhost:5001/junctionx_if_submission/`. On an SSH host, forward
port 5001: `ssh -N -L 5001:localhost:5001 your-host`. Existing 3000/5000 tunnels
can stay open. The hosted demo needs only a browser; development uses a build.
Opening the source HTML directly through `file://` is no longer supported.

## Quality checks

```sh
npm run check              # formatting, lint, types, content/domain tests and build
npx playwright install --with-deps
npm run test:e2e           # production build: Chromium, Firefox, WebKit and mobile
npm run preview            # inspect dist/ over HTTP on port 5001
```

`npm run check:content` checks source references and translation applicability;
it does not verify the truth or continuing validity of an insurance/health claim.
Browser tests exercise all four cases, profiles, bilingual copy, keyboard/focus,
clipboard fallback, one-use contact, emergency precedence and automated accessibility.
Automated accessibility checks do not replace real assistive-technology testing.

## Source and delivery

`src/` is the application source, `tests/` contains repository-local checks and
`public/presentation/` holds the approved PDF. Only the built `dist/` artifact is
published to GitHub Pages. Both `index.html` and `personnel.html` remain supported.
See [architecture](docs/ARCHITECTURE.md), [contributing](CONTRIBUTING.md) and
[release/rollback](docs/RELEASE.md). No backend or runtime service is required.

This is an independent prototype for the If challenge, not an official If service.
Brand references are for demonstration. Public source licensing and credit are
separate submission decisions; no license grant is implied by this README.
