const { copySync, writeJsonSync } = require('fs-extra')
const { defaultTo, execSafe } = require('helpers-fn')
const { resolve } = require('node:path')
const { toDecimal, sortObject } = require('rambdax')

const settings = require('../.vscode/settings-source')
const {
  JS_SNIPPETS,
  JSX_SNIPPETS,
  KEYBINDING,
  SETTINGS,
  TS_SNIPPETS,
  TSX_SNIPPETS,
  editorExists,
} = require('./constants.js')
const { getChangeThemeTimes } = require('./get-change-theme-times.js')

const VSCODE_INSIDERS = process.env.BETA === 'ON'
let IS_CURSOR = process.env.CURSOR === 'ON'
const FOLDING_IMPORTS = VSCODE_INSIDERS

const WRITE_TO_OUTPUT = process.env.WRITE_TO_OUTPUT !== 'OFF'

const FONT_SIZE = 15
const SUGGEST_LINE_HEIGHT = 14
const SUGGEST_FONT_SIZE = 14
const FILE_ICON_THEME = 'bearded-icons'

const MODES = { big: 1.2, normal: 1, small: 0.9 }

const MODE_KEY = defaultTo('MODE', 'normal', 'default')
const MODE = MODES[MODE_KEY]

const KEYBINDING_SOURCE = resolve(__dirname, '../.vscode/keybindings.json')
const SNIPPETS_SOURCE = resolve(__dirname, '../.vscode/snippets.json')
const FONT = 'Space Mono' //  Fira Code 'JetBrains Mono' Space Mono Geist

void (async function sync() {
  if (!editorExists && WRITE_TO_OUTPUT) {
    return console.log('editor not found')
  }
  await execSafe({
    command: 'node visualize-keybindings.js',
    cwd: resolve(__dirname, '..'),
  })
  syncFiles(KEYBINDING_SOURCE, KEYBINDING)
  syncSnippets()
  await syncSettings()
})()

const GOTO_LOCATION = 'goto' // goto | peek
function getEditor() {
  return {
    'editor.snippets.codeActions.enabled': false,
    'editor.inlineSuggest.suppressSuggestions': true,
    'editor.inlineSuggest.syntaxHighlightingEnabled': true,
    'editor.acceptSuggestionOnCommitCharacter': false,
    'editor.acceptSuggestionOnEnter': 'smart',
    'editor.autoClosingDelete': 'always',
    'editor.bracketPairColorization.enabled': false,
    'editor.codeLens': true,
    'editor.codeLensFontSize': 0,
    'editor.colorDecorators': true,
    'editor.colorDecoratorsLimit': 10,
    'editor.copyWithSyntaxHighlighting': false,
    'editor.cursorBlinking': 'smooth',
    'editor.cursorSmoothCaretAnimation': 'on',
    'editor.cursorStyle': 'line-thin', // line-thin | line | block | underline | underline-thin
    'editor.definitionLinkOpensInPeek': false,
    'editor.detectIndentation': false,
    'editor.dragAndDrop': false,
    'editor.folding': true,
    'editor.foldingHighlight': true,
    'editor.foldingImportsByDefault': FOLDING_IMPORTS,
    'editor.gotoLocation.multipleDeclarations': GOTO_LOCATION, // by default all were `peek`
    'editor.gotoLocation.multipleDefinitions': GOTO_LOCATION,
    'editor.gotoLocation.multipleImplementations': GOTO_LOCATION,
    'editor.gotoLocation.multipleReferences': GOTO_LOCATION,
    'editor.gotoLocation.multipleTypeDefinitions': GOTO_LOCATION,
    'editor.guides.bracketPairs': 'active',
    'editor.guides.bracketPairsHorizontal': false,
    'editor.guides.highlightActiveBracketPair': true,
    'editor.guides.highlightActiveIndentation': true,
    'editor.guides.indentation': true,
    'editor.hover.delay': 1000,
    'editor.hover.enabled': true,
    'editor.hover.sticky': true,
    'editor.inlayHints.enabled': 'off',
    'editor.inlayHints.padding': false,
    'editor.insertSpaces': false,
    'editor.lightbulb.enabled': 'on',
    'editor.lineNumbers': 'interval',
    'editor.linkedEditing': true,
    'editor.links': true,
    'editor.matchBrackets': 'always',
    'editor.minimap.enabled': false,
    'editor.mouseWheelZoom': false,
    'editor.multiCursorModifier': 'ctrlCmd',
    'editor.occurrencesHighlight': 'multiline',
    'editor.occurrencesHighlightDelay': 1000,
    'editor.parameterHints.enabled': false,
    'editor.pasteAs.showPasteSelector': 'never',
    'editor.renderLineHighlight': 'gutter',
    'editor.renderWhitespace': 'none',
    'editor.roundedSelection': false,
    'editor.scrollBeyondLastLine': false,
    'editor.scrollbar.verticalScrollbarSize': 15,
    'editor.semanticHighlighting.enabled': true,
    'editor.semanticTokenColorCustomizations': { enabled: true },
    'editor.smoothScrolling': true,
    'editor.stickyScroll.defaultModel': 'indentationModel',
    'editor.stickyScroll.enabled': true,
    'editor.suggest.localityBonus': false,
    'editor.suggest.selectionMode': 'whenTriggerCharacter',
    'editor.suggest.showStatusBar': false,
    'editor.suggest.showWords': false,
    'editor.suggest.snippetsPreventQuickSuggestions': false,
    'editor.suggestOnTriggerCharacters': false,
    'editor.tabSize': 2,
    'editor.wordBasedSuggestions': false,
    'editor.wordWrap': 'on',
    'editor.find.autoFindInSelection': 'multiline',
    'editor.quickSuggestions': {
      comments: 'off',
      other: 'off',
      // because of tailwind this needs to be on
      strings: 'off',
    },
  }
}

