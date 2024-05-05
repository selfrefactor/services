const { ms } = require('string-fn')
const { run } = require('./run')
const { delay, takeLast, replace } = require('rambdax')
const { log } = require('helpers-fn')
jest.setTimeout(ms('120 minutes'))

let getInitialUrl = (url, initialCounter) => {
  if(process.env.PAGE){
    return replace('PAGE', initialCounter, url)
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
  let latestPageOfError = 0
  while (condition) {
    let initialUrl = getInitialUrl(url, initialCounter)
    const {successRun, pageOfError} = await run({
      checkForUnique: CHECK_FOR_UNIQUENESS,
      initialUrl,
      label,
      initialCounter,
      forceContinue: FORCE_CONTINUE,
    })
    if (successRun){
      condition = false
    }else if(latestPageOfError === pageOfError){
      log('consecutive error', 'error')
      condition = false
    }else{
      delay(10000)
      latestPageOfError = pageOfError
    }
    initialCounter = pageOfError
  }
})
