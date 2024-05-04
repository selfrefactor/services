const { ms } = require('string-fn')
const { run } = require('./run')
const { delay, takeLast } = require('rambdax')
const { log } = require('helpers-fn')
jest.setTimeout(ms('30 minutes'))

test('happy', async () => {
  const initCondition = process.argv.length === 3
  if (initCondition) {
    log('INIT CONDITION', 'big')
    await delay(2000)
  }

  const [initialUrl, label] = initCondition
    ? ['https://vicovete.bg/page/1', 'default']
    : takeLast(3, process.argv)
  await run(initialUrl, label)
})
