const { shuffle } = require("rambdax")
const { configAnt } = require("./ants/config")
const vscode = require('vscode')
const { currentTimeIsBetween } = require("./_modules/current-time-is-between")
const { IS_VSCODE_INSIDERS } = require("./constants")

const ALLOW_CHANGE_COLOR_THEME = configAnt('ALLOW_CHANGE_COLOR_THEME')

const BASE_STABLE = `/.config/Code/User`
const BASE_BETA = `/.config/Code - Insiders/User`

let init = false

let ALLOWED_LIGHT_THEMES = [
  'CommunicationBreakdown',
  'DancingDays',
  'FunkyDrummer',
  'GlassOnion',
  'HelloSpaceboy',
  'KozmicBlues',
  'LedZeppelin',
  'StrangeBrew',
  'SweatLeaf'
]

let ALLOWED_DARK_THEMES = [
  'AmericanDad',
  'AquaTeenHungerForce',
  'Archer',
  'ClevelandShow',
  'Dilbert',
  'HomeMovies',
  'SouthPark',
  'TripTank',
  'UglyAmericans'
]

function getExpectedColorThemes(){
	return currentTimeIsBetween('7:30', '17:00') ? ALLOWED_LIGHT_THEMES : ALLOWED_DARK_THEMES
}

async function setColorTheme(context){
  if (
		init || 
    !ALLOW_CHANGE_COLOR_THEME 
  ){

		return
	}

  init = true
	let expectedColorThemes = getExpectedColorThemes()
	if (!expectedColorThemes) return
	
	let SETTINGS_LOCATION = configAnt(IS_VSCODE_INSIDERS) ? BASE_BETA : BASE_STABLE
	let filePath = `${ process.env.HOME }${SETTINGS_LOCATION}/settings.json`
	const fileUri = vscode.Uri.file(filePath)
	const uint8Array = await vscode.workspace.fs.readFile(fileUri);
	const fileContent = Buffer.from(uint8Array).toString('utf-8');
	let parsed = JSON.parse(fileContent)
	let currentColorTheme = parsed['workbench.colorTheme']
	if (expectedColorThemes.includes(currentColorTheme)) return

	parsed['workbench.colorTheme'] = shuffle(expectedColorThemes)[0]
	const newContent = JSON.stringify(parsed, null, 2)
	await vscode.workspace.fs.writeFile(fileUri, Buffer.from(newContent))

}

exports.setColorTheme = setColorTheme