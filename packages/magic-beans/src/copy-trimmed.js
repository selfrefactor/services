const vscode = require('vscode')
const { logToUser } = require('./bar')
const { update, last } = require('rambdax')
const { applyHighlightDecoration } = require('./highlight-on-copy')

function copy(x){
  vscode.env.clipboard.writeText(x)
}

function applyCopyTrimmed(
  textEditor, startLine, endLine
){
  const lines = []
  for (let i = startLine; i <= endLine; i++){
    const line = textEditor.document.lineAt(i).text
    lines.push(line)
  }

  if (lines.length === 0) return logToUser('empty selection!!')
  if (lines.length === 1){
    copy(lines[ 0 ].trim())

    return
  }
  const withFirst = update(
    0, lines[ 0 ].trimLeft(), lines
  )
  const withLast = update(
    lines.length - 1,
    last(lines).trimRight(),
    withFirst
  )
  copy(withLast.join('\n'))
}

function copyTrimmedFn(){
  const textEditor = vscode.window.activeTextEditor
  const { selection } = textEditor

  applyCopyTrimmed(
    textEditor,
    selection.start.line,
    selection.end.line
  )
  applyHighlightDecoration(textEditor)
}

exports.copyTrimmed = () => copyTrimmedFn()
