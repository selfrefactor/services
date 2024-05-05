const { ms } = require('string-fn')
const { run } = require('./run')
const { delay, takeLast, replace } = require('rambdax')
const { log } = require('helpers-fn')
jest.setTimeout(ms('30 minutes'))

let getInitialUrl = url => {
  if(process.env.PAGE){
    return replace('PAGE', process.env.PAGE, url)
  }
  return url
}

test('happy', async () => {
  const initCondition = process.argv.length === 3
  if (initCondition) {
    log('INIT CONDITION', 'big')
    await delay(2000)
  }
  const CHECK_FOR_UNIQUENESS = process.env.CHECK_FOR_UNIQUENESS === 'ON'
  const [url, label] = initCondition
    ? ['https://vicovete.bg/page/1', 'default']
    : takeLast(2, process.argv)
  await run(getInitialUrl(url), label, CHECK_FOR_UNIQUENESS)
})