function getWorkbench() {
  return {
	"workbench.secondarySideBar.defaultVisibility": "hidden",
    'workbench.activityBar.location': 'top',
    'workbench.editor.decorations.colors': false,
    'workbench.editor.dragToOpenWindow': false,
    'workbench.editor.empty.hint': 'hidden',
    'workbench.editor.enablePreview': VSCODE_INSIDERS,
    'workbench.editor.enablePreviewFromQuickOpen': true,
    'workbench.editor.focusRecentEditorAfterClose': false,
    'workbench.editor.pinnedTabSizing': 'normal', // shrink | normal
    'workbench.editor.pinnedTabsOnSeparateRow': true,
    'workbench.editor.revealIfOpen': false,
    'workbench.editor.showTabs': 'multiple',
    'workbench.editor.tabSizing': 'fit',
    'workbench.editor.untitled.labelFormat': 'name',
    'workbench.editor.wrapTabs': true,
    'workbench.iconTheme': FILE_ICON_THEME,
    'workbench.layoutControl.enabled': false,
    'workbench.layoutControl.type': 'menu',
    'workbench.list.smoothScrolling': true,
    'workbench.panel.opensMaximized': 'never',
    'workbench.panel.showLabels': true,
    'workbench.sideBar.location': 'right',
    'workbench.startupEditor': 'none',
    'workbench.tips.enabled': false,
    'workbench.tree.enableStickyScroll': true,
    'workbench.tree.indent': 16,
    'workbench.tree.renderIndentGuides': 'none',
    'workbench.tree.stickyScrollMaxItemCount': 8,
    'workbench.editor.languageDetectionHints': {
      notebookEditors: false,
      untitledEditors: false,
    },
  }
}

function getSearch() {
  return {
    'search.collapseResults': 'alwaysExpand', // alwaysExpand | alwaysCollapse
    'search.decorations.badges': false,
    'search.followSymlinks': true,
    'search.quickAccess.preserveInput': false,
    'search.quickOpen.includeHistory': true,
    'search.quickOpen.includeSymbols': false,
    'search.searchEditor.defaultNumberOfContextLines': 5,
    'search.searchEditor.doubleClickBehaviour': 'goToLocation',
    'search.searchEditor.focusResultsOnSearch': true,
    'search.searchEditor.reusePriorSearchConfiguration': true,
    'search.seedOnFocus': true,
    'search.seedWithNearestWord': false,
    'search.showLineNumbers': true,
    'search.smartCase': true,
    'search.searchOnType': true,
	"search.searchOnTypeDebouncePeriod": 500,
    'search.sortOrder': 'fileNames',
    'search.useGlobalIgnoreFiles': true,
    'search.useParentIgnoreFiles': true,
    'search.useReplacePreview': false,
  }
}

function getExplorer() {
  return {
    // 'explorer.sortOrder': 'type',
    'explorer.autoReveal': true,
    'explorer.compactFolders': false,
    'explorer.confirmDelete': false,
    'explorer.confirmDragAndDrop': false,
    'explorer.incrementalNaming': 'smart',
    'explorer.openEditors.sortOrder': 'alphabetical',
  }
}

