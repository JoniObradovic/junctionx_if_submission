# Release and rollback

The original approved static baseline is commit
`9ef904a7e605b76e3f03064cad10af447eae5b7e`.

Feature branches run quality checks without publishing. Main builds and tests the
same `dist/` directory uploaded to Pages. Publishing uses GitHub Actions Pages
artifacts, not the source branch. Repository visibility is an independent setting.

Before releasing, check the workflow, both public pages, FI/EN navigation and the
PDF. Its SHA-256 must remain
`7a30789b239a969917f4ad5ace7e70f1579a501e50fe1dc0e2628817f2b19a74`.
The frontend is a fictional demo with no migrations or server data to restore.

To roll back a workflow release, revert the offending commit on main and let the
same checks and Pages deployment run. To return all the way to the original static
baseline, restore that commit on a recovery branch, review it, merge it and change
Pages publishing back to main/root. That older source has no Vite build workflow.
Never publish unbuilt TypeScript using the legacy main/root publisher.
