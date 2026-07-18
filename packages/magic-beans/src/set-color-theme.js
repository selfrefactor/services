const { shuffle } = require('rambdax')
const { configAnt } = require('./ants/config')
const vscode = require('vscode')
const os = require('node:os')
const path = require('node:path')
const { currentTimeIsBetween } = require('./_modules/current-time-is-between')
const { THEME_CHANGE_DAYTIME } = require('./constants')

const ALLOW_CHANGE_COLOR_THEME = configAnt('ALLOW_CHANGE_COLOR_THEME')

// NOTE: don't use "~" here; VS Code/Cursor won't expand it in file URIs.
// Resolve via os.homedir() and path.join below.
const IS_MAC = os.platform() === 'darwin'

const BASE_STABLE = IS_MAC ? 'Library/Application Support/Code/User' : '.config/Code/User'
const BASE_BETA = IS_MAC ? 'Library/Application Support/Code - Insiders/User' : '.config/Code - Insiders/User'
const BASE_CURSOR = IS_MAC ? 'Library/Application Support/Cursor/User' : '.config/Cursor/User'

const ALLOWED_LIGHT_THEMES = [
  'CommunicationBreakdown',
  'DancingDays',
  'FunkyDrummer',
  'GlassOnion',
  'HelloSpaceboy',
  'KozmicBlues',
  'LedZeppelin',
  'StrangeBrew',
  'SweatLeaf',
]

const ALLOWED_DARK_THEMES = [
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

const ALL_THEMES = [...ALLOWED_DARK_THEMES, ...ALLOWED_LIGHT_THEMES]

const [startDaytime, endDaytime] = configAnt(THEME_CHANGE_DAYTIME)

function getExpectedColorThemes() {
  return currentTimeIsBetween(startDaytime, endDaytime)
    ? ALLOWED_LIGHT_THEMES
    : ALLOWED_DARK_THEMES
}

function getRandomTheme(expectedColorThemes) {
	return shuffle(expectedColorThemes)[0]
}

function getSettingsFilePath() {
  const homeDir = os.homedir()
  const appName = vscode.env.appName
  const base = appName.includes('Cursor')
    ? BASE_CURSOR
    : appName.includes('Insiders')
      ? BASE_BETA
      : BASE_STABLE

  return path.join(homeDir, base, 'settings.json')
}

async function setColorTheme() {
    if (!ALLOW_CHANGE_COLOR_THEME) {
      return
    }

    init = true
    const expectedColorThemes = getExpectedColorThemes()
    if (!expectedColorThemes) {
      return
    }

    const filePath = getSettingsFilePath()
    const fileUri = vscode.Uri.file(filePath)
    const uint8Array = await vscode.workspace.fs.readFile(fileUri)
    const fileContent = Buffer.from(uint8Array).toString('utf-8')
    const parsed = JSON.parse(fileContent)
    const currentColorTheme = parsed['workbench.colorTheme']

		if (!ALL_THEMES.includes(currentColorTheme)) return

    if (expectedColorThemes.includes(currentColorTheme)) {
      return
    }

    parsed['workbench.colorTheme'] = getRandomTheme(expectedColorThemes)
    const newContent = JSON.stringify(parsed, null, 2)
    await vscode.workspace.fs.writeFile(fileUri, Buffer.from(newContent))
}

exports.setColorTheme = setColorTheme
