
async function symbolsList(){
	const files = await getReportableFiles()
	const reportObject = await generateReportObject(files)
	const report = JSON.stringify(reportObject, null, 2)
	const reportPath = `${ vscode.workspace.workspaceFolders[ 0 ].uri.path }/symbols-report.json`
	await writeFile(reportPath, report)
	vscode.window.showInformationMessage(`Symbols report saved to ${ reportPath }`)
}

async function symbolsListSingleFile(){
	const activeFile = vscode.window.activeTextEditor.document.fileName
	const reportObject = await generateReportObject([ activeFile ])
	const report = JSON.stringify(reportObject, null, 2)
	const reportPath = `${ vscode.workspace.workspaceFolders[ 0 ].uri.path }/symbols-report-single-file.json`
	await writeFile(reportPath, report)
	vscode.window.showInformationMessage(`Symbols report for ${ activeFile } saved to ${ reportPath }`)
}

module.exports = {
	symbolsList,
	symbolsListSingleFile
}