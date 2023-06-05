const {execCommand} = require('../../modules/execCommand')
const {existsSync} = require('fs')
const {log, scanFolder} = require('helpers-fn')
const { piped, split, last, mapAsync, tryCatchAsync, remove } = require('rambdax')
const { CWD } = require('../../constants')

async function dvd(label) {
  console.log(CWD)
  const files = await scanFolder({
    folder: CWD,
    filterFn: x => x.toLowerCase().endsWith('.vob'),
  })
  const fn = async function(file, i){
    let fileName = remove(`${ CWD }/`, file)
    let command = `ffmpeg -i ${ fileName } -c:v libx264 -preset slow -crf 22 -c:a aac -b:a 128k ${label}-${i}.mp4`
    console.log( command )
    console.log(fileName, `fifileNamele`)
  }
  let iterable = async function(file, i){
    await tryCatchAsync((x) => fn(x, i), (err) => console.log(err))(file)
  }
  await mapAsync(iterable, files)
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
