# lint-fn

Run ESLint with fix with predefined rules, which depend on the file path.

It supports Typescript files as well.

## TODO

why useprettier works from prove/tsProve but it doesn't with niketa tools - solved

on non-existing prettier path, execCommand/spawnCommand doesn't log the error, i.e. silent error

## Usage

```
// yarn add -D lint-fn
const lintFn = require("lint-fn")
await lintFn("foo.js")
await lintFn("bar.ts")
```

## Debug prettier

\_modules/usePrettier.js

const DEBUG = 1

## Skip rules

process.env. SKIP_ESLINT_RULES = 'no-nested-ternary, max-len'
