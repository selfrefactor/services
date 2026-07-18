# AGENTS.md

## Monorepo structure

Lerna v3 + Yarn v1 (classic). Packages under `packages/*`. Independent versioning. No root lockfile (lerna `--no-lockfile`). No root CI, no root ESLint/Prettier — each package manages its own.

## Key packages

| Package | Type | Build | Test |
|---|---|---|---|
| `magic-beans` | VS Code extension | `esbuild` → `dist/extension.js` | `jest` (`.+spec.js$`) |
| `commit-fn` | commitizen alternative (TS) | `tsc` → `dist/` | `jest` + `ts-jest` |
| `string-fn` | string library | Rollup → CJS + ESM | `jest` + `babel-jest` |
| `helpers-fn` | generic helpers (JS) | none (raw `src/`) | `vitest` |
| `run-fn` | CLI tool (`run` binary) | none (raw JS) | none |
| `dep-fn` | dep update utility (TS) | `tsc` | none |
| `playwright-fn` | Playwright wrapper (JS) | none | `jest` |
| `scrape-jokes` | Playwright scraper (JS) | none | `jest` (env-driven) |
| `vscode-control` | VS Code settings sync | none (raw JS) | none |
| `new-docs` | Docusaurus site | `docusaurus build` | `tsc` typecheck |

## Essential commands per package

Work in the package directory, not root (no root scripts).

**magic-beans:**
- `yarn build` — production esbuild bundle
- `yarn build:dev` — dev bundle (no minify, sourcemaps)
- `yarn test` — run Jest tests in `src/_modules`
- `yarn dev` — `jest -u src/_modules/format-json.spec.js` (update snapshot + single file)
- `yarn lint:file` — eslint single file (via `niketaScripts`)

**commit-fn:**
- `yarn out` — `tsc -p .` to compile
- `yarn test` — `jest src/commitMessageFast.spec.ts`
- `yarn prove` — `yarn out && node ./dist/tests/happy.js`

**string-fn:**
- `yarn out` — `yarn build:main && yarn build:web` (full build)
- `yarn test` — `jest` (all specs)
- `yarn dev` — `jest src/camelCase.spec.js`
- Uses Rollup with Babel. Output: `dist/string-fn` (CJS), `dist/string-fn.esm.js` (ESM).

**helpers-fn:**
- `yarn test` — `vitest` (all specs)
- `yarn dev` — `vitest src/log/log.spec.js -u`

**run-fn:**
- CLI entry: `bin/run.js` (used via `run <command>`)
- Lint: `oxlint` (via `oxlint` dep), format: `oxfmt` or `prettier`
- `run dep:next` — update all dependencies (parallel, >30d old OK)
- `run dep:stable` — update only deps >30d old
- `run dep` — interactive per-dep update via `dep-fn`

**scrape-jokes:**
- Tests driven by env vars: `HEADLESS`, `WITH_CONFIG`, `FORCE_CONTINUE`, `CHECK_FOR_UNIQUENESS`, `PAGE`
- Uses `playwright-fn` as abstraction layer.

## Testing quirks

- No unified test runner — each package has its own. Always check the package's `package.json` `test` script.
- `magic-beans` tests only run in `src/_modules` (explicit path in `test` script).
- `string-fn` uses `babel-jest` transform. `commit-fn` uses `ts-jest`.
- `scrape-jokes` tests are actual Playwright scraping runs triggered by long env+URL commands.

## Build / publish flow (magic-beans only)

`bump.sh`: `yarn build && run d && vsce publish minor && run d && ovsx publish`

## Code style conventions

- Semicolons: `asNeeded` (run-fn Biome config). No semicolons in `magic-beans` source.
- Single quotes prefered where configured.
- Commas: trailing in run-fn, standard elsewhere.
- ESLint configs: `magic-beans` uses `@stylistic` + `sonarjs` + `perfectionist` + `unused-imports` plugins; `commit-fn` uses `@typescript-eslint` with 2-space indent.
- `commit-fn` code style: trailing commas on multiline, 2-space indent, no space before function parens.

## No CI / no root scripts

There are no CI workflows (no `.github/` directory). Root `package.json` only has `lerna` as devDep and no scripts — all work must be done per-package.

## Inter-package dependencies

Several packages depend on sibling packages at exact versions:
- `helpers-fn` depends on `string-fn`
- `magic-beans`, `commit-fn`, `run-fn`, `playwright-fn`, `scrape-jokes` depend on `helpers-fn` and/or `string-fn` and/or `rambdax`
