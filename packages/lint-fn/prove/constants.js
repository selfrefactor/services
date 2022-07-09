const { resolve } = require('path')

exports.JS = `${ process.env.HOME }/repos/rambda/source/defaultTo.js`
exports.JEST = `${ process.env.HOME }/repos/rambda/source/compose.spec.js`
exports.TS = `${ process.env.HOME }/repos/rambda/immutable.d.ts`
exports.ANGULAR = `${ process.env.HOME }/repos/rambda-docs/src/app/whole/whole.component.ts`
exports.TS_PROVE = resolve(__dirname, '../../dep-fn/src/update.ts')
