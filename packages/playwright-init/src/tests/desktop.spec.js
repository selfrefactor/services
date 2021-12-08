import { playwrightInit } from '../playwright-init'
import {wrap, playwrightRun} from 'playwright-wrap'
const GITHUB = 'https://github.com'

jest.setTimeout(60000)

async function executeTest(browserMode){
  const { browser, page } = await playwrightInit({
    headless : false,
    logFlag  : false,
    resolution: {y: 2000, x:600},
    // resolution: {x: 2000, y:600},
    browser  : browserMode,
    url      : GITHUB,
  })

  try {
    const _ = wrap(page)

    const allClassNames = await _.getAllClassNames('div')
    expect(allClassNames.length).toBeGreaterThan(30)
    await _.snap(browserMode, false)
    await browser.close()
  } catch (e){
    console.log(e)
    await browser.close()
    expect(0).toBeTruthy()
  }
}

test('chromium', async () => {
  await executeTest('chromium')
})

test('firefox', async () => {
  await executeTest('firefox')
})

test('wrap playwright', async () => {
  const fn = async _ => {
    return await _.count('div')
  }
  const result = await playwrightRun({url:GITHUB, fn, fallback: -1})
  expect(result).toBeGreaterThan(100)
})
