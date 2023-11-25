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

const ALTERNATIVE_BACKGROUNDS = process.env.ALTERNATIVE_BACKGROUNDS !== 'ON'
const VSCODE_INSIDERS = process.env.BETA === 'ON'
const READ_MODE = process.env.READ === 'ON'
const FONT_SIZE = 18
const SUGGEST_LINE_HEIGHT = 16
const SUGGEST_FONT_SIZE = 15
const LINE_HEIGHT = 24
const THEME = defaultTo(
  'THEME', '', 'default'
)
const FILE_ICON_THEME = defaultTo(
  'FILE_ICON_THEME',
  'emoji-file-icons',
  'default'
)

const MODES = {
  bigger    : 1.1,
  big    : 0.94,
  normal : 0.77,
  small  : 0.65,
}

const MODE_KEY = defaultTo(
  'MODE', 'normal', 'default'
)

const LIGHT_THEMES = [
  'CommunicationBreakdown',
  'FunkyDrummer',
  'KozmicBlues',
  'GlassOnion',
  'HelloSpaceboy',
  'StrangeBrew',
  'SweatLeaf',
  'LedZeppelin',
  'DancingDays',
]

const DARK_THEMES = [
  'AmericanDad',
  'AquaTeenHungerForce',
  'Archer',
  'ClevelandShow',
  'Dilbert',
  'HomeMovies',
  'SouthPark',
  'TripTank',
  'UglyAmericans',
]

const ALTERNATIVE_DARK_BACKGROUND = '#212e38'
// const ALTERNATIVE_LIGHT_BACKGROUND = '#f1f1f1'
const ALTERNATIVE_LIGHT_BACKGROUND = '#fff'

function getAlternativeBackground(){
  if (!ALTERNATIVE_BACKGROUNDS) return false

  const helper = (themes, background) =>
    themes.reduce((acc, theme) => {
      acc[ `[${ theme }]` ] = { 'editor.background' : background }

      return acc
    }, {})

  return {
    'workbench.colorCustomizations' : {
      ...helper(LIGHT_THEMES, ALTERNATIVE_LIGHT_BACKGROUND),
      ...helper(DARK_THEMES, ALTERNATIVE_DARK_BACKGROUND),
    },
  }
}

const MODE = MODES[ MODE_KEY ]

const KEYBINDING_SOURCE = resolve(__dirname, '../.vscode/keybindings.json')
const SNIPPETS_SOURCE = resolve(__dirname, '../.vscode/snippets.json')
const SETTINGS_REFERENCE_OUTPUT = resolve(__dirname,
  '../.vscode/settings.json')
const FONT = VSCODE_INSIDERS ? 'JetBrains Mono' : 'Fira Code'
const FONT_FACTOR = 1

void (async function sync(){
  await execSafe({
    command : 'node visualize-keybindings.js',
    cwd     : resolve(__dirname, '..'),
  })
  syncFiles(KEYBINDING_SOURCE, KEYBINDING)
  syncSnippets()
  syncSettings()
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
    '[javascript]'                                   : { 'editor.formatOnSave' : true },
    '[typescript]'                                   : { 'editor.formatOnSave' : true },
    'chat.experimental.quickQuestion.enable'         : true,
    'editor.foldingImportsByDefault'                 : true,
    'editor.formatOnSave'                            : false,
    'editor.hover.height'                            : 1200,
    'editor.linkedEditing'                           : true,
    'editor.pasteAs.showPasteSelector'               : 'never',
    'editor.suggest.snippetsPreventQuickSuggestions' : false,
    'window.density.editorTabHeight'                 : 'compact',
    'workbench.editor.tabSizing'                     : 'fit',
    'workbench.editor.wrapTabs'                      : true,
  }
}

/**
 * Keep latest changes with comments of change
 */
