const vscode = require('vscode')
const { delay } = require('rambdax')
const {
  REQUEST_RANDOM_FILE,
  SLOW_SCROLL_START,
  SLOW_SCROLL_STOP,
} = require('./constants')

const PRIORITY = 1
const holder = {}
holder.bar = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Left,
  PRIORITY,
)
holder.bar.command = REQUEST_RANDOM_FILE
holder.secondBar = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Left,
  PRIORITY + 2,
)
holder.secondBar.command = SLOW_SCROLL_START
holder.thirdBar = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Left,
  PRIORITY + 1,
)
holder.thirdBar.command = SLOW_SCROLL_STOP

const logToUser = text => {
  holder.bar.text = String(text)
  holder.bar.tooltip = text
}
const logToUserAndClose = text => {
  holder.bar.text = String(text)
  holder.bar.tooltip = text
  delay(5000).then(() => {
    holder.bar.hide()
  })
}

const initStatusBars = () => {
  holder.bar.show()
  holder.secondBar.show()
  holder.thirdBar.show()
}

const initSlowScrollBars = () => {
  holder.secondBar.text = '🐢🏁 '
  holder.thirdBar.text = '🐢⛔ '
}

exports.logToUser = logToUser
exports.logToUserAndClose = logToUserAndClose
exports.initStatusBars = initStatusBars
exports.initSlowScrollBars = initSlowScrollBars
