const { writeFile } = require('fs/promises')
const { playwrightRun } = require('playwright-fn')
const { delay, mapAsync, tail, toDecimal } = require('rambdax')

function markTime() {
  const now = Number(new Date())

  return () => toDecimal((Number(new Date()) - now) / 1000)
}

const postEntry = '.post-entry'

function waitCondition(_) {
  return async () => {
    const els = await _.page.$$(postEntry)
    return els.length === 15
  }
}
async function getRawData(_) {
  const markInitTime = markTime()
  await _.waitForPredicate(waitCondition(_), 12000)

  const timeToInit = markInitTime()
  const postEntries = await _.page.$$(postEntry)
  let allPostHeaders = await _.page.$$('.post-header')

  const data = await mapAsync(async (x, index) => {
    const children = await x.$$(':scope > *')
    let postHeaders = await allPostHeaders[index]
    let titleEl = await postHeaders.$('.cat')
    let title = await titleEl.textContent() ?? 'INVALID TITLE'

    let categoryEl = await postHeaders.$('h2')
    let category = await categoryEl.textContent() ?? 'INVALID CATEGORY'

    const result = await mapAsync(async (x) => {
      const textContent = await x.textContent()
      const innerHTML = await x.innerHTML()
      if (!innerHTML.startsWith('<p>') || !innerHTML.includes('<strong>'))
        return ''
      return textContent
    }, tail(children))
    return {
      text: result.filter(Boolean).join('\n'),
      title,
      category,
    }
  }, postEntries)

  const nextButton = await _.page.$('.older')
  if (!nextButton) return [true, data]
  await nextButton.click({ force: true })
  return [false, data, timeToInit]
}

function handleError(err) {
  console.log(err)
}

async function scrape(url) {
  const rawData = await playwrightRun({
    fallback: null,
    fn: getRawData,
    handleError,
    url,
  })

  if (process.env.DEBUG === 'ON') {
    await writeFile('rawData.json', JSON.stringify(rawData, null, 2))
  }

  if (!rawData) throw new Error('!rawData')

  return [false, rawData]
}

exports.scrape = scrape
