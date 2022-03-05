import { playwrightInit } from '../playwright-init'
import {wrap, playwrightRun} from 'playwright-wrap'
import {delay} from 'rambdax'
const GITHUB = 'https://github.com'
const CHORDU = 'https://chordu.com/chords-tabs-warsaw-or-the-first-breath-you-take-after-you-give-up-id_Ppfmj8ZAvuE'

jest.setTimeout(60000)
const POST_BUTTON = '//h1[contains(text(), \"the world builds\")]'

async function executeTest(browserMode){
  const { browser, page } = await playwrightInit({
    headless : false,
    logFlag  : false,
    // resolution: {y: 2000, x:600},
    resolution: {x: 1400, y:800},
    browser  : browserMode,
    url      : GITHUB,
    blockAds: true
  })

  try {
    const _ = wrap(page)

    const allClassNames = await _.getAllClassNames('div')
    expect(allClassNames.length).toBeGreaterThan(30)
    await _.snap(browserMode, false)
    // await delay(10000)
    const [elx] = await page.$$('text=the world builds')
    const [el] = await page.$$(POST_BUTTON)
    const text = await el.textContent()
    const textx = await elx.textContent()
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
