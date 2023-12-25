process.on('unhandledRejection', console.log)
process.on('uncaughtException', console.log)

const depFn = require('dep-fn')
const { drop } = require('rambdax')

const { bump } = require('./services/bump/bump')
const { clone } = require('./services/clone/clone')
const { dvd } = require('./services/dvd/dvd.js')
const { deploy } = require('./services/de/deploy')
const { commit } = require('./services/commit/commit')
const { fastDeploy } = require('./services/d/fastDeploy')
const { log } = require('helpers-fn')
const { read } = require('./services/read/read')
const { pullAll } = require('./services/pull-all/pull-all')

async function runFn(){
  const [ firstArgumentRaw, secondArgument, thirdArgument, ...rest ] = drop(2)(process.argv)
  const firstArgument = firstArgumentRaw.toLowerCase()
  if (firstArgument === 'commit'){
    return commit(secondArgument, thirdArgument, ...rest)
  }
  if ([ 'pull', 'pull-all' ].includes(firstArgument)){
    return pullAll()
  }

  if (firstArgument === 'bump'){
    return bump(secondArgument)
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

  if (firstArgument === 'de'){
    return deploy()
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
