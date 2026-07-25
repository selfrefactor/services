const { launchVSCode } = require('./run-vscode')
const { attachHelpers, MODIFIER } = require('./helpers')

jest.setTimeout(120000)

describe('copyLineRange E2E', () => {
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

  test('copies file path and line range via keybinding', async () => {
    await _.newUntitledFile()
    await _.focusEditor()
    await window.waitForTimeout(300)

    // Type multiple lines of text
    await window.keyboard.type('function greet(name) {')
    await window.keyboard.press('Enter')
    await window.keyboard.type("  return `Hello, ${name}!`")
    await window.keyboard.press('Enter')
    await window.keyboard.type('}')
    await window.waitForTimeout(300)

    // Select all text
    await _.selectAll()
    await window.waitForTimeout(200)

    // Press the copyLineRange keybinding (Ctrl+Shift+C / Cmd+Shift+C)
    await window.keyboard.press(`${MODIFIER}+Shift+c`)
    await window.waitForTimeout(500)

    // Read clipboard via Electron API
    const clipboardText = await window.evaluate(() => {
      try {
        const { clipboard } = require('electron')
        return clipboard.readText()
      } catch (_err) {
        return ''
      }
    })

    // Untitled documents get names like "Untitled-1", so we just verify the
    // format is "<something>:1-3" (lines 1 through 3, 1-indexed)
    expect(clipboardText).toMatch(/:1-3$/)
  })
})
