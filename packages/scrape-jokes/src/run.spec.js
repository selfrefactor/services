const { ms } = require('string-fn')
const { run } = require('./run')
const { delay, takeLast, replace, last } = require('rambdax')
const { log } = require('helpers-fn')
jest.setTimeout(ms('1120 minutes'))

let urls = [
  'https://vicovete.bg/category/%d0%bb%d1%8e%d0%b1%d0%be%d0%b2%d0%bd%d0%b8%d1%86%d0%b0',
  'https://vicovete.bg/category/%d0%bc%d0%b0%d0%b9%d1%81%d1%82%d0%be%d1%80%d0%b8',
  'https://vicovete.bg/category/%d0%bd%d0%b0%d0%b4%d0%bf%d0%b8%d1%81%d0%b8',
  'https://vicovete.bg/category/%d0%bd%d0%b0%d0%b7%d0%b4%d1%80%d0%b0%d0%b2%d0%b8%d1%86%d0%b8',
  'https://vicovete.bg/category/%d0%bd%d0%b0%d1%87%d0%b0%d0%bb%d0%bd%d0%b8%d1%86%d0%b8',
  'https://vicovete.bg/category/%d0%bf%d0%be%d0%b5%d0%b7%d0%b8%d1%8f',
  'https://vicovete.bg/category/%d0%bf%d1%80%d0%be%d0%b3%d1%80%d0%b0%d0%bc%d0%b8%d1%81%d1%82%d0%b8',
  'https://vicovete.bg/category/%d1%81%d0%b5%d0%bb%d0%be',
  'https://vicovete.bg/category/%d0%ba%d1%80%d0%b2%d0%b8',
  'https://vicovete.bg/category/%d0%b0%d0%bb%d0%ba%d0%be%d1%85%d0%be%d0%bb',
  'https://vicovete.bg/category/%d0%b1%d0%b0%d0%b9-%d0%b3%d0%b0%d0%bd%d1%8c%d0%be',
]

let getInitialUrl = (url, initialCounter, PAGE) => {
  if(PAGE){
    return replace('PAGE', initialCounter, url)
  }
  return url
}


function getInputs(initCondition){
  if(process.env.WITH_CONFIG === 'ON'){
    const url = urls[Number(last(process.argv))]
    if(!url){
      throw `url is not provided`
    }
    const label = `with-config-${last(process.argv)}`
    return {
      PAGE: 1,
      url: `${ url }/page/PAGE `,
      label,
      FORCE_CONTINUE: true,
      INITIAL_COUNTER: 1,
      CHECK_FOR_UNIQUENESS: false
    }
  }
  const INITIAL_COUNTER = process.env.PAGE ? Number(process.env.PAGE) : 1
  const FORCE_CONTINUE = process.env.FORCE_CONTINUE === 'ON'
  const [url, label] = initCondition
    ? ['https://vicovete.bg/page/1', 'default']
    : takeLast(2, process.argv)
  return {
    url,
    label,
    PAGE: process.env.PAGE,
    FORCE_CONTINUE,
    INITIAL_COUNTER,
    CHECK_FOR_UNIQUENESS: process.env.CHECK_FOR_UNIQUENESS === 'ON'
  }
}

test('happy', async () => {
  const initCondition = process.argv.length === 3
  if (initCondition) {
    log('INIT CONDITION', 'big')
    await delay(2000)
  }
  const {CHECK_FOR_UNIQUENESS, FORCE_CONTINUE, INITIAL_COUNTER, url, label, PAGE} = getInputs(initCondition)

  let condition = FORCE_CONTINUE
  let initialCounter = INITIAL_COUNTER
  let latestPageOfError = 0
  do {
    let initialUrl = getInitialUrl(url, initialCounter, PAGE)
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
  }while(condition)
    console.log('DONE')
})
