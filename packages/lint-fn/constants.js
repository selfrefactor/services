const { resolve } = require('path')

exports.JS = `${ process.env.HOME }/repos/rambda/source/defaultTo.js`
exports.PRETTIER_JS = `${ process.env.HOME }/repos/rambda/source/compose.js`
exports.JEST = `${ process.env.HOME }/repos/rambda/source/compose.spec.js`
exports.TS = `${ process.env.HOME }/repos/rambda/immutable.d.ts`
exports.ANGULAR = `${ process.env.HOME }/repos/rambda-docs/src/app/whole/whole.component.ts`
exports.REACT = `${ process.env.HOME }/repos/now/packages/ils-vite/src/index.tsx`
exports.ERROR = `${ process.env.HOME }/foo/bar.js`
exports.ANGULAR_HTML = `${ process.env.HOME }/repos/rambda-docs/src/app/whole/whole.component.html`
exports.TS_PROVE = resolve(__dirname, '../dep-fn/src/update.ts')
