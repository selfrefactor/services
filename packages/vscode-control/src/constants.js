const { pathExistsSync } = require("fs-extra/lib/path-exists")

const BASE_STABLE = `${process.env.HOME}/.config/Code/User`
const BASE_BETA = `${process.env.HOME}/.config/Code - Insiders/User`
const BASE = process.env.BETA === 'ON' ? BASE_BETA :BASE_STABLE

let KEYBINDING = `${BASE}/keybindings.json`
let SETTINGS = `${BASE}/settings.json`

exports.SETTINGS = SETTINGS
exports.JS_SNIPPETS = `${BASE}/snippets/javascript.json`
exports.JSX_SNIPPETS = `${BASE}/snippets/javascriptreact.json`
exports.TS_SNIPPETS = `${BASE}/snippets/typescript.json`
exports.TSX_SNIPPETS = `${BASE}/snippets/typescriptreact.json`

exports.KEYBINDING = KEYBINDING
let editorExists = pathExistsSync(SETTINGS)
exports.editorExists = editorExists