const assert = require('assert')
const vscode = require('vscode')

suite('highlightOnCopy', () => {
  test('should copy selected text to clipboard', async () => {
    const doc = await vscode.workspace.openTextDocument({
      content: 'hello world\nsecond line',
    })
    const editor = await vscode.window.showTextDocument(doc)

    // Select "hello"
    editor.selection = new vscode.Selection(0, 0, 0, 5)

    await vscode.commands.executeCommand('magicBeans.highlightOnCopyRun')

    const clipboard = await vscode.env.clipboard.readText()
    assert.strictEqual(clipboard, 'hello')
  })

  test('should copy entire line when selection is empty', async () => {
    const doc = await vscode.workspace.openTextDocument({
      content: 'hello world\nsecond line',
    })
    const editor = await vscode.window.showTextDocument(doc)

    // Empty selection on first line
    editor.selection = new vscode.Selection(0, 0, 0, 0)

    await vscode.commands.executeCommand('magicBeans.highlightOnCopyRun')

    const clipboard = await vscode.env.clipboard.readText()
    assert.strictEqual(clipboard, 'hello world')
  })

  test('should copy multi-line selection', async () => {
    const doc = await vscode.workspace.openTextDocument({
      content: 'line one\nline two\nline three',
    })
    const editor = await vscode.window.showTextDocument(doc)

    // Select first two lines
    editor.selection = new vscode.Selection(0, 0, 1, 8)

    await vscode.commands.executeCommand('magicBeans.highlightOnCopyRun')

    const clipboard = await vscode.env.clipboard.readText()
    assert.strictEqual(clipboard, 'line one\nline two')
  })
})
