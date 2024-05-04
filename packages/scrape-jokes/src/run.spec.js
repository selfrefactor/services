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
  let CHECK_FOR_UNIQUENESS = process.env.CHECK_FOR_UNIQUENESS === 'ON'
  const [initialUrl, label] = initCondition
    ? ['https://vicovete.bg/page/1', 'default']
    : takeLast(2, process.argv)
  await run(initialUrl, label, CHECK_FOR_UNIQUENESS)
})
