const vscode = require('vscode')
const { copyTrimmed } = require('./copyTrimmed')
const { createSpec } = require('./createSpec')
const { fixCamelcaseRefactoring } = require('./fixCamelcaseRefactoring')
const { formatJson } = require('./format-json')
const { initBar } = require('./bar')
const { requestRandomFile } = require('./randomFile')
const { REQUEST_RANDOM_FILE, SORT_LINES } = require('./constants')
const { sortLines } = require('./sort-lines')
const { slowScroll } = require('./slow-scroll')

function activate(context){
  initBar()
  const formatJsonCommand = vscode.commands.registerCommand('magicBeans.formatJson',
    formatJson)
  const copyTrimmedCommand = vscode.commands.registerCommand('magicBeans.copyTrimmed',
    copyTrimmed)
  const createSpecCommand = vscode.commands.registerCommand('magicBeans.createSpec',createSpec)
  const slowScrollCommand = vscode.commands.registerCommand('magicBeans.slowScroll',
    slowScroll(context))
  const requestRandomFileCommand = vscode.commands.registerCommand(REQUEST_RANDOM_FILE,
    requestRandomFile)
  const sortLinesCommand = vscode.commands.registerCommand(SORT_LINES,
    sortLines)
  const fixCamelcaseRefactoringCommand = vscode.commands.registerCommand('magicBeans.fixCamelcaseRefactoring',
  fixCamelcaseRefactoring)

  context.subscriptions.push(copyTrimmedCommand)
  context.subscriptions.push(createSpecCommand)
  context.subscriptions.push(slowScrollCommand)
  context.subscriptions.push(requestRandomFileCommand)
  context.subscriptions.push(formatJsonCommand)
  context.subscriptions.push(sortLinesCommand)
  context.subscriptions.push(fixCamelcaseRefactoringCommand)
}

exports.activate = activate
