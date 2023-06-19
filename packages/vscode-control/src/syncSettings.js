import { copySync, writeJsonSync } from 'fs-extra'
import { defaultTo, execSafe } from 'helpers-fn'
import { resolve } from 'path'
import { toDecimal } from 'rambdax'

import settings from '../.vscode/settings-source'
import {
  JS_SNIPPETS,
  KEYBINDING,
  SETTINGS,
  TS_SNIPPETS,
  TSX_SNIPPETS,
} from './constants.js'

const VSCODE_INSIDERS = process.env.BETA === 'ON'
const FONT_SIZE = 20
const SUGGEST_LINE_HEIGHT = 18
const SUGGEST_FONT_SIZE = 17
const LINE_HEIGHT = 27
const THEME = defaultTo(
  'THEME', 'LedZeppelin', 'default'
)
const FILE_ICON_THEME = defaultTo(
  'FILE_ICON_THEME',
  'catppuccin-latte',
  'default'
)

const MODES = {
  small  : 0.7,
  normal : 0.8,
  large  : 1.2,
}

const MODE_KEY = defaultTo(
  'MODE', 'normal', 'default'
)
const MODE = MODES[ MODE_KEY ]

const KEYBINDING_SOURCE = resolve(__dirname, '../.vscode/keybindings.json')
const SNIPPETS_SOURCE = resolve(__dirname, '../.vscode/snippets.json')
const SETTINGS_REFERENCE_OUTPUT = resolve(__dirname,
  '../.vscode/settings.json')

const FONT = VSCODE_INSIDERS ? 'JetBrains Mono' : 'Operator Mono'
const FONT_FACTOR = 1

void (async function sync(){
  console.log('START')
  await execSafe({
    cwd     : resolve(__dirname, '..'),
    command : 'node visualize-keybindings.js',
  })
  syncFiles(KEYBINDING_SOURCE, KEYBINDING)
  syncSnippets()
  syncSettings()
  console.log('END')
})()

function getPermanentSettings(){
  return {
    ...getNewSettings(),
    ...getEditor(),
    ...getSpellingSettings(),
    ...getExplorer(),
    ...getGit(),
    ...getWorkbench(),
    ...getAdditionalSettings(),
    ...getImportantSettings(),
    ...testNewSettings(),
  }
}

function getNewSettings(){
  return {
    'workbench.editor.tabSizing'                     : 'fixed',
    'workbench.editor.tabSizingFixedMaxWidth'        : 150,
    'editor.suggest.snippetsPreventQuickSuggestions' : false,
    'editor.pasteAs.showPasteSelector'               : 'never',
    'editor.linkedEditing'                           : true,
    'chat.experimental.quickQuestion.enable'         : true,
  }
}

function testNewSettings(){
  return {
    // to fix not working word wrap
    'chat.editor.wordWrap'                                        : 'on',
    'editor.wordWrapColumn'                                       : 70,
    'editor.wrappingStrategy'                                     : 'advanced',
    // in order to test the new settings
    'workbench.editor.wrapTabs'                                   : true,
    // by default all were `peek`
    'editor.gotoLocation.multipleDeclarations'                    : 'goto',
    'editor.gotoLocation.multipleDefinitions'                     : 'goto',
    'editor.gotoLocation.multipleImplementations'                 : 'goto',
    'editor.gotoLocation.multipleReferences'                      : 'goto',
    'editor.gotoLocation.multipleTypeDefinitions'                 : 'goto',
    // to test prefered local imports
    'javascript.suggest.includeAutomaticOptionalChainCompletions' : false,
    'javascript.suggest.autoImports'                              : false,
    'javascript.preferences.importModuleSpecifier'                : 'relative',
    'typescript.suggest.autoImports'                              : false,
    'typescript.suggest.includeAutomaticOptionalChainCompletions' : false,
    'typescript.preferences.importModuleSpecifier'                : 'relative',
  }
}

function getEditor(){
  return {
    'editor.stickyScroll.defaultModel'         : 'indentationModel',
    'editor.stickyScroll.enabled'              : true,
    'editor.hover.sticky'                      : true,
    'editor.hover.enabled'                     : true,
    'editor.hover.delay'                       : 400,
    'editor.scrollBeyondLastLine'              : false,
    'editor.cursorSmoothCaretAnimation'        : 'on',
    'editor.cursorStyle'                       : 'line-thin',
    'editor.fontLigatures'                     : true,
    'editor.guides.bracketPairsHorizontal'     : false,
    'editor.guides.highlightActiveIndentation' : false,
    'editor.lineNumbers'                       : 'interval',
    'editor.minimap.enabled'                   : false,
    'editor.mouseWheelZoom'                    : true,
    'editor.multiCursorModifier'               : 'ctrlCmd',
    'editor.parameterHints.enabled'            : false,
    'editor.scrollbar.verticalScrollbarSize'   : 15,
    'editor.semanticHighlighting.enabled'      : true,
    'editor.semanticTokenColorCustomizations'  : { enabled : true },
    'editor.smoothScrolling'                   : true,
    'editor.tabSize'                           : 2,
    'editor.wordWrap'                          : 'on',
    'editor.codeActionsOnSave'                 : {
      'source.fixAll'          : false,
      'source.organizeImports' : false,
    },
    'editor.suggest.showWords'     : false,
    'editor.suggest.localityBonus' : true,
    'editor.quickSuggestions'      : {
      comments : 'off',
      strings  : 'off',
      other    : 'off',
    },
  }
}