function getGit() {
  return {
    'git.allowNoVerifyCommit': true,
    'git.confirmEmptyCommits': true,
    'git.confirmForcePush': true,
    'git.confirmNoVerifyCommit': true,
    'git.confirmSync': false,
    'git.fetchOnPull': true,
    'git.promptToSaveFilesBeforeCommit': 'never',
  }
}

// 'debug.terminal.clearBeforeReusing': true, // to test because of ubuntu issue
function getStableSettings(THEME_CHANGE_DAYTIME) {
  return {
		'niketa.PERSIST_LINT_TERMINAL': true,
    'window.controlsStyle': 'custom', // native
    'github.copilot.chat.agent.thinkingTool': true,
    'chat.agent.enabled': true,
    'breadcrumbs.enabled': true,
    'breadcrumbs.filePath': 'last',
    'breadcrumbs.icons': true,
    'breadcrumbs.symbolSortOrder': 'position',
    'chat.editor.wordWrap': 'on', // to fix not working word wrap
    'debug.inlineValues': 'off',
    'debug.javascript.codelens.npmScripts': 'never',
    'debug.toolBarLocation': 'docked',
    'diffEditor.diffAlgorithm': 'advanced',
    'editor.scrollbar.vertical': 'visible',
    'files.enableTrash': false,
    'javascript.preferences.importModuleSpecifier': 'relative',
    'javascript.suggest.autoImports': true,
    'javascript.suggest.includeAutomaticOptionalChainCompletions': true, // to test prefered local imports
    'magicBeans.ALLOW_CHANGE_COLOR_THEME': true,
    'magicBeans.IS_VSCODE_INSIDERS': VSCODE_INSIDERS,
    'magicBeans.IS_CURSOR': IS_CURSOR,
    'magicBeans.THEME_CHANGE_DAYTIME': THEME_CHANGE_DAYTIME,

    'npm.scriptHover': false,
    'security.workspace.trust.enabled': false, // 'outline.collapseItems': 'alwaysExpand', // alwaysCollapse | alwaysExpand | siblings | none
    'task.problemMatchers.neverPrompt': { shell: true },
    'terminal.integrated.copyOnSelection': true,
    'terminal.integrated.gpuAcceleration': 'on',
    'terminal.integrated.mouseWheelZoom': true,
    'typescript.preferences.importModuleSpecifier': 'relative',
    'typescript.suggest.autoImports': true,
    'typescript.suggest.includeAutomaticOptionalChainCompletions': true,
    'typescript.tsserver.experimental.enableProjectDiagnostics': true, // to test
    'window.autoDetectColorScheme': false,
    'window.customTitleBarVisibility': 'windowed',
    'window.density.editorTabHeight': 'compact',
    'window.doubleClickIconToClose': true,
    'window.menuBarVisibility': 'compact',
    'files.exclude': {
      '.cache': true,
      '**/.awcache': true,
      '**/.cache-loader': true,
      '**/.DS_Store': false,
      '**/.git': true,
      '**/.hg': false,
      '**/.idea': true,
      '**/.svn': false,
      '**/coverage': true,
      '**/coverage-ts': true,
      '**/CVS': false,
      '**/node_modules': true,
      '**/yarn-error.log': true,
      dev_dist: true,
      dist: false,
      docs: false,
      'yarn.lock': true,
    },
    'files.hotExit': 'off',
    'git.autofetch': true,
    'git.openRepositoryInParentFolders': 'always',
    'javascript.inlayHints.functionLikeReturnTypes.enabled': false,
    'javascript.inlayHints.parameterTypes.enabled': false,
    'javascript.inlayHints.propertyDeclarationTypes.enabled': false,
    'javascript.inlayHints.variableTypes.enabled': false,
    'javascript.updateImportsOnFileMove.enabled': 'always',
    'js/ts.implicitProjectConfig.checkJs': true,
    'json.format.enable': false,
    'json.maxItemsComputed': 1000,
    'npm.autoDetect': 'off',
    'npm.fetchOnlinePackageInfo': false,
    'npm.packageManager': 'yarn',
    'scm.defaultViewMode': 'tree',
    'task.autoDetect': 'off',
    'task.quickOpen.detail': true,
    'telemetry.telemetryLevel': 'off',
    'typescript.inlayHints.functionLikeReturnTypes.enabled': false,
    'typescript.inlayHints.parameterTypes.enabled': false,
    'typescript.inlayHints.variableTypes.enabled': false,
    'typescript.updateImportsOnFileMove.enabled': 'always',
    'update.mode': 'none',
    'window.commandCenter': false, // click to go to recent files
    'window.title': '${dirty}${activeEditorMedium}',
    'window.titleBarStyle': 'custom',
    'zenMode.restore': false,
  }
}

