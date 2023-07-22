const {envFn} = require('env-fn')
envFn('special')
const {buildStarsOf} = require('build-stars-of')
const {outputJson} = require('fs-extra')
const {allModes} = require('./config')

const currentMode = 'solid'

const SECOND_STEP_ERROR= false

void async function main(){
  const input = {...allModes[currentMode], ...(SECOND_STEP_ERROR ? {shouldRefreshScraped: false}: {}),}
  if(!input){
    throw new Error('!input')
  }

  const data = await buildStarsOf(input)
  await outputJson(`${__dirname}/${currentMode}-result.json`, data, {spaces : 2})
}()
