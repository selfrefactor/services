const { writeFile } = require("fs-extra")
const { getReportableFiles } = require("./file-utils")
const { generateReportObject } = require("./report-utils")
const vscode = require('vscode')

function generateFinalResult (reportObject){
	let willReturn = ''
	Object.keys(reportObject).forEach(key => {
		willReturn += `## LEVEL ${ key }\n\n`

		const current = reportObject[ key ]
		current.forEach(x => {
			willReturn += `  ${ x }\n`
		})
	})
	
	return willReturn
}

async function symbolsList(){
	let folderName = vscode.workspace.workspaceFolders[ 0 ].uri.path.split('/').pop()
	const files = await getReportableFiles()
	const reportObject = await generateReportObject(files)
	const reportPath = `${ __dirname }/symbols-report-${folderName}.md`
	let reportText = generateFinalResult(reportObject)
	await writeFile(reportPath, reportText)
	const reportUri = vscode.Uri.file(reportPath)
	vscode.commands.executeCommand('vscode.open', reportUri)
}

module.exports = {
	symbolsList,
}