const { writeFile } = require("fs-extra")
const { getReportableFiles } = require("./file-utils")
const { generateReportObject } = require("./report-utils")
const vscode = require('vscode')
const { logToUserAndClose } = require("../bar")

function generateFinalResult (reportObject){
	let willReturn = ''
	let variablesSet = new Set()

	Object.keys(reportObject).forEach(key => {
		willReturn += `## LEVEL ${ key }\n\n`

		const current = reportObject[ key ]
		current.forEach(x => {
			if (variablesSet.has(x)) return
			variablesSet.add(x)
			willReturn += `  ${ x }\n`
		})
	})
	
	return willReturn
}

async function symbolsList(){
	let folderName = vscode.workspace.workspaceFolders[ 0 ].uri.path.split('/').pop()
	const files = await getReportableFiles()
	if(
		files.length === 0
	){
		logToUserAndClose('No files found')
		return
	}
	const reportObject = await generateReportObject(files)
	if(
		Object.keys(reportObject).length === 0
	){
		logToUserAndClose('No symbols found')
		return
	}
	const reportPath = `${ __dirname }/symbols-report-${folderName}.md`
	let reportText = generateFinalResult(reportObject)
	await writeFile(reportPath, reportText)
	const reportUri = vscode.Uri.file(reportPath)
	vscode.commands.executeCommand('vscode.open', reportUri)
}

module.exports = {
	symbolsList,
}