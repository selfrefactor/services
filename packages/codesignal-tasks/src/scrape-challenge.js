// const { playwrightRun } = require('../../../services/packages/playwright-fn/src/playwright-fn.js')
const { writeFile } = require('fs/promises')
const { playwrightRun } = require('playwright-fn')
const { delay, mapAsync, toDecimal } = require('rambdax')

const replSelector = '.lines-content'

async function prepare(_){
  await _.clickWithText('Custom Tests')
  await delay(100)
  await _.clickWithText('Tests')
  await delay(100)
  await _.clickWithText('Test 1')
  await delay(100)

}

async function getRawData(_){
  await delay(10000)
  // await _.waitFor(replSelector, 12000)
  const fooEl = await _.page.$('.markdown.-arial')
  const replContentEl = await _.page.$(replSelector)
  const replContent  = await replContentEl.textContent()
  const kataTitleEl = await _.page.$(`.task-title--header`)
  const kataTitle  = await kataTitleEl.textContent()
  const foo  = await fooEl.textContent()

  await prepare(_)
  const testCasesTitlesEls = await _.page.$$(
    '.test-case--title'
  )
  let shouldStop = false
  const iterator = async (x, i) => {
    if(shouldStop) return {}
    await x.click({force:true})
    await delay(100)  
    let getTestInput = async () => {
      const testCasesElsAlt = await _.page.$$(
        '[data-testid="solution-language"]'
      )
      return testCasesElsAlt[3].textContent()
    }
    const testCaseTitle = await x.textContent()
    const testInput = await getTestInput()
    await delay(100)
    let tabsTitle = await _.page.$$('.tabs--title')
    if(tabsTitle.length<5){
      shouldStop = true  
      return {}
    } 
    await tabsTitle[4].click({force:true})
    await _.clickWithText('Return Value')
    await delay(100)
    const expectedOutput = await _.getText(`.-answer`)

    await delay(100)

    return {expectedOutput, testInput, title: testCaseTitle, taskDescription: foo}
  }

  const testCases = await mapAsync(iterator, testCasesTitlesEls)
  const filteredTestCases = testCases.filter(x => x.title)

  return {replContent, kataTitle, testCases: filteredTestCases}
}

function handleError(err){
  console.log(err)
}

async function scrapeChallenge(url){
  const rawData = await playwrightRun({fn: getRawData, fallback: null, url, handleError})

  if(
    process.env.DEBUG === 'ON' 
  ){
    await writeFile('rawData.json', JSON.stringify(rawData, null, 2))
  }

  if(!rawData) throw new Error('!rawData')
  
  return rawData
}

exports.scrapeChallenge = scrapeChallenge
exports.replSelector = replSelector
