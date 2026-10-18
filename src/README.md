# Application source

## Run locally

Use Node **24.22.0** and npm **11**. From the repository root:

```sh
npm ci
npm run dev
```

Open `http://localhost:5001/junctionx_if_submission/`.
Source HTML requires the Vite server; opening it directly as a file is unsupported.

`npm run build` creates the static site in `dist/`; `npm run preview` serves that
build at the same address. GitHub Pages publishes the checked build from `main`.

## Layout

| Module                        | Purpose                                                               |
| ----------------------------- | --------------------------------------------------------------------- |
| `main.ts`, `app/`             | Startup, page state, events and shareable URLs                        |
| `domain/`                     | Typed state, eligibility, task applicability and illustrative pricing |
| `features/`                   | Home, absence, baby, pet and staff views                              |
| `ui/`                         | Shared controls, dialogs, icons and recovery UI                       |
| [content/](content/README.md) | Scenario rules, bilingual copy, sources and fictional profiles        |
| `locales/`                    | Shared FI/EN labels and content resolution                            |
| `styles/`                     | Theme tokens, components, responsive layout and branding              |

Styles are imported in order by `styles/theme.css`. Domain rules use canonical
configuration; views resolve text by language and record identity. Visitor and
customer state are separate and remain in memory. URLs contain only language,
audience, scenario and optional fictional portfolio.
