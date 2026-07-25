const path = require('path')
const vscode = require('vscode')

function copyLineRangeFn() {
  const textEditor = vscode.window.activeTextEditor
  if (!textEditor) return

  const { selection } = textEditor
  const document = textEditor.document

  const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri)
  const relativePath = workspaceFolder
    ? path.relative(workspaceFolder.uri.fsPath, document.fileName)
    : document.fileName

  const startLine = selection.start.line + 1
  const endLine = selection.end.line + 1

  const result = startLine === endLine
    ? `${relativePath}:${startLine}`
    : `${relativePath}:${startLine}-${endLine}`

  vscode.env.clipboard.writeText(result)
}

exports.copyLineRange = () => copyLineRangeFn()
