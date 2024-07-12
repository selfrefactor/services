const { configAnt } = require("./ants/config")
const { logToUserSecondBar } = require("./bar")
const ALLOW_CHANGE_COLOR_THEME = configAnt('ALLOW_CHANGE_COLOR_THEME')
let init = false

async function setColorTheme(context){
  if (init || 
    !ALLOW_CHANGE_COLOR_THEME 
  ) return
  init = true
    logToUserSecondBar('Color theme is set')
}

exports.setColorTheme = setColorTheme