function syncFiles(source, destination) {
  copySync(source, destination)
}

function getCalculatedOptions() {
  const fontSize = toDecimal(FONT_SIZE * MODE)
  const windowZoom = 1
  // const windowZoom = toDecimal(MODE * 1.15)
  const suggestFontSize = Math.round(toDecimal(SUGGEST_FONT_SIZE * MODE, 2))
  const suggestLineHeight = Math.round(toDecimal(SUGGEST_LINE_HEIGHT * MODE))
  const terminalFontSize = Math.round(toDecimal(FONT_SIZE * 0.85))
  const fontSettings = {
    'debug.console.fontFamily': FONT,
    'editor.fontFamily': FONT,
    'editor.fontLigatures': true,
    'terminal.integrated.fontFamily': FONT,
  }

  return {
    ...fontSettings,
    'editor.fontSize': fontSize,
    'editor.lineHeight': 0,
    'editor.suggestFontSize': suggestFontSize,
    'editor.suggestLineHeight': suggestLineHeight,
    'terminal.integrated.fontSize': terminalFontSize,
    'window.zoomLevel': windowZoom,
  }
}

function syncFn(newOptions) {
  if (WRITE_TO_OUTPUT) {
    writeJsonSync(SETTINGS, newOptions, { spaces: 2 })
  } else {
    const output = resolve(__dirname, '../settings.json')
    writeJsonSync(output, newOptions, { spaces: 2 })
  }
}

function sortFn(aKey, bKey) {
  return aKey.localeCompare(bKey)
}
function mergeWithReport(inputs) {
  const report = []
  const result = {}
  inputs.forEach(input => {
    Object.keys(input).forEach(key => {
      if (result[key] !== undefined) {
        report.push({ key, value: input[key] })
      }
      result[key] = input[key]
    })
  })

  return { result, report }
}
async function syncSettings() {
  const changeTimeOfTheme = await getChangeThemeTimes()
  const { result: newOptions, report } = mergeWithReport([
    settings,
    getEditor(),
    getExplorer(),
    getGit(),
    getWorkbench(),
    getSearch(),
    getCalculatedOptions(),
    getStableSettings(changeTimeOfTheme),
    getCopilotSettings(),
  ])
  const sorted = sortObject(sortFn, newOptions)

  if (report.length > 0) {
    console.log(report, 'merge report')
  }

  syncFn(sorted)
}

function syncSnippets() {
  syncFiles(SNIPPETS_SOURCE, JS_SNIPPETS)
  syncFiles(SNIPPETS_SOURCE, JSX_SNIPPETS)
  syncFiles(SNIPPETS_SOURCE, TS_SNIPPETS)
  syncFiles(SNIPPETS_SOURCE, TSX_SNIPPETS)
}

function getCopilotSettings() {
  return {
		"cursor.composer.cmdPFilePicker2": true,
    'github.copilot.nextEditSuggestions.enabled': true,
    'github.copilot.nextEditSuggestions.fixes': true,
    'github.copilot.chat.editor.temporalContext.enabled': true,
    'github.copilot.chat.edits.temporalContext.enabled': true,
    'github.copilot.chat.newWorkspaceCreation.enabled': false,
    'github.copilot.chat.setupTests.enabled': false,
    'github.copilot.enable': {
      '*': true,
      markdown: true,
      plaintext: true,
      yaml: true,
    },
    'github.copilot.renameSuggestions.triggerAutomatically': false,
    'github.copilot.advanced': {
      autoComplete: true,
      codeLens: true,
      diagnostics: false,
      format: false,
      generateTests: false,
      hover: false,
      semanticTokens: true,
      signatureHelp: true,
      smartSelection: true,
    },
    'github.copilot.chat.followUps': 'always',
    'github.copilot.chat.generateTests.codeLens': false,
    'github.copilot.chat.startDebugging.enabled': false,
    'github.copilot.chat.scopeSelection': false,
    'github.copilot.chat.search.semanticTextResults': false,
  }
}
