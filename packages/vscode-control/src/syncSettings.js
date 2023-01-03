import { copySync, writeJsonSync } from 'fs-extra'
import { defaultTo } from 'helpers-fn'
import { resolve } from 'path'
import { maybe, toDecimal } from 'rambdax'

import settings from '../.vscode/settings'
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
const LINE_HEIGHT = 19
const MONO = defaultTo(
  'MONO', false, 'onoff'
)
const MINI_MAP = defaultTo(
  'MINI_MAP', false, 'onoff'
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
    scale     : 1.7,
    zoomScale : 1.5,
  },
}

const MODE_KEY = defaultTo(
  'MODE', 'normal', 'default'
)
const MODE = MODES[ MODE_KEY ]

const KEYBINDING_SOURCE = resolve(__dirname, '../.vscode/keybindings.json')
const SNIPPETS_SOURCE = resolve(__dirname, '../.vscode/snippets.json')

// const DEFAULT_FONT = 'Hack'
// const DEFAULT_FONT = 'Cascadia Mono'
// const DEFAULT_FONT = 'Ubuntu Mono'
// no ligatures above

// const DEFAULT_FONT = 'Fira Mono'
const DEFAULT_FONT = 'JetBrains Mono'

// https://rubjo.github.io/victor-mono/
// const DEFAULT_FONT = 'Monoid'

// https://github.com/be5invis/Iosevka
// const DEFAULT_FONT = 'Iosevka SS18'
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

function getMinimapOptions(){
  const whenTrue = {
    'editor.minimap.enabled'          : true,
    'editor.minimap.maxColumn'        : 40,
    'editor.minimap.renderCharacters' : false,
    'editor.minimap.scale'            : 1,
    'editor.minimap.side'             : 'right',
    'editor.minimap.size'             : 'fill',
  }
  const whenFalse = { 'editor.minimap.enabled' : false }

  return MINI_MAP ? whenTrue : whenFalse
}

function syncSettings(){
  const newOptions = {
    ...settings,
    ...getMinimapOptions(),
    ...getCalculatedOptions(),
    'magicBeans.IS_VSCODE_INSIDERS' : process.env.BETA === 'ON',
    'workbench.colorTheme'          : THEME,
  }

  writeJsonSync(
    SETTINGS, newOptions, { spaces : 2 }
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
