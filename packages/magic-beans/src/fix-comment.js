const { remove } = require('rambdax')
const { splitPerLine, indent, getIndent } = require('string-fn')

function convertComment(text, charsPerLine, leftIndent = 3) {
  const lines = splitPerLine({
    text: remove('//', text).trim(),
    perLine: charsPerLine,
  })

  return lines.map(line => indent(`// ${line}`, leftIndent))
}

async function applyFixComment(vscode, textEditor, startLine) {
  const lineRaw = textEditor.document.lineAt(startLine).text
  const leftIndent = getIndent(lineRaw)
  const line = lineRaw.trim()
  if (!line.startsWith('//')) {
    return
  }
  const newLines = convertComment(line, 50, leftIndent)
  const startPosition = new vscode.Position(startLine, 0)
  const endPosition = new vscode.Position(startLine + 1, 0)
  const activeEditor = vscode.window.activeTextEditor
  if (!activeEditor) {
    return
  }
  activeEditor.edit(editBuilder => {
    editBuilder.replace(
      new vscode.Range(startPosition, endPosition),
      newLines.join('\n') + '\n',
    )
  })
}

async function fixCommentFn(vscode) {
  const textEditor = vscode.window.activeTextEditor
  const { selection } = textEditor

  applyFixComment(vscode, textEditor, selection.start.line)
}

exports.convertComment = convertComment
exports.fixComment = vscode => () => fixCommentFn(vscode)
