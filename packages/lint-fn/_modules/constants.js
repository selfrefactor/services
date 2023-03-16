const { resolve } = require('path')

exports.DIR = resolve(__dirname, '../')
exports.debugFlag = process.env.LINT_FN_DEBUG === 'ON'
