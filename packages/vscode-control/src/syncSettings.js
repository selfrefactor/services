import { copySync, writeJsonSync } from 'fs-extra'
import { defaultTo } from 'helpers-fn'
import { resolve } from 'path'
import { toDecimal } from 'rambdax'

import settings from '../.vscode/settings-source'
import {
  JS_SNIPPETS,
  KEYBINDING,
  SETTINGS,
  TS_SNIPPETS,
  TSX_SNIPPETS,
} from './constants'

const FONT_SIZE = 16
const SUGGEST_LINE_HEIGHT = 15
const SUGGEST_FONT_SIZE = 14
const LINE_HEIGHT = 22
const MONO = defaultTo(
  'MONO', false, 'onoff'
)
const THEME = defaultTo(
  'THEME', 'LedZeppelin', 'default'
)

const MODES = {
  small : {
    scale     : 1.15,
    zoomScale : 0.86,
  },
  normal : {
    scale     : 1.25,
    zoomScale : 1.06,
  },
  large : {
    scale     : 1.5,
    zoomScale : 1.5,
  },
}

const MODE_KEY = defaultTo(
  'MODE', 'normal', 'default'
)
const MODE = MODES[ MODE_KEY ]

const KEYBINDING_SOURCE = resolve(__dirname, '../.vscode/keybindings.json')
const SNIPPETS_SOURCE = resolve(__dirname, '../.vscode/snippets.json')
const SETTINGS_REFERENCE_OUTPUT = resolve(__dirname,
  '../.vscode/settings.json')

const DEFAULT_FONT = 'JetBrains Mono'
const FONT_FACTOR = 1

function syncFiles(source, destination){
  copySync(source, destination)
}

