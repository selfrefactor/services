const assert = require('assert')
const vscode = require('vscode')

suite('copyTrimmed', () => {
  test('should copy single line trimmed', async () => {
    const doc = await vscode.workspace.openTextDocument({
      content: '  hello world  \nsecond line',
    })
    const editor = await vscode.window.showTextDocument(doc)

    editor.selection = new vscode.Selection(0, 0, 0, 0)

    await vscode.commands.executeCommand('magicBeans.copyTrimmed')

    const clipboard = await vscode.env.clipboard.readText()
    assert.strictEqual(clipboard, 'hello world')
  })

  test('should copy first line trimmed left and last line trimmed right for multi-line', async () => {
    const doc = await vscode.workspace.openTextDocument({
      content: '  line one  \n  line two  \n  line three  ',
    })
    const editor = await vscode.window.showTextDocument(doc)

    // Select entire range (lines 0-2)
    editor.selection = new vscode.Selection(0, 0, 2, 16)

    await vscode.commands.executeCommand('magicBeans.copyTrimmed')

    const clipboard = await vscode.env.clipboard.readText()
    // First line left-trimmed, last line right-trimmed, middle untouched
    assert.strictEqual(clipboard, 'line one  \n  line two  \n  line three')
  })
})
