const { writeFile, readFile } = require('fs-extra')
const { resolve } = require('path')
const { usePrettier } = require('./usePrettier')

const DIR = resolve(__dirname, '..')

async function forceTypescriptFn(
  filePath, prettierSpecialCase, debug
){
  const TEMP = `${ DIR }/TEMP.ts`
  const content = (await readFile(filePath)).toString()
  await writeFile(TEMP, content)

  const prettierResult = await usePrettier({
    filePath: TEMP,
    withTypescript : true,
    prettierSpecialCase,
    cwdOverride: DIR,
    debug,
  })

  const lintedContent = (await readFile(TEMP)).toString()
  await writeFile(filePath, lintedContent)

  return {prettierResult}
}

exports.forceTypescriptFn = forceTypescriptFn