function testNewSettings(){
  return {
    // to fix not working word wrap
    'chat.editor.wordWrap'                                        : 'on',
    'editor.defaultFormatter'                                     : 'esbenp.prettier-vscode',
    // by default all were `peek`
    'editor.gotoLocation.multipleDeclarations'                    : 'goto',
    'editor.gotoLocation.multipleDefinitions'                     : 'goto',
    'editor.gotoLocation.multipleImplementations'                 : 'goto',
    'editor.gotoLocation.multipleReferences'                      : 'goto',
    'editor.gotoLocation.multipleTypeDefinitions'                 : 'goto',
    'editor.suggest.showStatusBar'                                : false, // to test
    'gopls'                                                       : { 'ui.semanticTokens' : true },
    'javascript.preferences.importModuleSpecifier'                : 'relative',
    'javascript.suggest.autoImports'                              : true,
    // to test prefered local imports
    'javascript.suggest.includeAutomaticOptionalChainCompletions' : true,
    'task.problemMatchers.neverPrompt'                            : { shell : true },
    'typescript.preferences.importModuleSpecifier'                : 'relative',
    'typescript.suggest.autoImports'                              : true,
    'typescript.suggest.includeAutomaticOptionalChainCompletions' : true,
    // 'editor.wordWrapColumn'                                       : 30,
    'typescript.tsserver.experimental.enableProjectDiagnostics'   : false, // to test
  }
}

function getEditor(){
  return {
    // 'editor.codeActionsOnSave' : {
    //   'source.fixAll'          : false,
    //   'source.organizeImports' : false,
    // },
    'editor.cursorSmoothCaretAnimation'        : 'on',
    'editor.cursorStyle'                       : 'line-thin',
    'editor.fontLigatures'                     : true,
    'editor.guides.bracketPairsHorizontal'     : false,
    'editor.guides.highlightActiveIndentation' : false,
    'editor.hover.delay'                       : 400,
    'editor.hover.enabled'                     : true,
    'editor.hover.sticky'                      : true,
    'editor.lineNumbers'                       : 'interval',
    'editor.minimap.enabled'                   : false,
    'editor.mouseWheelZoom'                    : true,
    'editor.multiCursorModifier'               : 'ctrlCmd',
    'editor.parameterHints.enabled'            : false,
    'editor.quickSuggestions'                  : {
      comments : 'off',
      other    : 'off',
      strings  : 'off',
    },
    'editor.scrollbar.verticalScrollbarSize'  : 15,
    'editor.scrollBeyondLastLine'             : false,
    'editor.semanticHighlighting.enabled'     : true,
    'editor.semanticTokenColorCustomizations' : { enabled : true },
    'editor.smoothScrolling'                  : true,
    'editor.stickyScroll.defaultModel'        : 'indentationModel',
    'editor.stickyScroll.enabled'             : true,
    'editor.suggest.localityBonus'            : true,
    'editor.suggest.showWords'                : false,
    'editor.tabSize'                          : 2,
    'editor.wordWrap'                         : 'on',
  }
}

function getWorkbench(){
  return {
    'workbench.activityBar.visible'           : !VSCODE_INSIDERS,
    'workbench.editor.languageDetectionHints' : {
      notebookEditors : false,
      untitledEditors : false,
    },
    'workbench.editor.pinnedTabSizing'      : 'shrink',
    'workbench.editor.untitled.hint'        : 'hidden',
    'workbench.editor.untitled.labelFormat' : 'name',
    'workbench.iconTheme'                   : FILE_ICON_THEME,
    'workbench.list.smoothScrolling'        : true,
    'workbench.sideBar.location'            : 'right',
    'workbench.startupEditor'               : 'none',
  }
}

function getExplorer(){
  return {
    'explorer.confirmDelete'         : false,
    'explorer.confirmDragAndDrop'    : false,
    'explorer.incrementalNaming'     : 'smart',
    'explorer.openEditors.sortOrder' : 'alphabetical',
    'explorer.sortOrder'             : 'default',
  }
}

