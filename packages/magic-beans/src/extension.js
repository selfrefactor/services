const vscode = require('vscode')
const {
  REQUEST_RANDOM_FILE,
  SLOW_SCROLL_INIT,
  SLOW_SCROLL_SHOW_BAR_INITIALLY,
  SORT_LINES,
} = require('./constants')
const { copyTrimmed } = require('./copy-trimmed')
const { formatJson } = require('./format-json')
const { initStatusBars } = require('./bar')
const {
  requestRandomFile,
  requestRandomFileWithSubfolderRightClick,
  requestRandomFileWithSubfolderRightClickSequential,
} = require('./random-file')
const { slowScrollInit } = require('./slow-scroll')
const { sortLines } = require('./sort-lines')
const { highlightOnCopy } = require('./highlight-on-copy')
const { setColorTheme } = require('./set-color-theme')
const { configAnt } = require('./ants/config')
const { symbolsList } = require('./symbols/symbols');
const { copyLineRange } = require('./copy-line-range');

function openInVsCode(data, { isInsiders }) {
  const binary = isInsiders ? 'code-insiders' : 'code'
  const terminal = vscode.window.createTerminal({ name: 'New vscode' })
  terminal.hide()
  terminal.sendText(`${binary} '${data.fsPath}'`)
  setTimeout(() => {
    terminal.dispose()
  }, 4000)
}

function activate(context) {
  vscode.commands.executeCommand('setContext', 'magicBeans.init', true)
  const SLOW_SCROLL_SHOW_BAR_INITIALLY_VALUE = configAnt(
    SLOW_SCROLL_SHOW_BAR_INITIALLY,
  )

  initStatusBars()

  // Check/change theme when the VS Code window regains focus
  context.subscriptions.push(
    vscode.window.onDidChangeWindowState(windowState => {
      if (windowState.focused) {
        setColorTheme()
      }
    }),
  )

  const symbolsListCommand = vscode.commands.registerCommand(
    'magicBeans.symbolsList',
    data => {
      symbolsList(data.path)
    },
  )
  const formatJsonCommand = vscode.commands.registerCommand(
    'magicBeans.formatJson',
    formatJson,
  )
  const copyTrimmedCommand = vscode.commands.registerCommand(
    'magicBeans.copyTrimmed',
    copyTrimmed,
  )
  const copyLineRangeCommand = vscode.commands.registerCommand(
    'magicBeans.copyLineRange',
    copyLineRange,
  )
  const highlightOnCopyCommand = vscode.commands.registerCommand(
    'magicBeans.highlightOnCopyRun',
    highlightOnCopy,
  )
  const slowScrollInitCommand = vscode.commands.registerCommand(
    SLOW_SCROLL_INIT,
    slowScrollInit(context),
  )
  const requestRandomFileCommand = vscode.commands.registerCommand(
    REQUEST_RANDOM_FILE,
    requestRandomFile(context),
  )
  const sortLinesCommand = vscode.commands.registerCommand(SORT_LINES, sortLines)

  context.subscriptions.push(copyTrimmedCommand)
  context.subscriptions.push(copyLineRangeCommand)
  context.subscriptions.push(formatJsonCommand)
  context.subscriptions.push(highlightOnCopyCommand)
  context.subscriptions.push(requestRandomFileCommand)
  context.subscriptions.push(slowScrollInitCommand)
  context.subscriptions.push(sortLinesCommand)
  context.subscriptions.push(symbolsListCommand)

  const openFolder = vscode.commands.registerCommand(
    'magicBeans.openFolder',
    data => {
      openInVsCode(data, { isInsiders: false })
    },
  )

  const randomFilesWithinFolder = vscode.commands.registerCommand(
    'magicBeans.requestRandomFileWithSubfolderRightClick',
    data => {
      requestRandomFileWithSubfolderRightClick(data, context)
    },
  )
  const randomFilesWithinFolderSequential = vscode.commands.registerCommand(
    'magicBeans.requestRandomFileWithSubfolderRightClickSequential',
    data => {
      requestRandomFileWithSubfolderRightClickSequential(data, context)
    },
  )

  context.subscriptions.push(openFolder)
  context.subscriptions.push(randomFilesWithinFolder)
  context.subscriptions.push(randomFilesWithinFolderSequential)

  if (SLOW_SCROLL_SHOW_BAR_INITIALLY_VALUE) {
    vscode.commands.executeCommand(SLOW_SCROLL_INIT)
  }
}

function deactivate() {
  vscode.commands.executeCommand('setContext', 'magicBeans.init', false)
}

exports.activate = activate
exports.deactivate = deactivate
