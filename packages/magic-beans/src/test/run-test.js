const path = require('path')
const { runTests } = require('@vscode/test-electron')

async function main() {
  try {
    await runTests({
      extensionDevelopmentPath: path.resolve(__dirname, '../..'),
      extensionTestsPath: path.resolve(__dirname, 'suite', 'index.js'),
      launchArgs: [
        '--disable-extensions',
        '--user-data-dir',
        path.resolve(__dirname, '.vscode-test-user-data'),
      ],
    })
  } catch (err) {
    console.error('Integration tests failed', err)
    process.exit(1)
  }
}

main()
