const { CWD } = require('../../constants')
const { execCommand } = require('../../modules/execCommand')
const { mapParallelAsyncWithLimit } = require('rambdax')

async function pullAll() {
  const [lsOutput] = await execCommand('ls', CWD, true)
  const folders = lsOutput
    .trim()
    .split('\n')
    .filter(x => !x.includes('.'))

  await mapParallelAsyncWithLimit(
    async folder => {
      const currentFolder = `${CWD}/${folder}`
      console.log(currentFolder, 'currentFolder')
      await execCommand('git checkout main', currentFolder)
      await execCommand('git checkout master', currentFolder)
      await execCommand('git pull', currentFolder)
    },
    5,
    folders,
  )
}

exports.pullAll = pullAll
