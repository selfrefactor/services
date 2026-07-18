const { delay } = require('rambdax')
const os = require('os')
const fs = require('fs')
const path = require('path')

const MODIFIER = os.platform() === 'darwin' ? 'Meta' : 'Control'

/**
 * Attach VS Code-specific helpers to a Playwright page object.
 * Provides a similar API surface to playwright-fn's `attach()`.
 *
 * @param {import('playwright').Page} page
 * @returns {object} helpers
 */
function attachHelpers(page) {
  /**
   * Open the command palette.
   */
  async function openCommandPalette() {
    await page.keyboard.press(`${MODIFIER}+Shift+p`)
    // Wait for the quick input widget to appear
    await page.waitForSelector('.quick-input-widget', { timeout: 10000 })
    await delay(300)
  }

  /**
   * Execute a VS Code command via the command palette.
   * Types the command label (without '>') then presses Enter.
   * @param {string} commandLabel - The command label to search for (e.g. 'New Text File')
   */
  async function executeCommand(commandLabel) {
    await openCommandPalette()

    // Type the command label into the palette input.
    // The palette already has '>' pre-filled, so we just append the label.
    await page.keyboard.type(commandLabel, { delay: 20 })
    await delay(500)
    await page.keyboard.press('Enter')
    await delay(800)
  }

  /**
   * Open a new untitled file via Ctrl+N / Cmd+N (more reliable than command palette).
   */
  async function newUntitledFile() {
    await page.keyboard.press(`${MODIFIER}+n`)
    await delay(1000)
    // Wait for the editor to appear
    await page.waitForSelector('.monaco-editor', { timeout: 10000 })
    await delay(500)
  }

  /**
   * Get all text content from the active editor.
   * @returns {Promise<string>}
   */
  async function getEditorContent() {
    return page.evaluate(() => {
      const lines = document.querySelectorAll('.view-line')
      return Array.from(lines)
        .map(el => el.textContent)
        .join('\n')
    })
  }

  /**
   * Focus the editor by clicking on it.
   */
  async function focusEditor() {
    const editor = await page.$('.monaco-editor')
    if (editor) {
      await editor.click()
      await delay(200)
    }
  }

  /**
   * Select all text in the editor via Ctrl+A / Cmd+A.
   */
  async function selectAll() {
    await page.keyboard.press(`${MODIFIER}+a`)
    await delay(200)
  }

  /**
   * Take a screenshot saved to the screenshots directory.
   * @param {string} label
   */
  async function snap(label) {
    const screenshotDir = path.resolve(__dirname, 'screenshots')
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true })
    }
    const fileName = label
      ? label.replace(/\s+/g, '-').toLowerCase()
      : `screenshot-${Date.now()}`
    const filePath = path.join(screenshotDir, `${fileName}.png`)
    await page.screenshot({ path: filePath, fullPage: false })
    console.log(`Screenshot saved: ${filePath}`)
  }

  return {
    openCommandPalette,
    executeCommand,
    newUntitledFile,
    getEditorContent,
    focusEditor,
    selectAll,
    snap,
    page,
    delay,
  }
}

module.exports = { attachHelpers, MODIFIER }
