const { launchVSCode } = require('./run-vscode')
const { attachHelpers } = require('./helpers')

jest.setTimeout(120000)

describe('setColorTheme E2E', () => {
  let app, window, _

  beforeAll(async () => {
    const result = await launchVSCode({
      additionalArgs: ['--new-window', '--skip-release-notes'],
    })
    app = result.app
    window = result.window
    _ = attachHelpers(window)
  }, 60000)

  afterAll(async () => {
    if (app) {
      await app.close()
    }
  }, 15000)

  test('VS Code workbench is loaded', async () => {
    const workbench = await window.$('.monaco-workbench')
    expect(workbench).not.toBeNull()
  })

  test('status bar is visible', async () => {
    const statusBar = await window.$('.statusbar')
    expect(statusBar).not.toBeNull()
  })

  test('extension commands show in command palette', async () => {
    await _.openCommandPalette()

    // Type part of a known magic-beans command label
    await window.keyboard.type('Copy and highlight', { delay: 20 })
    await window.waitForTimeout(500)

    const commandItems = await window.$$('.quick-input-list .monaco-list-row')
    expect(commandItems.length).toBeGreaterThan(0)

    // Close the command palette
    await window.keyboard.press('Escape')
    await window.waitForTimeout(300)
  })

  test('command palette opens and closes', async () => {
    await _.openCommandPalette()

    expect(await window.$('.quick-input-widget')).not.toBeNull()

    // Close it
    await window.keyboard.press('Escape')
    await window.waitForTimeout(300)
  })
})
