const { log } = require('helpers-fn')
const { mapAsync, replace, tail, take, toDecimal } = require('rambdax')
const { camelCase } = require('string-fn')

function markTime() {
  const now = Number(new Date())

  return () => toDecimal((Number(new Date()) - now) / 1000)
}

const postEntry = '.post-entry'

function cyrillicToLatin(text) {
  const cyrillic
		= 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЬЮЯабвгдежзийклмнопрстуфхцчшщъьюя'
  const latin
		= 'ABVGDEJZIJKLMNOPRSTUFHCČŠŠŬĬÛÂabvgdejzijklmnoprstufh1234567890'
  let result = ''

  for (let i = 0; i < text.length; i++) {
    const cyrillicIndex = cyrillic.indexOf(text[i])
    if (cyrillicIndex > -1) {
      const replacer = latin[cyrillicIndex] ?? ''
      result += replacer
    }
    else {
      result += text[i]
    }
  }

  return result
}

function getId(category, title, text) {
  const cyrilicId = `${category}${take(10, title)}${take(10, text)}`

  return camelCase(cyrillicToLatin(cyrilicId)).toLowerCase()
}

function getText(result) {
  const failedConditionWithText = result
    .filter(x => !x.okCondition && x.text)
    .map(x => x.text)
    .sort((a, b) => a.length - b.length)

  const passed = result
    .filter(x => x.okCondition && x.text)
    .map(x => x.text)

  if (passed.length > 0) {
    return passed.join('\n')
  }
  if (failedConditionWithText.length > 0) {
    return failedConditionWithText[0]
  }
  return ''
}

async function scrape(_, index) {
  const postEntries = await _.page.$$(postEntry)
  const allPostHeaders = await _.page.$$('.post-header')

  const data = await mapAsync(async (x, index) => {
    const children = await x.$$(':scope > *')
    const postHeaders = await allPostHeaders[index]
    const titleEl = await postHeaders.$('.cat')
    const title = (await titleEl.textContent()) ?? ''

    const categoryEl = await postHeaders.$('h2')
    const category = (await categoryEl.textContent()) ?? ''

    const result = await mapAsync(async (section, i) => {
      const text = (await section.textContent()).trim()
      const innerHtml = (await section.innerHTML()).trim()
      if (innerHtml.startsWith('<strong>')) {
        const linesElements = await section.$$(':scope > *')

        const lines = await mapAsync(async (line) => {
          const lineText = await line.textContent()
          return lineText.trim()
        }, linesElements)
        const text = lines.filter(Boolean).join('\n')
        return {
          okCondition: true,
          text,
        }
      }
      if (!innerHtml) {
        return {
          okCondition: false,
          text: '',
        }
      }
      if (innerHtml.includes('<br>')) {
        const replaceLineBreaks = replace(/\<br\>/g, '\n', innerHtml)

        return {
          okCondition: true,
          text: replaceLineBreaks,
        }
      }
      if (text.includes('<img ')) {
        return {
          okCondition: false,
          text: '',
        }
      }
      return {
        okCondition: true,
        text,
      }
    }, tail(children))

    const text = getText(result)
    return {
      id: getId(category, title, text),
      text,
    }
  }, postEntries)

  const nextButton = await _.page.$('.older')
  const nextButtonInnerHtml = nextButton ? await nextButton.innerHTML() : ''
  // await _.snap('before navigation', true)
  if (!nextButtonInnerHtml) return [true, data]
  const navigateEndsWith = `${index + 1}`
  log(`${navigateEndsWith} - navigateEndsWith`, 'back')
  await _.clickAndWaitForNavigation('.older', navigateEndsWith, {
    timeout: 60000,
    waitUntil: 'domcontentloaded',
  })
  return [false, data]
}

exports.scrape = scrape
