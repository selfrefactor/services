const { pathExistsSync, readFile, writeFile } = require('fs-extra')
const { log } = require('helpers-fn')

let SEPARATOR = '\n==='

async function diary(pathInput, ...inputArgumentsRaw){
  if(
    pathExistsSync(pathInput) === false
  ) return log('DIARY_PATH is not set', 'error')
  let content = (await readFile (pathInput)).toString().trim()
  let newContent = `${ inputArgumentsRaw.join(' ') }${SEPARATOR}${content}`
  await writeFile(pathInput, newContent)
  log(inputArgumentsRaw.join(' '), 'back')
  log('sep')
  log(`${pathInput} updated`, 'info')
}

exports.diary = diary
