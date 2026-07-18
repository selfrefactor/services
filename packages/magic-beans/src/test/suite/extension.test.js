const assert = require('assert')
const vscode = require('vscode')

suite('Extension activation', () => {
  test('should activate successfully', async () => {
    const ext = vscode.extensions.getExtension('selfrefactor.magic-beans')
    assert.ok(ext, 'Extension not found')
    await ext.activate()
    assert.ok(ext.isActive)
  })

  test('should register all expected commands', async () => {
    const allCommands = await vscode.commands.getCommands()

    const expectedCommands = [
      'magicBeans.highlightOnCopyRun',
      'magicBeans.formatJson',
      'magicBeans.sortLines',
      'magicBeans.requestRandomFile',
      'magicBeans.symbolsList',
      'magicBeans.copyTrimmed',
      'magicBeans.slowScrollInit',
      'magicBeans.openFolder',
      'magicBeans.requestRandomFileWithSubfolderRightClick',
      'magicBeans.requestRandomFileWithSubfolderRightClickSequential',
    ]

    expectedCommands.forEach(cmd => {
      assert.ok(
        allCommands.includes(cmd),
        `Command '${cmd}' is not registered`,
      )
    })
  })

  test('should run highlightOnCopy without error when editor is open', async () => {
    const doc = await vscode.workspace.openTextDocument({ content: 'test' })
    await vscode.window.showTextDocument(doc)

    // Should not throw
    await vscode.commands.executeCommand('magicBeans.highlightOnCopyRun')
    assert.ok(true)
  })
})
