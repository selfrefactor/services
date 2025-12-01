const {
  SEPARATORS,
  POSSIBLE_MODES,
  ICON_MODES,
  TEXT_MODES,
  BACK_MODES,
} = require('./constants')
const { bigLog } = require('./_modules/big-log')
const { colorizedBackground } = require('./_modules/colorized-background')
const { colorizedText } = require('./_modules/colorized-text')
const { logObject } = require('./_modules/log-object')
const { logWithIcon } = require('./_modules/log-with-icon')
const { separator } = require('./_modules/separator')
const boxen = require('boxen')

const boxenOptions = {
	borderColor: 'magenta',
	borderStyle: 'doubleSingle',
	padding: 0.5
}

function logFn(...inputs){
  const [ toLog, mode, additional ] = inputs
  if (additional !== undefined){
    return console.log(...arguments,
      'helpers-fn.log doesn\'t support multiple inputs')
  }

  if (SEPARATORS.includes(toLog)) return separator(toLog)

  if (!POSSIBLE_MODES.includes(mode)){
    throw new Error('mode is not declared')
  }

  if (mode === 'big') return bigLog(toLog)
  if (mode === 'obj') return logObject(toLog)
  if (mode === 'box') {
		console.log(boxen.default(toLog, boxenOptions))
		return
	}
  if (mode === 'box.padding') {
		console.log(boxen.default(toLog, {...boxenOptions, padding: 0.9}))
		return
	}
  if (TEXT_MODES.includes(mode)) return colorizedText(mode, toLog)
  if (BACK_MODES.includes(mode)) return colorizedBackground(mode, toLog)
  if (ICON_MODES.includes(mode)) return logWithIcon(mode, toLog)

  throw new Error('mode is declared but its handling is missing')
}

exports.log = logFn
