const vscode = require('vscode')
const { mapAsync } = require('rambdax')
const { logToUser } = require('../bar')

const skippedKinds = [ 1, 13 ]
const skippedByRegex = []
const skippedByKind = []
const MAX_LEVEL = 9

function getFileReport(symbols, prev = {}, level = 0){
  if (!symbols.length === 0) return prev
  symbols.forEach(symbol => {
    const { children, kind, name } = symbol
    if (skippedKinds.includes(kind)){
      skippedByKind.push({ kind, name })
      return
    } 

    if (prev[ level ] === undefined) prev[ level ] = []
    const passRegex = new RegExp('^[a-zA-Z0-9_]+$')
    if (!passRegex.test(name)){
      skippedByRegex.push({ kind, name })
      return
    }
		let nameValue = kind === 11 ? `${ name } - FUNCTION` : name
    prev[ level ].push(nameValue)
    if (children.length === 0 || level + 1 === MAX_LEVEL) return
    prev = getFileReport(children, prev, level + 1)
  })

  return prev
}

async function generateReportObject(files){
  let reportObject = {}
  await mapAsync(async (file, i) => {
    const symbols = await vscode.commands.executeCommand('vscode.executeDocumentSymbolProvider', file)
    if (!symbols) return false
		if(i%5 === 0){
			logToUser(`Processing file ${ i }/${ files.length }`)
		}
    reportObject = getFileReport(symbols, reportObject)
  }, files)

  return reportObject
}

module.exports = {
  generateReportObject
}
