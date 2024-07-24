const { pathExistsSync, readFile, writeFile } = require('fs-extra')
const { log } = require('helpers-fn')

const DIARY_PATH = process.env.DIARY_PATH
let SEPARATOR = '\n==='

async function diary(...inputArgumentsRaw){
  if(
    pathExistsSync(DIARY_PATH) === false
  ) return log('DIARY_PATH is not set', 'error')
  let content = (await readFile (DIARY_PATH)).toString().trim()
  let newContent = `${ inputArgumentsRaw.join(' ') }${SEPARATOR}${content}`
  await writeFile(DIARY_PATH, newContent)
  log(content, 'back')
  log('sep')
  log('Diary updated', 'info')
}

exports.diary = diary
