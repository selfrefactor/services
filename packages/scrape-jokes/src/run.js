const { delay } = require('rambdax')
const { OUTPUT_DIR, SCREENS_DIR } = require('./constants')
const { scrape } = require('./scrape')
const { existsSync } = require('fs')
const { ensureDir, readJson, writeJson } = require('fs-extra')
const { log } = require('helpers-fn')
const { playwrightInit, wrap } = require('playwright-fn')
const { createMarkdown } = require('./create-markdown')
// const { playwrightInit, wrap } = require('../../playwright-fn/src/playwright-fn.js')

const getFileLocation = label => `${OUTPUT_DIR}/${label}.json`
const COOL_DOWN = 10000
async function init(label) {
  const fileLocation = getFileLocation(label)
  if (!existsSync(fileLocation)) {
    ensureDir(OUTPUT_DIR)
    await writeJson(fileLocation, [])
  }
}

function calculateNewData({ checkForUnique, currentData, data }) {
  if (checkForUnique) {
    const newData = data.filter(x => !currentData.some(y => y.id === x.id))
    return {
      newData: [...currentData, ...newData],
      stopCondition: newData.length === 0,
    }
  }
  return {
    newData: [...currentData, ...data],
    stopCondition: false,
  }
}

async function saveData({ checkForUnique, data, label }) {
  const fileLocation = getFileLocation(label)
  const currentData = await readJson(fileLocation)
  const { newData, stopCondition } = calculateNewData({
    checkForUnique,
    currentData,
    data,
  })
  if (!stopCondition) await writeJson(fileLocation, newData)

  return { stopCondition }
}

const defaultInput = {
  headless: process.env.HEADLESS !== 'OFF',
  waitCondition: 'domcontentloaded'
}

async function run({initialUrl, label, checkForUnique, initialCounter, forceContinue}) {
  log({ checkForUnique, initialUrl, label }, 'obj')
  let successRun = false
  let counter = initialCounter
  const onEnd = async () => {
    const content = await readJson(getFileLocation(label))
    await createMarkdown(content, label)
    console.log('markdown created')
  }
  var browserInstance
  await init(label)
  try {
    const { browser, page } = await playwrightInit({
      ...defaultInput,
      url: initialUrl,
    })
    browserInstance = browser
    var _ = wrap(page, SCREENS_DIR)
    let scrapeIsDone = false
    while (!scrapeIsDone) {
      log(String(counter), 'info')
      const [done, data] = await scrape(_, counter)
      const { stopCondition } = await saveData({ checkForUnique, data, label })
      if (done || (stopCondition && !forceContinue)) {
        scrapeIsDone = true
        continue
      }
      counter++
      await delay(COOL_DOWN)
    }
    successRun = true
  }
  catch (err) {
    console.log(err)
  }finally {
    await browserInstance.close()
    await onEnd()
  }

  return {successRun, pageOfError: counter}
}

exports.run = run
