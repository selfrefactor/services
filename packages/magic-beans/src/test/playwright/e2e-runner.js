/**
 * Programmatic E2E test runner.
 * Alternatives to running Jest directly:
 *   yarn test:e2e          — runs via Jest config
 *   node this/file.js      — runs programmatically
 */
const { execSync } = require('child_process')
const path = require('path')

const jestBin = path.resolve(__dirname, '../../node_modules/.bin/jest')
const configPath = path.resolve(__dirname, '../../jest.config.e2e.js')

try {
  execSync(`node ${jestBin} --config ${configPath}`, {
    cwd: path.resolve(__dirname, '../..'),
    stdio: 'inherit',
    env: { ...process.env },
  })
} catch (err) {
  process.exit(1)
}
