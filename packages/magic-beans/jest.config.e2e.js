module.exports = {
  testMatch: [
    '**/src/test/playwright/**/*.e2e.js',
  ],
  testTimeout: 120000,
  verbose: true,
  maxWorkers: 1,
  testEnvironment: 'node',
}
