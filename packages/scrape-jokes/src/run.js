const { delay } = require('rambdax')
const { OUTPUT_DIR } = require('./constants')
const { scrape } = require('./scrape')
const { kebabCase } = require('string-fn')
const { existsSync } = require('fs')
const { writeJson } = require('fs-extra')

let getFileLocation = label => `${OUTPUT_DIR}/${kebabCase(label)}.json`

async function init(label) {
  const fileLocation = getFileLocation(label)
  if(!existsSync(fileLocation)){
    await writeJson(fileLocation, [])
    return false
  }
  return true
}

async function saveData(data, label) {
  const fileLocation = getFileLocation(label)
}

async function run(initialUrl, label) {
  let checkForUnique = await init(label)
  try {
    const [done, data, timeToInit] = await scrape(initialUrl)
    if(done) return
    await saveData(data)
    await delay(1000)
    console.log('DONE')
  }
  catch (err) {
    console.log(err)
  }
}

exports.run = run
