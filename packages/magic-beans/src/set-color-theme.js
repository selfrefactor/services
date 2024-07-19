const { configAnt } = require("./ants/config")
const { logToUserSecondBar } = require("./bar")
const vscode = require('vscode')

const ALLOW_CHANGE_COLOR_THEME = configAnt('ALLOW_CHANGE_COLOR_THEME')
const SETTINGS_LOCATION = configAnt('SETTINGS_LOCATION')
let init = false



async function setColorTheme(context){
  if (init || 
    !ALLOW_CHANGE_COLOR_THEME 
  ) return
  init = true
  logToUserSecondBar('Color theme is set')
	let filePath = `${ process.env.HOME }${SETTINGS_LOCATION}/settings.json`
	const fileUri = vscode.Uri.file(filePath)
	const uint8Array = await vscode.workspace.fs.readFile(fileUri);
	const fileContent = Buffer.from(uint8Array).toString('utf-8');
	let parsed = JSON.parse(fileContent)

	1
}

exports.setColorTheme = setColorTheme