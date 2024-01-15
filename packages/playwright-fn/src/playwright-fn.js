const { headless: headlessModule } = require('./_modules/headless')
const { init } = require('./_modules/init')
const { type, pass } = require('rambdax')
const { PlaywrightBlocker } = require('@cliqz/adblocker-playwright')
const fetch  = require('cross-fetch')

const LONG_TIMEOUT = 60000
const SUPPORTED_WAIT_CONDITIONS = [ 'load', 'domcontentloaded', 'networkidle' ]

const defaultWaitCondition = {
  timeout   : LONG_TIMEOUT,
  waitUntil : 'networkidle',
}

const defaultURL = 'about:blank'
const defaultResolution = {
  x : 1366,
  y : 768,
}

const defaultInput = {
  blockAds: true,
  headless      : true,
  logFlag       : false,
  resolution    : defaultResolution,
  url           : defaultURL,
  waitCondition : defaultWaitCondition,
}

function getWaitCondition(waitCondition){
  const typeIs = type(waitCondition)

  if (typeIs === 'Object'){
    const okCondition = pass({
      timeout   : Number,
      waitUntil : SUPPORTED_WAIT_CONDITIONS,
    })
    if (okCondition) return waitCondition

    return defaultWaitCondition
  }

  if (typeIs === 'String'){
    if (SUPPORTED_WAIT_CONDITIONS.includes(waitCondition)){
      return {
        waitUntil : waitCondition,
        timeout   : LONG_TIMEOUT,
      }
    }

    return defaultWaitCondition
  }

  if (typeIs !== 'Number') return defaultWaitCondition

  return {
    waitUntil : 'networkidle',
    timeout   : waitCondition,
  }
}

const logInfoMethod = input => {
  if (input._type !== 'log') return
  console.log(input)
}

async function playwrightInit(inputRaw){
  const headless = headlessModule() ? {} : { headless : false }

  const input = {
    ...defaultInput,
    ...inputRaw,
    ...headless,
  }
  const { browser, page, context } = await init(input, inputRaw.extraProps)
  if(input.blockAds){
    const blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch)
    blocker.enableBlockingInPage(page);
  }
  const waitCondition = getWaitCondition(input.waitCondition)
  await page.goto(input.url, waitCondition)

  if (input.logAllFlag) page.on('console', input.logMethod)
  if (input.logFlag) page.on('console', logInfoMethod)
  if (input.logMethod) page.on('console', input.logMethod)

  return {
    context,
    browser,
    page,
  }
}

exports.playwrightInit = playwrightInit
