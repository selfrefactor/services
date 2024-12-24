const { delay } = require('rambdax');
const { playwrightInit, wrap, playwrightRun } = require('../src/playwright-fn');
const GITHUB = 'https://github.com'

jest.setTimeout(60000)

async function executeTest(browserMode){
  const { browser, page } = await playwrightInit({
    headless : false,
    logFlag  : false,
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
    await delay(3000)
    const [elx] = await page.$$(`text=Let’s build from here`)
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

test.only('wrap playwright', async () => {
  const fn = async _ => {
    return await _.count('div')
  }
  const result = await playwrightRun({url:GITHUB, fn, fallback: -1})
  expect(result).toBeGreaterThan(100)
})
