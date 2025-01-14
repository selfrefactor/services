const { writeFile } = require("fs-extra")
const { getReportableFiles } = require("./file-utils")
const { generateReportObject } = require("./report-utils")
const vscode = require('vscode')

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

function getSortedReportObject(reportObject){
	let willReturn = {}
	Object.keys(reportObject).forEach(key => {
		willReturn[ key ] = reportObject[ key ].sort((a, b) => {
			return a > b ? 1 : -1
		})
	})
	return willReturn
}

async function symbolsList(parentFolderPath){
	let folderName = vscode.workspace.workspaceFolders[ 0 ].uri.path.split('/').pop()
	const files = await getReportableFiles(parentFolderPath)
	const reportObject = await generateReportObject(files)
	let sortedReportObject = getSortedReportObject(reportObject)
	const reportPath = `${ __dirname }/symbols-report-${folderName}.md`
	let reportText = generateFinalResult(reportObject)
	await writeFile(reportPath, reportText)
	const reportUri = vscode.Uri.file(reportPath)
	vscode.commands.executeCommand('vscode.open', reportUri)
}

module.exports = {
	symbolsList,
}