const vscode = require('vscode')
const { update, last } = require('rambdax')


function applyfixComment(
  textEditor, startLine
){
  const line = textEditor.document.lineAt(startLine).text
  1
  // const lines = []
  // for (let i = startLine; i <= endLine; i++){
  //   lines.push(line)
  // }

  // if (lines.length === 0) return 
  // if (lines.length === 1){
  //   copy(lines[ 0 ].trim())

  //   return
  // }
  // const withFirst = update(
  //   0, lines[ 0 ].trimLeft(), lines
  // )
  // const withLast = update(
  //   lines.length - 1,
  //   last(lines).trimRight(),
  //   withFirst
  // )
}

function fixCommentFn(){
  const textEditor = vscode.window.activeTextEditor
  const { selection } = textEditor

  return applyfixComment(
    textEditor,
    selection.start.line,
  )
}

exports.fixComment = () => fixCommentFn()