function getWorkbench(){
  return {
    'typescript.tsserver.experimental.enableProjectDiagnostics' : true, // to test
    'editor.suggest.showStatusBar'                              : true, // to test
    'workbench.iconTheme'                                       : FILE_ICON_THEME,
    'workbench.editor.pinnedTabSizing'                          : 'shrink',
    'workbench.activityBar.visible'                             : false,
    'workbench.editor.untitled.hint'                            : 'hidden',
    'workbench.editor.untitled.labelFormat'                     : 'name',
    'workbench.list.smoothScrolling'                            : true,
    'workbench.sideBar.location'                                : 'right',
    'workbench.startupEditor'                                   : 'none',
    'workbench.editor.languageDetectionHints'                   : {
      untitledEditors : false,
      notebookEditors : false,
    },
  }
}

function getExplorer(){
  return {
    'explorer.confirmDelete'         : false,
    'explorer.confirmDragAndDrop'    : false,
    'explorer.incrementalNaming'     : 'smart',
    'explorer.sortOrder'             : 'default',
    'explorer.openEditors.sortOrder' : 'alphabetical',
  }
}

function getGit(){
  return {
    'git.confirmEmptyCommits'           : true,
    'git.confirmForcePush'              : true,
    'git.confirmNoVerifyCommit'         : true,
    'git.confirmSync'                   : false,
    'git.promptToSaveFilesBeforeCommit' : 'never',
    'git.allowNoVerifyCommit'           : true,
    'git.fetchOnPull'                   : true,
  }
}

function getImportantSettings(){
  return {
    'gitlab.customQueries' : [
      {
        name       : 'All project merge requests',
        type       : 'merge_requests',
        scope      : 'all',
        state      : 'opened',
        noItemText : 'The project has no merge requests',
      },
    ],
  }
}

function getAdditionalSettings(){
  return {
    // 'editor.autoClosingBrackets'                             : 'never',
    // 'editor.autoClosingDelete'                               : 'never',
    // 'editor.autoClosingOvertype'                             : 'never',
    // 'editor.autoClosingQuotes'                               : 'never',
    'window.menuBarVisibility'                               : 'toggle',
    'editor.tabCompletion'                                   : 'on',
    'zenMode.hideTabs'                                       : false,
    'gitlab.showProjectMergeRequests'                        : false,
    'editor.colorDecoratorsLimit'                            : 10,
    'editor.scrollbar.vertical'                              : 'visible',
    'git.openRepositoryInParentFolders'                      : 'always',
    'javascript.inlayHints.enumMemberValues.enabled'         : false,
    'javascript.inlayHints.functionLikeReturnTypes.enabled'  : false,
    'javascript.inlayHints.parameterTypes.enabled'           : false,
    'javascript.inlayHints.propertyDeclarationTypes.enabled' : false,
    'javascript.inlayHints.variableTypes.enabled'            : false,
    'typescript.inlayHints.enumMemberValues.enabled'         : false,
    'typescript.inlayHints.functionLikeReturnTypes.enabled'  : false,
    'typescript.inlayHints.parameterTypes.enabled'           : false,
    'typescript.inlayHints.variableTypes.enabled'            : false,
    // click to go to recent files
    'window.commandCenter'                                   : false,
    'window.titleBarStyle'                                   : 'custom',
    'window.title'                                           : '${dirty}${activeEditorMedium}',
    // without comments
    'breadcrumbs.enabled'                                    : false,
    'debug.inlineValues'                                     : 'off',
    'debug.javascript.usePreview'                            : true,
    'files.enableTrash'                                      : false,
    'files.hotExit'                                          : 'off',
    'git.autofetch'                                          : true,
    'javascript.updateImportsOnFileMove.enabled'             : 'always',
    'js/ts.implicitProjectConfig.checkJs'                    : true,
    'json.format.enable'                                     : false,
    'json.maxItemsComputed'                                  : 1000,
    'npm.autoDetect'                                         : 'off',
    'npm.packageManager'                                     : 'yarn',
    // as it doesn't work; maybe due to Copilot interfering
    'npm.fetchOnlinePackageInfo'                             : false,
    'scm.defaultViewMode'                                    : 'tree',
    'search.collapseResults'                                 : 'alwaysCollapse',
    'search.seedOnFocus'                                     : false,
    'search.smartCase'                                       : true,
    'search.useReplacePreview'                               : false,
    'task.autoDetect'                                        : 'off',
    'task.quickOpen.detail'                                  : false,
    'telemetry.enableTelemetry'                              : false,
    'telemetry.telemetryLevel'                               : 'off',
    'terminal.integrated.gpuAcceleration'                    : 'off',
    'typescript.updateImportsOnFileMove.enabled'             : 'always',
    'update.mode'                                            : 'none',
    'zenMode.restore'                                        : false,
    'diffEditor.diffAlgorithm'                               : 'advanced',
    'github.copilot.enable'                                  : {
      '*'         : true,
      'yaml'      : true,
      'plaintext' : true,
      'markdown'  : true,
    },
    'magicBeans.RANDOM_FILE_ALLOWED_EXTENSIONS' : [
      '.html',
      '.yml',
      '.js',
      '.jsx',
      '.tsx',
      '.css',
      '.scss',
      '.py',
      '.go',
      '.ts',
      '.rs',
      '.feature',
    ],
    'go.gopath'         : '/Users/user/.local/share/rtx/installs/golang/1.20/go/bin',
    'go.alternateTools' : { go : '/Users/user/.local/share/rtx/installs/golang/1.20/go/bin' },
    'files.exclude'     : {
      '.cache'            : true,
      '**/.awcache'       : true,
      '**/.cache-loader'  : true,
      '**/.DS_Store'      : false,
      '**/.git'           : true,
      '**/.idea'          : true,
      '**/.hg'            : false,
      '**/.svn'           : false,
      '**/coverage'       : true,
      '**/coverage-ts'    : true,
      '**/CVS'            : false,
      '**/node_modules'   : true,
      '**/yarn-error.log' : true,
      'dev_dist'          : true,
      'dist'              : false,
      'docs'              : false,
      'yarn.lock'         : true,
    },
  }
}

