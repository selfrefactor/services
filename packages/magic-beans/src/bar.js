const vscode = require('vscode')
const { delay } = require('rambdax')
const { REQUEST_RANDOM_FILE, SLOW_SCROLL_START } = require('./constants')

const PRIORITY = 1
const holder = {}
const WELCOME_MESSAGE = 'START MAGIC BEANS'
holder.bar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left,
  PRIORITY)
holder.bar.command = REQUEST_RANDOM_FILE
holder.secondBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left,
  PRIORITY+1)
holder.secondBar.command = SLOW_SCROLL_START

const logToUser = text => {
  holder.bar.text = String(text)
  holder.bar.tooltip = text
}
const logToUserSecondBar = text => {
  holder.secondBar.text = String(text)
}

const initBar = () => {
  holder.bar.show()
  holder.secondBar.show()
  logToUser(WELCOME_MESSAGE)
  delay(1500).then(() => {
    if (holder.bar.text === WELCOME_MESSAGE) logToUser('')
  })
}

exports.logToUserSecondBar = logToUserSecondBar
exports.logToUser = logToUser
exports.initBar = initBar
