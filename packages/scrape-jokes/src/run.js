const { delay } = require('rambdax')
const { OUTPUT_DIR, SCREENS_DIR } = require('./constants')
const { scrape } = require('./scrape')
const { kebabCase } = require('string-fn')
const { existsSync } = require('fs')
const { ensureDir, readJson, writeJson } = require('fs-extra')
const { log } = require('helpers-fn')
const { playwrightInit, wrap } = require('playwright-fn')
const { createMarkdown } = require('./create-markdown')
// const { playwrightInit, wrap } = require('../../playwright-fn/src/playwright-fn.js')

const getFileLocation = label => `${OUTPUT_DIR}/${kebabCase(label)}.json`
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
}

const INITIAL_COUNTER = process.env.PAGE ? Number(process.env.PAGE) : 1
const FORCE_CONTINUE = process.env.FORCE_CONTINUE === 'ON'

async function run(initialUrl, label, checkForUnique) {
  log({ checkForUnique, initialUrl, label }, 'obj')

  const onEnd = async () => {
    const content = await readJson(getFileLocation(label))
    await createMarkdown(content, label)
  }

  await init(label)
  const { browser, page } = await playwrightInit({
    ...defaultInput,
    url: initialUrl,
  })
  const _ = wrap(page, SCREENS_DIR)
  try {
    let scrapeIsDone = false
    let counter = INITIAL_COUNTER
    while (!scrapeIsDone) {
      log(String(counter), 'info')
      const [done, data] = await scrape(_, counter)
      const { stopCondition } = await saveData({ checkForUnique, data, label })
      if (done || (stopCondition && !FORCE_CONTINUE)) {
        scrapeIsDone = true
        continue
      }
      counter++
      await delay(COOL_DOWN)
    }
  }
  catch (err) {
    console.log(err)
  }
  finally {
    await browser.close()
    await onEnd()
  }
}

exports.run = run
