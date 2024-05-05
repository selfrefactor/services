const { delay } = require('rambdax')
const { OUTPUT_DIR } = require('./constants')
const { scrape } = require('./scrape')
const { kebabCase } = require('string-fn')
const { existsSync } = require('fs')
const { writeJson, readJson, ensureDir } = require('fs-extra')
const { log } = require('helpers-fn')

let getFileLocation = label => `${OUTPUT_DIR}/${kebabCase(label)}.json`

async function init(label) {
  const fileLocation = getFileLocation(label)
  if(!existsSync(fileLocation)){
    ensureDir(OUTPUT_DIR)
    await writeJson(fileLocation, [])
  }
}

function calculateNewData({currentData, data, checkForUnique}){
  if(checkForUnique){
    const newData = data.filter(x => !currentData.some(y => y.id === x.id))
    return {
      newData: [...currentData, ...newData],
      stopCondition: newData.length === 0
    }
  }
  return {
    newData: [...currentData, ...data],
    stopCondition: false
  }
}

async function saveData({data, label, checkForUnique}) {
  const fileLocation = getFileLocation(label)
  let currentData = await readJson(fileLocation)
  const {newData, stopCondition} = calculateNewData({currentData, data, checkForUnique})
  if(!stopCondition) await writeJson(fileLocation, newData)

  return {stopCondition}
}

async function run(initialUrl, label, checkForUnique) {
  await init(label)
  try {
    let scrapeIsDone = false
    let counter = 0
    while(!scrapeIsDone){
      counter++
      log(String(counter), 'big')
      const [done, data, timeToInit] = await scrape(initialUrl)
      if(done){
        scrapeIsDone = true
        continue
      }
      let {stopCondition} = await saveData({data, label, checkForUnique})
      if(stopCondition){
        scrapeIsDone = true
        continue
      } 
      await delay(1000)
      console.log('DONE')
    }
  }
  catch (err) {
    console.log(err)
  }
}

exports.run = run
