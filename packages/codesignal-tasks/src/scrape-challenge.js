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

function markTime(){
  let now = Number(new Date())

  return () => toDecimal((Number(new Date() )- now)/1000)
}

async function getRawData(_){
  let markInitTime = markTime()
  // let waitPredicate = async() => {
  //   let el = await _.page.$('.monaco-mouse-cursor-text')
  //   if(!el) return false

  //   let textContent = await el.textContent()
  //   // get visibility of element
  //   let isVisibleHandle = await el.evaluateHandle((e) => {
  //     const style = window.getComputedStyle(e)
  //     return style && style.visibility === 'visible'
  //   })

  //   return textContent.includes('function')
  // }
  // await _.waitForPredicate(waitPredicate, 12000)

  await delay(7000)
  let timeToInit = markInitTime()
  const replContentEl = await _.page.$(replSelector)
  const replContent  = await replContentEl.textContent()
  const kataTitleEl = await _.page.$(`.task-title--header`)
  const kataTitle  = await kataTitleEl.textContent()

  await prepare(_)
  const testCasesTitlesEls = await _.page.$$(
    '.test-case--title'
  )
  let shouldStop = false
  const iterator = async (x, i) => {
    if(shouldStop) return {}
    await x.click({force:true})
    await delay(100)  
    const testCasesEls = await _.page.$$(
      '.test-case'
    )
    let getTestInput = async () => {
      const testCasesElsAlt = await _.page.$$(
        '[data-testid="solution-language"]'
      )
      return testCasesElsAlt[3].textContent()
    }
    const testCaseTitle = await x.textContent()
    const testCaseText = await testCasesEls[i].textContent()
    const testInput = await getTestInput()
    await delay(100)
    let tabsTitle = await _.page.$$('.tabs--title')
    await tabsTitle[4].click({force:true})
    await _.clickWithText('Return Value')
    await delay(100)
    const expectedOutput = await _.getText(`.-answer`)

    await delay(100)
    if(testCaseText.endsWith('Hidden')) {
      shouldStop = true
      return {}
    }  

    return {expectedOutput, testInput, title: testCaseTitle}
  }

  const testCases = await mapAsync(iterator, testCasesTitlesEls)
  const filteredTestCases = testCases.filter(x => x.testCaseTitle)

  return {replContent, kataTitle, testCases: filteredTestCases}
}

function handleError(err){
  console.log(err)
}

async function scrapeChallenge(challengeID){
  const url  = `https://app.codesignal.com/challenge/${challengeID}`
  const rawData = await playwrightRun({fn: getRawData, fallback: null, url, handleError})

  await writeFile('rawData.json', JSON.stringify(rawData, null, 2))
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