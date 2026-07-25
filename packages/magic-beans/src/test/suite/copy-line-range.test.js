const assert = require('assert')
const path = require('path')
const fs = require('fs')
const os = require('os')
const vscode = require('vscode')

suite('copyLineRange', () => {
  let tempDir
  let tempFile

  suiteSetup(async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mbeans-clr-'))
    tempFile = path.join(tempDir, 'test-file.js')
    fs.writeFileSync(
      tempFile,
      [
        'line one',
        'line two',
        'line three',
        'line four',
        'line five',
      ].join('\n'),
    )

    const wsFolders = vscode.workspace.workspaceFolders || []
    const workspaceUri = vscode.Uri.file(tempDir)
    await vscode.workspace.updateWorkspaceFolders(0, wsFolders.length, {
      uri: workspaceUri,
    })
  })

  suiteTeardown(async () => {
    const wsFolders = vscode.workspace.workspaceFolders || []
    if (wsFolders.length > 0) {
      await vscode.workspace.updateWorkspaceFolders(0, wsFolders.length)
    }
    if (tempDir) {
      fs.rmSync(tempDir, { recursive: true, force: true })
    }
  })

  test('should copy relative path with line range for multi-line selection', async () => {
    const doc = await vscode.workspace.openTextDocument(tempFile)
    const editor = await vscode.window.showTextDocument(doc)

    editor.selection = new vscode.Selection(0, 0, 2, 0)

    await vscode.commands.executeCommand('magicBeans.copyLineRange')

    const clipboard = await vscode.env.clipboard.readText()
    assert.strictEqual(clipboard, 'test-file.js:1-3')
  })

  test('should copy only line number for single-line cursor', async () => {
    const doc = await vscode.workspace.openTextDocument(tempFile)
    const editor = await vscode.window.showTextDocument(doc)

    editor.selection = new vscode.Selection(3, 0, 3, 5)

    await vscode.commands.executeCommand('magicBeans.copyLineRange')

    const clipboard = await vscode.env.clipboard.readText()
    assert.strictEqual(clipboard, 'test-file.js:4')
  })

  test('should handle selection that spans entire file', async () => {
    const doc = await vscode.workspace.openTextDocument(tempFile)
    const editor = await vscode.window.showTextDocument(doc)

    editor.selection = new vscode.Selection(0, 0, 4, 8)

    await vscode.commands.executeCommand('magicBeans.copyLineRange')

    const clipboard = await vscode.env.clipboard.readText()
    assert.strictEqual(clipboard, 'test-file.js:1-5')
  })
})
