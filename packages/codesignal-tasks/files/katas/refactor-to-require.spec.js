import { piped, remove, replace, trim } from 'rambdax'
import {outputFile} from 'fs-extra'
function refactorToRequire(input){
  return input.split('\n')
  .map(line => {
    if(!line.startsWith('import'))return line

    const newLine /*?*/ = piped(
      line,
      trim,
      remove(';'),
      replace('import ', 'const '),
      replace('from ', ' = require('),
    )
      
    return `${newLine})`
  })
  .join('\n')
}

const testInput = `
import { existsSync } from 'fs'
import { outputJson, readJson } from 'fs-extra'
import { mapAsync, ok, pick } from 'rambdax'

import { filterRepo } from './_modules/filter-repo'
import { getRepo } from './_modules/get-repo'
`.trim()

test('happy',async () => {
  const result = refactorToRequire(testInput)
  
  await outputFile(
    `${__dirname}/refactor-to-require.txt`,
    result
  )
})