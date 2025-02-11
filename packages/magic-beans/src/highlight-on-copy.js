const vscode = require('vscode')

function applyHighlightDecoration(editor = vscode.window.activeTextEditor) {
  const timeout = 200

  // Apply decoration
  const decorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: '#f0f0f0',
    color: '#500040',
  })
  // Apply decoration
  editor.setDecorations(decorationType, getSelections(editor))

  // Remove decoration after specified timeout
  setTimeout(() => {
    decorationType.dispose()
  }, timeout)
}

function highlightOnCopy(setColorThemeFn) {
  return async () => {
    // Copy to clipboard
    await vscode.commands.executeCommand('editor.action.clipboardCopyAction')
    applyHighlightDecoration()
    setColorThemeFn()
  }
}

function getSelections(editor) {
  let lastSelectionLine = -1

  // We need to sort the selections for the case where an additional cursor is inserted
  // before the 'active' cursor of another selection on the same line.
  const sortedSelections = [...editor.selections].sort((a, b) => {
    if (a.active.line === b.active.line) {
      return a.active.character - b.active.character
    }
    return a.active.line - b.active.line
  })

  const expandedSelections = sortedSelections.map(selection => {
    // With multiple cursors on a single line, any empty selection is ignored (after the first selection)
    if (selection.isEmpty && lastSelectionLine === selection.active.line) {
      // We don't worry about setting lastSelectionLine here as this branch is only for the matching line
      return null
    }

    lastSelectionLine = selection.active.line

    // Return the range of the line if the selection is empty (default copy behaviour)
    if (selection.isEmpty) {
      return editor.document.lineAt(selection.active).range
    }

    // For non-empty selections, return the selection
    return selection
  })

  return expandedSelections.filter(selection => selection !== null)
}

exports.highlightOnCopy = highlightOnCopy
exports.applyHighlightDecoration = applyHighlightDecoration
