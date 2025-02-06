const dayjs = require('dayjs')
const {
  pathExistsSync,
  readFile,
  writeFile,
  readJson,
  writeJson,
} = require('fs-extra')
const { log } = require('helpers-fn')
const { execCommand } = require('../../modules/execCommand')

const DIARY_MAP = {
  diary: {
    path: process.env.DIARY_PATH,
    envKey: 'DIARY_PATH',
    outCommand: 'yarn out',
  },
  'diary:tech': {
    path: process.env.TECH_DIARY_PATH,
    envKey: 'TECH_DIARY_PATH',
    outCommand: 'yarn out:tech',
  },
  'diary:todo': {
    path: process.env.TODO_DIARY_PATH,
    envKey: 'TODO_DIARY_PATH',
  },
}
const dataPath = `${__dirname}/data.json`

const SEPARATOR = '\n===\n'
async function diary({ envKey, pathInput, diaryInput, mode, outCommand }) {
  if (pathExistsSync(pathInput) === false) {
    return log(`${envKey} is missing`, 'error')
  }

  const content = (await readFile(pathInput)).toString().trim()
  const newContent = `${diaryInput.join(' ')}${SEPARATOR}${content}`
  await writeFile(pathInput, newContent)
  log(diaryInput.join(' '), 'back')
  log('sep')
  log(`${pathInput} updated`, 'info')

  if (!['diary:tech', 'diary'].includes(mode)) {
    return
  }

  const timeData = await readJson(dataPath)
  if (!timeData[mode]) {
    return
  }

  const today = dayjs().format('YYYY-MM-DD')
  if (today === timeData[mode]) {
    return
  }

  const diaryDir = pathInput.split('/').slice(0, -1).join('/')
  await execCommand(outCommand, diaryDir)

  await writeJson(dataPath, { ...timeData, [mode]: today })
}

exports.DIARY_MAP = DIARY_MAP
exports.diary = diary
