const { ms } = require('string-fn')
const { run } = require('./run')
const { delay, takeLast, replace } = require('rambdax')
const { log } = require('helpers-fn')
jest.setTimeout(ms('120 minutes'))

let getInitialUrl = url => {
  if(process.env.PAGE){
    return replace('PAGE', process.env.PAGE, url)
  }
  return url
}

const INITIAL_COUNTER = process.env.PAGE ? Number(process.env.PAGE) : 1
const FORCE_CONTINUE = process.env.FORCE_CONTINUE === 'ON'

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

  let condition = FORCE_CONTINUE
  let initialCounter = INITIAL_COUNTER
  while (condition) {
    const {successRun, pageOfError} = await run({
      checkForUnique: CHECK_FOR_UNIQUENESS,
      initialUrl: getInitialUrl(url),
      label,
      initialCounter,
      forceContinue: FORCE_CONTINUE,
    })
    if (successRun){
      condition = false
    }else{
      delay(10000)
    }
    initialCounter = pageOfError - 1
  }
})
