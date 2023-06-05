const {execCommand} = require('../../modules/execCommand')
const {existsSync} = require('fs')
const {log} = require('helpers-fn')
const { piped, split, last } = require('rambdax')
const { CWD } = require('../../constants')

async function dvd(repoInput) {
  console.log(CWD)
  // const flag = repoInput.startsWith('https://github.com/')
  // const repoID = flag ? piped(repoInput, split('https://github.com/'), last) : `selfrefactor/${repoInput}`
  // const [,repoName] = repoID.split(`/`)

  // const command = `git clone git@github.com:${repoID}.git` 
  // await execCommand(flag ? `${command} --depth 1`: command)
  // console.log(flag ? `${command} --depth 1`: command)

  // const maybePackageJson = `${process.cwd()}/${repoName}/package.json`
  // if (!existsSync(maybePackageJson)) {
  //   return log('No package json found, will skip install process', 'info')
  // }
  // const maybePackageLock = `${process.cwd()}/${repoName}/package-lock.json`
  // const dependencyInstaller = existsSync(maybePackageLock) ? 'npm' : 'yarn'
  // await execCommand(
  //   `${dependencyInstaller} install`,
  //   `${process.cwd()}/${repoName}`
  // )
}

exports.dvd = dvd
