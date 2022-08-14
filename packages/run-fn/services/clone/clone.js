const {execCommand} = require('../../modules/execCommand')
const {existsSync} = require('fs')
const {log} = require('helpers-fn')
const { piped, split, last, remove } = require('rambdax')

async function clone(repoInput) {
  const repo = repoInput.startsWith('git@github.com') ? repoInput : 
    `git@github.com:selfrefactor/${repoInput}.git`
  const repoName = piped(repo, split(':'), last, remove('.git'))  

  await execCommand(`git clone ${repo}`)
  const maybePackageJson = `${process.cwd()}/${repoName}/package.json`
  if (!existsSync(maybePackageJson)) {
    return log('No package json found, will skip install process', 'info')
  }
  const maybePackageLock = `${process.cwd()}/${repoName}/package-lock.json`
  const dependencyInstaller = existsSync(maybePackageLock) ? 'npm' : 'yarn'
  await execCommand(
    `${dependencyInstaller} install`,
    `${process.cwd()}/${repo}`
  )
}

exports.clone = clone
