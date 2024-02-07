const vscode = require('vscode')
const {
  REQUEST_RANDOM_FILE,
  SLOW_SCROLL_INIT,
  SORT_LINES,
  REQUEST_RANDOM_FILE_WITH_SUBFOLDER,
} = require('./constants')
const { configAnt } = require('./ants/config')
const { copyTrimmed } = require('./copyTrimmed')
const { fixComment } = require('./fixComment')
const { createSpec } = require('./createSpec')
const { fixCamelcaseRefactoring } = require('./fixCamelcaseRefactoring')
const { formatJson } = require('./format-json')
const { initBar } = require('./bar')
const { requestRandomFile, requestRandomFileWithSubfolder } = require('./randomFile')
const { slowScroll } = require('./slow-scroll')
const { sortLines } = require('./sort-lines')
const { symbolsList } = require('./symbols-list')

function openInVsCode(data){
  const IS_VSCODE_INSIDERS = configAnt('IS_VSCODE_INSIDERS')
  const binary = IS_VSCODE_INSIDERS ? 'code-insiders' : 'code'
  const terminal = vscode.window.createTerminal({ name : 'New vscode' })
  terminal.hide()
  terminal.sendText(`${ binary } '${ data.fsPath }'`)
  setTimeout(() => {
    terminal.dispose()
  }, 4000)
}

function activate(context){
  initBar()
  const symbolsListCommand = vscode.commands.registerCommand('magicBeans.symbolsList',
    symbolsList)
  const formatJsonCommand = vscode.commands.registerCommand('magicBeans.formatJson',
    formatJson)
  const copyTrimmedCommand = vscode.commands.registerCommand('magicBeans.copyTrimmed',
    copyTrimmed)
  const fixCommentCommand = vscode.commands.registerCommand('magicBeans.fixComment',
  fixComment(vscode))
  const createSpecCommand = vscode.commands.registerCommand('magicBeans.createSpec',
    createSpec)
  const slowScrollCommand = vscode.commands.registerCommand(SLOW_SCROLL_INIT,
    slowScroll(context))
  const requestRandomFileCommand = vscode.commands.registerCommand(REQUEST_RANDOM_FILE,
    requestRandomFile)
  const requestRandomFileWithSubfolderCommand = vscode.commands.registerCommand(REQUEST_RANDOM_FILE_WITH_SUBFOLDER,
    requestRandomFileWithSubfolder)
  const sortLinesCommand = vscode.commands.registerCommand(SORT_LINES,
    sortLines)
  const fixCamelcaseRefactoringCommand = vscode.commands.registerCommand('magicBeans.fixCamelcaseRefactoring',
    fixCamelcaseRefactoring)

  context.subscriptions.push(symbolsListCommand)
  context.subscriptions.push(copyTrimmedCommand)
  context.subscriptions.push(fixCommentCommand)
  context.subscriptions.push(createSpecCommand)
  context.subscriptions.push(slowScrollCommand)
  context.subscriptions.push(requestRandomFileCommand)
  context.subscriptions.push(requestRandomFileWithSubfolderCommand)
  context.subscriptions.push(formatJsonCommand)
  context.subscriptions.push(sortLinesCommand)
  context.subscriptions.push(fixCamelcaseRefactoringCommand)

  const disposable = vscode.commands.registerCommand('open-folder-in-vscode.openFolder',
    data => {
      openInVsCode(data)
    })

  context.subscriptions.push(disposable)
}

exports.activate = activate
