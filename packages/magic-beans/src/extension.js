const vscode = require('vscode')
const {
  REQUEST_RANDOM_FILE,
  SLOW_SCROLL_INIT,
  SLOW_SCROLL_SHOW_BAR_INITIALLY,
  SORT_LINES,
} = require('./constants')
const { copyTrimmed } = require('./copy-trimmed')
const { fixComment } = require('./fix-comment')
const { createSpec } = require('./create-spec')
const { formatJson } = require('./format-json')
const { initStatusBars } = require('./bar')
const {
  requestRandomFile,
  requestRandomFileWithSubfolderRightClick,
} = require('./random-file')
const { slowScrollInit } = require('./slow-scroll')
const { sortLines } = require('./sort-lines')
const { highlightOnCopy } = require('./highlight-on-copy')
const { fixCamelcaseRefactoring } = require('./fix-camelcase-refactoring')
const { setColorTheme } = require('./set-color-theme')
const { configAnt } = require('./ants/config')
const { symbolsList } = require('./symbols-list/symbols-list')

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
  const SLOW_SCROLL_SHOW_BAR_INITIALLY_VALUE = configAnt(SLOW_SCROLL_SHOW_BAR_INITIALLY)

  initStatusBars()
  let setColorThemeFn = setColorTheme(context)
	setColorThemeFn()
	
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
    highlightOnCopy(setColorThemeFn),
  )
  const fixCommentCommand = vscode.commands.registerCommand(
    'magicBeans.fixComment',
    fixComment(vscode),
  )
  const createSpecCommand = vscode.commands.registerCommand(
    'magicBeans.createSpec',
    createSpec,
  )
  const slowScrollInitCommand = vscode.commands.registerCommand(
    SLOW_SCROLL_INIT,
    slowScrollInit(context),
  )
  const requestRandomFileCommand = vscode.commands.registerCommand(
    REQUEST_RANDOM_FILE,
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
  context.subscriptions.push(slowScrollInitCommand)
  context.subscriptions.push(requestRandomFileCommand)
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

  if(SLOW_SCROLL_SHOW_BAR_INITIALLY_VALUE){
    vscode.commands.executeCommand(SLOW_SCROLL_INIT)
  }
}


function deactivate() {
  vscode.commands.executeCommand("setContext", "magicBeans.init", false);
}

exports.activate = activate
exports.deactivate = deactivate
