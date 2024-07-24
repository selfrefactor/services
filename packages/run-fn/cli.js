process.on('unhandledRejection', console.log)
process.on('uncaughtException', console.log)

const depFn = require('dep-fn')
const { drop } = require('rambdax')

const { bump } = require('./services/bump/bump')
const { clone } = require('./services/clone/clone')
const { dvd } = require('./services/dvd/dvd.js')
const { fastDeploy } = require('./services/d/fastDeploy')
const { log } = require('helpers-fn')
const { read } = require('./services/read/read')
const { pullAll } = require('./services/pull-all/pull-all')
const { lintFile } = require('./services/lint/lint')
const { diary } = require('./services/diary/diary')

const DIARY_PATH = process.env.DIARY_PATH
const TECH_DIARY_PATH = process.env.TECH_DIARY_PATH

async function runFn(){
  const [ firstArgumentRaw, secondArgument, thirdArgument, ...rest ] = drop(2)(process.argv)
  const firstArgument = firstArgumentRaw.toLowerCase()
  if ([ 'pull', 'pull-all' ].includes(firstArgument)){
    return pullAll()
  }

  if (firstArgument === 'bump'){
    return bump(secondArgument)
  }
  if (firstArgument === 'diary'){
    return diary({
      envKey: 'DIARY_PATH',
      pathInput: DIARY_PATH,
      diaryInput: [ secondArgument, thirdArgument, ...rest ]
    })
  }
  if (firstArgument === 'diary:tech'){
    return diary({
      envKey: 'TECH_DIARY_PATH',
      pathInput: TECH_DIARY_PATH,
      diaryInput: [ secondArgument, thirdArgument, ...rest ]
    })
  }
  if (firstArgument === 'lint:file'){
    return lintFile(secondArgument, false)
  }
  if (firstArgument === 'lint:file:unsafe'){
    return lintFile(secondArgument, true)
  }

  if (firstArgument === 'dep'){
    return depFn.cli()
  }
  if (firstArgument === 'dvd'){
    return dvd(secondArgument)
  }

  if (firstArgument === 'depx'){
    return depFn.cli('update')
  }

  if (firstArgument === 'clone'){
    return clone(secondArgument)
  }

  if (firstArgument === 'read'){
    return read(secondArgument, thirdArgument)
  }

  if (firstArgument === 'd'){
    return fastDeploy(...[ secondArgument, thirdArgument, ...rest ])
  }

  log('Such method does not exist', 'error')
}

runFn().then(() => {
  console.log('')
})
