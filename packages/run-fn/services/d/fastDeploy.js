const { execCommand } = require('../../modules/execCommand')
const { head } = require('rambdax')

function parse(initialInput) {
  if (initialInput.length === 2 && !head(initialInput)) {
    return {
      inputArguments: ['Small change'],
      commitArguments: '',
    }
  }
  const commitArguments =
    initialInput.includes('-n') || initialInput.includes('skip') ? '-n' : ''

  const input = commitArguments
    ? initialInput.filter(x => x !== '-n' && x !== 'skip')
    : initialInput

  return {
    inputArguments: input,
    commitArguments,
  }
}

async function fastDeploy(...inputArgumentsRaw) {
  const { inputArguments, commitArguments } = parse(inputArgumentsRaw)

  const commitMessage = inputArguments.join(' ').trim()
  await execCommand('git add . --all')
  await execCommand(`git commit -m ${commitArguments} "${commitMessage}"`)
  await execCommand('git push')

  console.log(`Pushed with message '${commitMessage}'`)
}

exports.fastDeploy = fastDeploy
