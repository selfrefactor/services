const vscode = require('vscode')
const { basename, extname } = require('path')
const { kebabCase } = require('string-fn')
const { replace } = require('rambdax')

async function fixCamelcaseRefactoring(){
  const filePath = vscode.window.activeTextEditor.document.fileName
  const extension = extname(filePath)
  const fileName = replace(
    extension, '', basename(filePath)
  )
  const newFileName = kebabCase(fileName)

  if (newFileName === fileName) return

  const newPath = replace(
    fileName, newFileName, filePath
  )
  await vscode.workspace.fs.rename(
    vscode.window.activeTextEditor.document.uri,
    vscode.Uri.file(newPath),
    { overwrite : false }
  )
}

exports.fixCamelcaseRefactoring = fixCamelcaseRefactoring