function getGit(){
  return {
    'git.allowNoVerifyCommit'           : true,
    'git.confirmEmptyCommits'           : true,
    'git.confirmForcePush'              : true,
    'git.confirmNoVerifyCommit'         : true,
    'git.confirmSync'                   : false,
    'git.fetchOnPull'                   : true,
    'git.promptToSaveFilesBeforeCommit' : 'never',
  }
}

function getImportantSettings(){
  return {
    'gitlab.customQueries' : [
      {
        name       : 'Open MRs',
        noItemText : 'The project has no merge requests',
        scope      : 'all',
        state      : 'opened',
        type       : 'merge_requests',
      },
      {
        createdBefore : '2022-01-01',
        maxResults    : 60,
        name          : 'Closed MRs',
        noItemText    : 'The project has no merge requests',
        scope         : 'all',
        state         : 'merged',
        type          : 'merge_requests',
      },
    ],
  }
}

function getAdditionalSettings(){
  return {
    'breadcrumbs.enabled'         : false,
    'debug.inlineValues'          : 'off',
    'debug.javascript.usePreview' : true,
    'diffEditor.diffAlgorithm'    : 'advanced',
    'editor.colorDecoratorsLimit' : 10,
    'editor.scrollbar.vertical'   : 'visible',
    'files.enableTrash'           : false,
    'files.exclude'               : {
      '.cache'            : true,
      '**/.awcache'       : true,
      '**/.cache-loader'  : true,
      '**/.DS_Store'      : false,
      '**/.git'           : true,
      '**/.hg'            : false,
      '**/.idea'          : true,
      '**/.svn'           : false,
      '**/coverage-ts'    : true,
      '**/CVS'            : false,
      '**/node_modules'   : true,
      '**/yarn-error.log' : true,
      'dev_dist'          : true,
      'dist'              : false,
      'docs'              : false,
      'yarn.lock'         : true,
    },
    'files.hotExit'                     : 'off',
    'git.autofetch'                     : true,
    'git.openRepositoryInParentFolders' : 'always',
    'github.copilot.enable'             : {
      '*'         : true,
      'markdown'  : true,
      'plaintext' : true,
      'yaml'      : true,
    },
    'gitlab.showProjectMergeRequests'                        : false,
    'gopls'                                                  : { 'ui.semanticTokens' : true },
    'javascript.inlayHints.enumMemberValues.enabled'         : false,
    'javascript.inlayHints.functionLikeReturnTypes.enabled'  : false,
    'javascript.inlayHints.parameterTypes.enabled'           : false,
    'javascript.inlayHints.propertyDeclarationTypes.enabled' : false,
    'javascript.inlayHints.variableTypes.enabled'            : false,
    'javascript.updateImportsOnFileMove.enabled'             : 'always',
    'js/ts.implicitProjectConfig.checkJs'                    : true,
    'json.format.enable'                                     : false,
    'json.maxItemsComputed'                                  : 1000,
    'magicBeans.RANDOM_FILE_ALLOWED'              : [
      // '.css',
      // '.scss',
      '.feature',
      '.js',
      'README.md',
      'package.json',
      '.rs',
      '.vtl',
      '.ts',
      '.tsx',
    ],
    'magicBeans.RANDOM_FILE_FORBIDDEN' : [
      '__tests__',
      '.gitconfig',
      '.gitignore',
      '.pylintrc',
      '.spec.js',
      '.spec.ts',
      'index.tsx',
      'index.ts',
      'index.js',
      'config.js',
      'config.ts',
      '.spec.tsx',
      '.test.js',
      '.test.ts',
      '.test.tsx',
      '.story.tsx',
      '.stories.tsx',
      'Makefile',
      'package-lock.json',
      'pre-commit',
    ],
    'magicBeans.RANDOM_FILE_SKIP_DIRECTORIES' : [
      '__tests__',
      'test',
      'tests',
      'styles',
      'node_modules',
      'stories',
      'coverage',
      'vendor',
      'bin',
      'dist',
      'build',
      'lib',
      '.vscode',
      '.idea',
      '.git',
      '.cache',
    ],
    'npm.autoDetect'                                        : 'off',
    'npm.fetchOnlinePackageInfo'                            : false,
    'npm.packageManager'                                    : 'yarn',
    'scm.defaultViewMode'                                   : 'tree',
    'search.collapseResults'                                : 'alwaysCollapse',
    'search.seedOnFocus'                                    : false,
    'search.smartCase'                                      : true,
    'search.useReplacePreview'                              : false,
    'task.autoDetect'                                       : 'off',
    'task.quickOpen.detail'                                 : false,
    'telemetry.enableTelemetry'                             : false,
    'telemetry.telemetryLevel'                              : 'off',
    'terminal.integrated.gpuAcceleration'                   : 'off',
    'typescript.inlayHints.enumMemberValues.enabled'        : false,
    'typescript.inlayHints.functionLikeReturnTypes.enabled' : false,
    'typescript.inlayHints.parameterTypes.enabled'          : false,
    'typescript.inlayHints.variableTypes.enabled'           : false,
    'typescript.updateImportsOnFileMove.enabled'            : 'always',
    'update.mode'                                           : 'none',
    // click to go to recent files
    'window.commandCenter'                                  : false,
    'window.menuBarVisibility'                              : 'toggle',
    'window.title'                                          : '${dirty}${activeEditorMedium}',
    'window.titleBarStyle'                                  : 'custom',
    'zenMode.hideTabs'                                      : false,
    'zenMode.restore'                                       : false,
  }
}

