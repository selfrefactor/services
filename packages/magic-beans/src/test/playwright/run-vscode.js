const { _electron: electron } = require('playwright')
const path = require('path')
const os = require('os')
const fs = require('fs')

/**
 * Detect VS Code executable path for the current platform.
 * Falls back to CODE_PATH env var if set.
 */
function detectExecutablePath() {
  if (process.env.CODE_PATH) {
    return process.env.CODE_PATH
  }

  const platform = os.platform()
  const home = os.homedir()

  if (platform === 'darwin') {
    const candidates = [
      '/Applications/Visual Studio Code.app/Contents/MacOS/Electron',
      '/Applications/Visual Studio Code - Insiders.app/Contents/MacOS/Electron',
      path.join(home, 'Applications/Visual Studio Code.app/Contents/MacOS/Electron'),
    ]
    for (const p of candidates) {
      if (fs.existsSync(p)) return p
    }
  } else if (platform === 'linux') {
    const candidates = [
      '/usr/share/code/code',
      '/usr/bin/code',
      '/snap/bin/code',
    ]
    for (const p of candidates) {
      if (fs.existsSync(p)) return p
    }
  } else if (platform === 'win32') {
    const candidates = [
      'C:\\Program Files\\Microsoft VS Code\\Code.exe',
      'C:\\Program Files\\Microsoft VS Code Insiders\\Code.exe',
    ]
    for (const p of candidates) {
      if (fs.existsSync(p)) return p
    }
  }

  // Fallback: let Playwright try with its bundled Electron
  return undefined
}

/**
 * Launch VS Code with the magic-beans extension loaded, using Playwright Electron automation.
 *
 * @param {object} options
 * @param {string[]} [options.additionalArgs] - Extra CLI arguments for VS Code
 * @param {string} [options.executablePath] - Override VS Code executable path
 * @param {number} [options.timeout=30000] - Timeout for workbench to appear
 * @param {boolean} [options.headless=false] - Run headlessly (requires Xvfb on Linux)
 * @returns {Promise<{app: ElectronApplication, window: Page}>}
 */
async function launchVSCode(options = {}) {
  const {
    additionalArgs = [],
    executablePath = detectExecutablePath(),
    timeout = 30000,
    headless = process.env.HEADLESS === 'false' ? false : true,
  } = options

  const extensionPath = path.resolve(__dirname, '../..')
  const userDataDir = options.userDataDir || path.join(
    os.tmpdir(),
    'magic-beans-e2e-' + Date.now(),
  )

  console.log(`Extension path: ${extensionPath}`)
  console.log(`User data dir: ${userDataDir}`)
  if (executablePath) {
    console.log(`VS Code path: ${executablePath}`)
  }

  // Pre-configure VS Code to skip startup pages
  const settingsDir = path.join(userDataDir, 'User')
  fs.mkdirSync(settingsDir, { recursive: true })
  fs.writeFileSync(
    path.join(settingsDir, 'settings.json'),
    JSON.stringify({
      'workbench.startupEditor': 'none',
      'window.restoreWindows': 'none',
      'update.showReleaseNotes': false,
      'extensions.autoUpdate': false,
    }, null, 2),
  )

  const app = await electron.launch({
    args: [
      `--extensionDevelopmentPath=${extensionPath}`,
      `--user-data-dir=${userDataDir}`,
      '--disable-extensions', // isolate from other extensions
      '--skip-welcome',
      '--skip-release-notes',
      '--disable-workspace-trust',
      '--no-sandbox',
      '--disable-gpu',
      ...additionalArgs,
    ],
    executablePath,
    headless,
  })

  // Wait for the first window (splash or workbench)
  const window = await app.firstWindow()

  // Wait for the VS Code workbench to be fully loaded
  // activationEvents: onStartupFinished fires once the workbench is ready
  await window.waitForSelector('.monaco-workbench', { timeout })
  await window.waitForTimeout(2000) // let it settle

  console.log('VS Code workbench loaded')

  return { app, window, userDataDir }
}

module.exports = { launchVSCode, detectExecutablePath }