const getCalculatedOptions = () => {
  const SCALE_FACTOR = toDecimal(FONT_FACTOR * MODE.scale, 2)
  const fontSize = toDecimal(FONT_SIZE * SCALE_FACTOR)
  const zoomLevel = toDecimal(MODE.zoomScale * FONT_FACTOR)
  const lineHeight = toDecimal(LINE_HEIGHT * SCALE_FACTOR, 2)
  const suggestFontSize = Math.round(toDecimal(SUGGEST_FONT_SIZE * SCALE_FACTOR, 2))
  const suggestLineHeight = Math.round(toDecimal(SUGGEST_LINE_HEIGHT * SCALE_FACTOR))
  const terminalFontSize = Math.round(toDecimal(FONT_SIZE * (SCALE_FACTOR * 0.55)))

  const fontSettings = {
    'terminal.integrated.fontFamily' : MONO ? 'Operator Mono' : DEFAULT_FONT,
    'debug.console.fontFamily'       : MONO ? 'Operator Mono' : DEFAULT_FONT,
    'editor.fontFamily'              : MONO ? 'Operator Mono' : DEFAULT_FONT,
    'editor.fontLigatures'           : !MONO,
  }

  return {
    ...fontSettings,
    'editor.fontSize'              : fontSize,
    'window.zoomLevel'             : zoomLevel,
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
    'magicBeans.IS_VSCODE_INSIDERS' : process.env.BETA === 'ON',
    'workbench.colorTheme'          : THEME,
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

void (function sync(){
  console.log('START')
  syncFiles(KEYBINDING_SOURCE, KEYBINDING)
  syncSnippets()
  syncSettings()
  console.log('END')
})()

function getEditor(){
  return {
    'editor.hover.sticky'                      : true,
    'editor.scrollBeyondLastLine'              : false,
    'editor.cursorSmoothCaretAnimation'        : true,
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
  }
}

function getPermanentSettings(){
  return {
    ...getWallaby(),
    ...getEditor(),
    ...getAdditionalSettings(),
    // click to go to recent files
    'window.commandCenter'                    : true,
    // without comments
    'workbench.editor.languageDetectionHints' : {
      untitledEditors : false,
      notebookEditors : false,
    },
    'workbench.editor.untitled.hint'             : 'hidden',
    'workbench.editor.untitled.labelFormat'      : 'name',
    'git.promptToSaveFilesBeforeCommit'          : 'never',
    'git.allowNoVerifyCommit'                    : true,
    'git.fetchOnPull'                            : true,
    'breadcrumbs.enabled'                        : false,
    'debug.inlineValues'                         : 'off',
    'debug.javascript.usePreview'                : true,
    'explorer.confirmDelete'                     : false,
    'explorer.incrementalNaming'                 : 'smart',
    'files.enableTrash'                          : false,
    'git.autofetch'                              : true,
    'javascript.updateImportsOnFileMove.enabled' : 'always',
    'js/ts.implicitProjectConfig.checkJs'        : true,
    'json.format.enable'                         : false,
    'json.maxItemsComputed'                      : 1000,
    'npm.autoDetect'                             : 'off',
    'npm.packageManager'                         : 'yarn',
    'scm.defaultViewMode'                        : 'tree',
    'search.collapseResults'                     : 'alwaysCollapse',
    'search.seedOnFocus'                         : true,
    'search.smartCase'                           : true,
    'search.useReplacePreview'                   : false,
    'task.autoDetect'                            : 'off',
    'task.quickOpen.detail'                      : false,
    'telemetry.enableTelemetry'                  : false,
    'telemetry.telemetryLevel'                   : 'off',
    'terminal.integrated.gpuAcceleration'        : 'off',
    'typescript.updateImportsOnFileMove.enabled' : 'always',
    'update.mode'                                : 'none',
    'window.title'                               : '${activeFolderMedium}/${activeEditorShort}',
    'workbench.activityBar.visible'              : false,
    'workbench.list.smoothScrolling'             : true,
    'workbench.sideBar.location'                 : 'right',
    'workbench.startupEditor'                    : 'none',
    'zenMode.restore'                            : false,
    'editor.codeActionsOnSave'                   : {
      'source.fixAll'          : false,
      'source.organizeImports' : false,
    },
    'editor.quickSuggestions' : {
      comments : 'off',
      strings  : 'off',
      other    : 'off',
    },
    'github.copilot.enable' : {
      '*'         : true,
      'yaml'      : true,
      'plaintext' : true,
      'markdown'  : true,
    },
    'magicBeans.RANDOM_FILE_ALLOWED_EXTENSIONS' : [
      '.html',
      '.js',
      '.jsx',
      '.tsx',
      '.css',
      '.scss',
      '.py',
      '.ts',
      '.feature',
    ],
    'files.exclude' : {
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

function getAdditionalSettings(){
  return {
    'explorer.sortOrder'                                     : 'default',
    'editor.tabCompletion'                                   : 'off',
    'explorer.openEditors.sortOrder'                         : 'alphabetical',
    'editor.scrollbar.vertical'                              : 'visible',
    'javascript.inlayHints.enumMemberValues.enabled'         : false,
    'javascript.inlayHints.functionLikeReturnTypes.enabled'  : false,
    'javascript.inlayHints.parameterTypes.enabled'           : false,
    'javascript.inlayHints.propertyDeclarationTypes.enabled' : false,
    'javascript.inlayHints.variableTypes.enabled'            : false,
    'typescript.inlayHints.enumMemberValues.enabled'         : false,
    'typescript.inlayHints.functionLikeReturnTypes.enabled'  : false,
    'typescript.inlayHints.parameterTypes.enabled'           : false,
    'typescript.inlayHints.variableTypes.enabled'            : false,
  }
}

function getWallaby(){
  return {
    'wallaby.showUpdateNotifications'         : false,
    'wallaby.strictSSL'                       : false,
    'wallaby.startAutomatically'              : false,
    'wallaby.suppressExpirationNotifications' : true,
    'wallaby.codeLensFeature.debugger'        : false,
    'wallaby.codeLensFeature.profiler'        : false,
    'wallaby.codeLensFeature.testFilters'     : false,
    'wallaby.codeLensFeature.testStory'       : false,
    'workbench.iconTheme'                     : 'emoji-file-icons',
  }
}
