import { playwrightRun } from 'playwright-wrap'
import { delay, mapAsync } from 'rambdax'

export const replSelector = '.lines-content'

async function prepare(_){
  await _.clickWithText('Custom Tests')
  await delay(100)
  await _.clickWithText('Tests')
  await delay(100)
  await _.clickWithText('Test 1')
  await delay(100)

}

export async function getRawData(_){
  await _.waitFor(replSelector)
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
    const testCaseTitle = await x.textContent()
    const testCaseText = await testCasesEls[i].textContent()
    await delay(100)
    if(testCaseText.endsWith('Hidden')) {
      shouldStop = true
      return {}
    }  

    return {rawText: testCaseText, title: testCaseTitle}
  }

  const testCases = await mapAsync(iterator, testCasesTitlesEls)
  const filteredTestCases = testCases.filter(x => x.rawText)

  return {replContent, kataTitle, testCases: filteredTestCases}
}

function handleError(err){
  console.log(err)
}

export async function scrapeChallenge(challengeID){
  const url  = `https://app.codesignal.com/challenge/${challengeID}`
  const rawData = await playwrightRun({fn: getRawData, fallback: null, url, handleError})
  if(!rawData) throw new Error('!rawData')
  
  return rawData
}
