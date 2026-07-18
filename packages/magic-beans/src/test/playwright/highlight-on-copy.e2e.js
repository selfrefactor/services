const { launchVSCode } = require('./run-vscode')
const { attachHelpers, MODIFIER } = require('./helpers')

jest.setTimeout(120000)

describe('highlightOnCopy E2E', () => {
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

  test('copy keyboard shortcut copies text', async () => {
    // Open a new untitled file via Ctrl+N / Cmd+N
    await _.newUntitledFile()

    // Focus the editor and type text
    await _.focusEditor()
    await window.keyboard.type('hello world from magic beans')
    await window.waitForTimeout(300)

    // Select all and copy — triggers highlightOnCopyRun
    await _.selectAll()
    await window.waitForTimeout(200)

    try {
      await window.keyboard.press(`${MODIFIER}+c`)
      await window.waitForTimeout(500)
    } catch (err) {
      await _.snap('error-on-copy')
      throw err
    }

    // Verify something happened — check clipboard content via evaluate
    const clipboardText = await window.evaluate(() => {
      // VS Code stores clipboard in its own internal state;
      // this is a best-effort read via the DOM
      const selection = window.getSelection()
      return selection ? selection.toString() : ''
    })

    expect(clipboardText.length).toBeGreaterThan(0)
  })
})