function getSpellingSettings(){
  return {
    'cSpell.allowCompoundWords'  : false,
    'cSpell.maxNumberOfProblems' : 3,
    'cSpell.minWordLength'       : 4,
    'cSpell.numSuggestions'      : 3,
    'cSpell.showStatus'          : false,
    'cSpell.spellCheckDelayMs'   : 200,
    'cSpell.ignorePaths'         : [
      'node_modules', // this will ignore anything the node_modules directory
      '.git', // Ignore the .git directory
      'countries.json',
      'languages.json',
      'introspections.json',
    ],
  }
}

function syncFiles(source, destination){
  copySync(source, destination)
}

function getCalculatedOptions(){
  const SCALE_FACTOR = toDecimal(FONT_FACTOR * MODE, 2)
  const fontSize = toDecimal(FONT_SIZE * SCALE_FACTOR)
  const lineHeight = toDecimal(LINE_HEIGHT * SCALE_FACTOR, 2)
  const suggestFontSize = Math.round(toDecimal(SUGGEST_FONT_SIZE * SCALE_FACTOR, 2))
  const suggestLineHeight = Math.round(toDecimal(SUGGEST_LINE_HEIGHT * SCALE_FACTOR))
  const terminalFontSize = Math.round(toDecimal(FONT_SIZE * (SCALE_FACTOR * 0.65)))

  const fontSettings = {
    'terminal.integrated.fontFamily' : FONT,
    'debug.console.fontFamily'       : FONT,
    'editor.fontFamily'              : FONT,
    'editor.fontLigatures'           : true,
  }

  return {
    ...fontSettings,
    'editor.fontSize'              : fontSize,
    'window.zoomLevel'             : 2,
    'editor.lineHeight'            : lineHeight,
    'editor.suggestFontSize'       : suggestFontSize,
    'editor.suggestLineHeight'     : suggestLineHeight,
    'terminal.integrated.fontSize' : terminalFontSize,
  }
}

function syncSettings(){
  const newOptions = {
    ...settings,
    ...getPermanentSettings(),
    ...getCalculatedOptions(),
    'magicBeans.IS_VSCODE_INSIDERS'  : VSCODE_INSIDERS,
    'workbench.editor.enablePreview' : !VSCODE_INSIDERS,
    'workbench.colorTheme'           : THEME,
  }

  writeJsonSync(
    SETTINGS, newOptions, { spaces : 2 }
  )
  writeJsonSync(
    SETTINGS_REFERENCE_OUTPUT, newOptions, { spaces : 2 }
  )
}

function syncSnippets(){
  syncFiles(SNIPPETS_SOURCE, JS_SNIPPETS)
  syncFiles(SNIPPETS_SOURCE, TS_SNIPPETS)
  syncFiles(SNIPPETS_SOURCE, TSX_SNIPPETS)
}
