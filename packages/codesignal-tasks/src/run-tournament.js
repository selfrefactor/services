const { playwrightInit, wrap } = require('playwright-wrap')
const { last, mapAsync, range } = require('rambdax')

const { createKata } = require('./_modules/create-kata')
const { parseChallengeData } = require('./_modules/parse-challenge-data')
const { KATA_DIR } = require('./constants')
const { getRawData, replSelector } = require('./scrape-challenge')

const URL_BASE = 'https://app.codesignal.com'
const LOGIN = `${ URL_BASE }/login`
const TOURNAMENT = id => `${ URL_BASE }/tournaments/${ id }/A`

function getAuthInfo(){
  const user = process.env.CODE_SIGNAL_USER
  const password = process.env.CODE_SIGNAL_PASSWORD
  if (!user && !password){
    throw new Error('process.env.CODE_SIGNAL_*')
  }

  return {
    user,
    password,
  }
}

const USER_FIELD = 'input[name="username"]'
const PASSWORD_FIELD = 'input[type="password"]'
const MODE = '[class="-layout-h -space-h-4 -center-center"]'
const TASK = '.tournament_task--task-status'

async function isCodewriting(_){
  const allModes = await _.page.$$(MODE)
  const currentMode = await allModes[ 1 ].textContent()

  return currentMode === 'codewriting'
}

const tasksIndexes = [ 'B', 'C', 'D', 'E', 'F', 'H' ]

async function scrapeTask(
  _, i, tournamentID, isFirst = false
){
  const url = `${ URL_BASE }/tournaments/${ tournamentID }/${ tasksIndexes[ i ] }`

  if (!isFirst){
    await _.goto(url)
    await _.waitFor(replSelector)
  }

  if (!await isCodewriting(_)) return

  const scrapeData = await getRawData(_)
  const parsedData = parseChallengeData(scrapeData)
  await createKata(KATA_DIR, parsedData)
}

async function runTournament(){
  console.time('tournament')
  const tournamentIDRaw = last(process.argv)
  const tournamentID = tournamentIDRaw.startsWith('http') ? last(tournamentIDRaw.split('/')): tournamentIDRaw
  const options = {
    headless      : process.env.HEADLESS !== 'OFF',
    logFlag       : false,
    url           : LOGIN,
    browser       : 'chromium',
    waitCondition : {
      waitUntil : 'domcontentloaded',
      timeout   : 600000,
    },
  }
  const { browser, page } = await playwrightInit(options)
  const _ = wrap(page)
  await _.waitFor(USER_FIELD)
  const { user, password } = getAuthInfo()
  await _.page.fill(USER_FIELD, user)
  await _.page.fill(PASSWORD_FIELD, password)
  await _.clickWithText('Sign in')
  await _.waitAgainst(USER_FIELD)
  await _.sleep()

  await _.goto(TOURNAMENT(tournamentID))
  await _.waitFor(replSelector)
  const numTasks = await _.count(TASK)
  await scrapeTask(
    _, 0, tournamentID, true
  )

  await mapAsync(async i => await scrapeTask(
    _, i, tournamentID
  ),
  range(0, numTasks - 1))
  await browser.close()
  console.timeEnd('tournament')
}

exports.runTournament = runTournament
