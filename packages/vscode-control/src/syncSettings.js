import { resolve } from 'path'
import { copySync, writeJsonSync } from 'fs-extra'
import { toDecimal, maybe } from 'rambdax'
import { defaultTo } from 'helpers-fn'
import settings from '../.vscode/settings.json'
import {
  KEYBINDING,
  SETTINGS,
  JS_SNIPPETS,
  TS_SNIPPETS,
  TSX_SNIPPETS
} from './constants'

const FONT_SIZE = 14
const SUGGEST_LINE_HEIGHT = 15
const SUGGEST_FONT_SIZE = 13
const LINE_HEIGHT = 16
const MONO = defaultTo('MONO', false, 'onoff') 
const MINI_MAP = defaultTo('MINI_MAP', false, 'onoff') 
const THEME = defaultTo('THEME', `LedZeppelin`, 'default') 
const SCALE_FACTOR = process.env.SCALE === undefined ?
  1 :
  toDecimal(Number(process.env.SCALE))
const ZOOM = maybe(
  process.env.ZOOM_SCALE === undefined,
  1,
  Number(process.env.ZOOM_SCALE)
)

const KEYBINDING_SOURCE = resolve(__dirname, '../.vscode/keybindings.json')
const SNIPPETS_SOURCE = resolve(__dirname, '../.vscode/snippets.json')

// const DEFAULT_FONT = 'Hack'
// const DEFAULT_FONT = 'Fira Mono'
// const DEFAULT_FONT = 'Cascadia Mono'
const DEFAULT_FONT = 'JetBrains Mono'
// const DEFAULT_FONT = 'Ubuntu Mono'

function syncFiles(source, destination){
  copySync(source, destination)
}

const getCalculatedOptions = () => {
  const fontSize = toDecimal(FONT_SIZE * SCALE_FACTOR)
  const zoomLevel = toDecimal(ZOOM * SCALE_FACTOR)
  const lineHeight = Math.round(toDecimal(LINE_HEIGHT * SCALE_FACTOR))
  const suggestFontSize = Math.round(toDecimal(SUGGEST_FONT_SIZE * SCALE_FACTOR ))
  const suggestLineHeight = Math.round(toDecimal(SUGGEST_LINE_HEIGHT * SCALE_FACTOR ))
  const terminalFontSize = Math.round(toDecimal(FONT_SIZE * (SCALE_FACTOR * 0.55) ))

  const fontSettings = {
    'debug.console.fontFamily' : MONO? 'Operator Mono': DEFAULT_FONT,
    "editor.fontFamily": MONO? 'Operator Mono': DEFAULT_FONT,
    "editor.fontLigatures": !MONO 
  }

  return  {
    ...fontSettings,
    "editor.fontSize": fontSize,
    "window.zoomLevel": zoomLevel,
    "editor.lineHeight": lineHeight,
    "editor.suggestFontSize": suggestFontSize,
    "editor.suggestLineHeight": suggestLineHeight,
    "terminal.integrated.fontSize": terminalFontSize,
  }
}

function getMinimapOptions(){
  const whenTrue = {
    "editor.minimap.enabled": true,
    "editor.minimap.maxColumn": 40,
    "editor.minimap.renderCharacters": false,
    "editor.minimap.scale": 1,
    "editor.minimap.side": "right",
    "editor.minimap.size": "fill",
  }
  const whenFalse = {
    "editor.minimap.enabled": false,
  }
  return MINI_MAP? whenTrue : whenFalse
}

function syncSettings(){
  const newOptions = {
    ...settings,
    ...getMinimapOptions(),
    ...getCalculatedOptions(),
    "workbench.colorTheme": THEME,
  }

  writeJsonSync(
    SETTINGS,
    newOptions,
    { spaces : 2 }
  )
}

function syncSnippets(){
  syncFiles(SNIPPETS_SOURCE, JS_SNIPPETS)
  syncFiles(SNIPPETS_SOURCE, TS_SNIPPETS)
  syncFiles(SNIPPETS_SOURCE, TSX_SNIPPETS)
}

void function sync(){
  console.log('START')
  syncFiles(KEYBINDING_SOURCE, KEYBINDING)
  syncSnippets()
  syncSettings()
  console.log('END')
}()
