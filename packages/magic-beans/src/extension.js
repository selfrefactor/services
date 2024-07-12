const vscode = require('vscode')
const {
  REQUEST_RANDOM_FILE,
  REQUEST_RANDOM_FILE_WITH_SUBFOLDER,
  SLOW_SCROLL_INIT,
  SORT_LINES,
} = require('./constants')
const { copyTrimmed } = require('./copy-trimmed')
const { fixComment } = require('./fix-comment')
const { createSpec } = require('./create-spec')
const { formatJson } = require('./format-json')
const { initBar } = require('./bar')
const {
  requestRandomFile,
  requestRandomFileWithSubfolderRightClick,
} = require('./random-file')
const { slowScroll } = require('./slow-scroll')
const { sortLines } = require('./sort-lines')
const { symbolsList } = require('./symbols-list')
const { highlightOnCopy } = require('./highlight-on-copy')
const { setColorTheme } = require('./set-color-theme')
const { fixCamelcaseRefactoring } = require('./fix-camelcase-refactoring')

function openInVsCode(data, {isInsiders}) {
  const binary = isInsiders ? 'code-insiders' : 'code'
  const terminal = vscode.window.createTerminal({ name: 'New vscode' })
  terminal.hide()
  terminal.sendText(`${binary} '${data.fsPath}'`)
  setTimeout(() => {
    terminal.dispose()
  }, 4000)
}

function activate(context) {
  vscode.commands.executeCommand("setContext", "magicBeans.init", true);

  initBar()
  setColorTheme(context)
  const symbolsListCommand = vscode.commands.registerCommand(
    'magicBeans.symbolsList',
    symbolsList,
  )
  const formatJsonCommand = vscode.commands.registerCommand(
    'magicBeans.formatJson',
    formatJson,
  )
  const copyTrimmedCommand = vscode.commands.registerCommand(
    'magicBeans.copyTrimmed',
    copyTrimmed,
  )
  const highlightOnCopyCommand = vscode.commands.registerCommand(
    'magicBeans.highlightOnCopyRun',
    highlightOnCopy,
  )
  const fixCommentCommand = vscode.commands.registerCommand(
    'magicBeans.fixComment',
    fixComment(vscode),
  )
  const createSpecCommand = vscode.commands.registerCommand(
    'magicBeans.createSpec',
    createSpec,
  )
  const slowScrollCommand = vscode.commands.registerCommand(
    SLOW_SCROLL_INIT,
    slowScroll(context),
  )
  const requestRandomFileCommand = vscode.commands.registerCommand(
    REQUEST_RANDOM_FILE,
    requestRandomFile(context),
  )
  const requestRandomFileWithSubfolderCommand = vscode.commands.registerCommand(
    REQUEST_RANDOM_FILE_WITH_SUBFOLDER,
    requestRandomFile(context),
  )
  const sortLinesCommand = vscode.commands.registerCommand(
    SORT_LINES,
    sortLines,
  )
  const fixCamelcaseRefactoringCommand = vscode.commands.registerCommand(
    'magicBeans.fixCamelcaseRefactoring',
    fixCamelcaseRefactoring,
  )

  context.subscriptions.push(symbolsListCommand)
  context.subscriptions.push(copyTrimmedCommand)
  context.subscriptions.push(highlightOnCopyCommand)
  context.subscriptions.push(fixCommentCommand)
  context.subscriptions.push(createSpecCommand)
  context.subscriptions.push(slowScrollCommand)
  context.subscriptions.push(requestRandomFileCommand)
  context.subscriptions.push(requestRandomFileWithSubfolderCommand)
  context.subscriptions.push(formatJsonCommand)
  context.subscriptions.push(sortLinesCommand)
  context.subscriptions.push(fixCamelcaseRefactoringCommand)

  const openFolder = vscode.commands.registerCommand(
    'magicBeans.openFolder',
    (data) => {
      openInVsCode(data, {isInsiders: false})
    },
  )
  const openFolderInVSCodeBeta = vscode.commands.registerCommand(
    'magicBeans.openFolderInVSCodeBeta',
    (data) => {
      openInVsCode(data, {isInsiders: true})
    },
  )

  const randomFilesWithinFolder = vscode.commands.registerCommand(
    'magicBeans.requestRandomFileWithSubfolderRightClick',
    (data) => {
      requestRandomFileWithSubfolderRightClick(data, context)
    },
  )

  context.subscriptions.push(openFolder)
  context.subscriptions.push(openFolderInVSCodeBeta)
  context.subscriptions.push(randomFilesWithinFolder)
}


function deactivate() {
  vscode.commands.executeCommand("setContext", "magicBeans.init", false);
}

exports.activate = activate
exports.deactivate = deactivate
