const chalk = require('chalk')
const R = require('rambdax')
const {
  SUCCESS_COLOR,
  INFO_COLOR,
  WARNING_COLOR,
  ERROR_COLOR,
} = require('../constants')

const icons = {
  info    : chalk.default.blue('   ℹ'),
  success : chalk.default.green('   ✔'),
  warning : chalk.default.yellow('   ⚠'),
  error   : chalk.default.red('   ✖'),
}

function getTextColor(mode){
  return R.switcher(mode)
    .is('success', SUCCESS_COLOR)
    .is('info', INFO_COLOR)
    .is('warning', WARNING_COLOR)
    .is('error', ERROR_COLOR)
    .default(INFO_COLOR)
}

function logWithIcon(mode, toLog){
  const chalkRule = chalk.default.hex(`#${ getTextColor(mode) }`)
  console.log(icons[ mode ], chalkRule(String(toLog)))
}

exports.logWithIcon = logWithIcon
