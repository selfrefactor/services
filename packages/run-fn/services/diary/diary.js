const { pathExistsSync, readFile, writeFile } = require('fs-extra')
const { log } = require('helpers-fn')

let SEPARATOR = '\n==='

async function diary({
  envKey,
  pathInput,
  diaryInput
}){
  if(
    pathExistsSync(pathInput) === false
  ) return log(`${envKey} is missing`, 'error')

  let content = (await readFile (pathInput)).toString().trim()
  let newContent = `${ diaryInput.join(' ') }${SEPARATOR}${content}`
  await writeFile(pathInput, newContent)
  log(diaryInput.join(' '), 'back')
  log('sep')
  log(`${pathInput} updated`, 'info')
}

exports.diary = diary