function getSpellingSettings(){
  return {
    'cSpell.allowCompoundWords' : false,
    'cSpell.ignorePaths'        : [
      'node_modules',
      '.git',
      'countries.json',
      'languages.json',
      'introspections.json',
    ],
    'cSpell.maxNumberOfProblems' : 3,
    'cSpell.minWordLength'       : 4,
    'cSpell.numSuggestions'      : 3,
    'cSpell.showStatus'          : false,
    'cSpell.spellCheckDelayMs'   : 200,
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
    'debug.console.fontFamily'       : FONT,
    'editor.fontFamily'              : FONT,
    'editor.fontLigatures'           : true,
    'terminal.integrated.fontFamily' : FONT,
  }

  return {
    ...fontSettings,
    'editor.fontSize'              : fontSize,
    'editor.lineHeight'            : lineHeight,
    'editor.suggestFontSize'       : suggestFontSize,
    'editor.suggestLineHeight'     : suggestLineHeight,
    'terminal.integrated.fontSize' : terminalFontSize,
    'window.zoomLevel'             : 2,
  }
}

function syncFn (newOptions){
  writeJsonSync(
    SETTINGS, newOptions, { spaces : 2 }
  )
  writeJsonSync(
    SETTINGS_REFERENCE_OUTPUT, newOptions, { spaces : 2 }
  )
}

function syncSettings(){
  const themeSettings = THEME ? { 'workbench.colorTheme' : THEME } : {}
  let alternativeBackgrounds = getAlternativeBackground()
  if(alternativeBackgrounds){
    return syncFn({...alternativeBackgrounds, ...themeSettings})
  }

  const newOptions = {
    ...themeSettings,
    ...settings,
    ...getPermanentSettings(),
    ...getCalculatedOptions(),
    'debug.terminal.clearBeforeReusing'        : true,
    'editor.multiDocumentOccurrencesHighlight' : true,
    'editor.wordBasedSuggestions'              : false,
    'magicBeans.IS_VSCODE_INSIDERS'            : VSCODE_INSIDERS,
    'workbench.colorTheme'                     : THEME,
    'workbench.editor.enablePreview'           : READ_MODE,
  }
  syncFn(newOptions)
}

function syncSnippets(){
  syncFiles(SNIPPETS_SOURCE, JS_SNIPPETS)
  syncFiles(SNIPPETS_SOURCE, TS_SNIPPETS)
  syncFiles(SNIPPETS_SOURCE, TSX_SNIPPETS)
}
