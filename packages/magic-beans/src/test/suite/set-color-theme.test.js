const assert = require('assert')
const vscode = require('vscode')

suite('setColorTheme', () => {
  const CONFIG_KEY = 'magicBeans'
  const ALLOW_CHANGE = 'ALLOW_CHANGE_COLOR_THEME'

  // Open an editor so highlightOnCopyRun doesn't crash
  async function openEditor() {
    const doc = await vscode.workspace.openTextDocument({ content: 'test' })
    await vscode.window.showTextDocument(doc)
  }

  teardown(async () => {
    await vscode.workspace.getConfiguration(CONFIG_KEY)
      .update(ALLOW_CHANGE, undefined, vscode.ConfigurationTarget.Global)
  })

  test('should do nothing when ALLOW_CHANGE_COLOR_THEME is false', async () => {
    await openEditor()

    await vscode.workspace.getConfiguration(CONFIG_KEY)
      .update(ALLOW_CHANGE, false, vscode.ConfigurationTarget.Global)

    const currentTheme = vscode.workspace.getConfiguration('workbench')
      .get('colorTheme')

    await vscode.commands.executeCommand('magicBeans.highlightOnCopyRun')

    const afterTheme = vscode.workspace.getConfiguration('workbench')
      .get('colorTheme')

    assert.strictEqual(afterTheme, currentTheme)
  })

  test('should change theme when ALLOW_CHANGE_COLOR_THEME is true', async () => {
    await openEditor()

    await vscode.workspace.getConfiguration(CONFIG_KEY)
      .update(ALLOW_CHANGE, true, vscode.ConfigurationTarget.Global)

    await vscode.commands.executeCommand('magicBeans.highlightOnCopyRun')

    const afterTheme = vscode.workspace.getConfiguration('workbench')
      .get('colorTheme')

    const knownThemes = [
      'AmericanDad', 'AquaTeenHungerForce', 'Archer', 'ClevelandShow',
      'Dilbert', 'HomeMovies', 'SouthPark', 'TripTank', 'UglyAmericans',
      'CommunicationBreakdown', 'DancingDays', 'FunkyDrummer',
      'GlassOnion', 'HelloSpaceboy', 'KozmicBlues', 'LedZeppelin',
      'StrangeBrew', 'SweatLeaf',
    ]

    assert.ok(knownThemes.includes(afterTheme), `Unexpected theme: ${afterTheme}`)
  })

  test('onDidChangeWindowState listener is registered', async () => {
    // Can't simulate window focus from within extension host.
    // This is covered by Playwright E2E tests (tab away and back).
    // Here we just verify the extension activates without error.
    const ext = vscode.extensions.getExtension('selfrefactor.magic-beans')
    assert.ok(ext.isActive)
  })
})
