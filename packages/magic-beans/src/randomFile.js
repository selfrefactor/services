const vscode = require('vscode')
const { configAnt } = require('./ants/config')
const { logToUser } = require('./bar')
const { REQUEST_RANDOM_FILE } = require('./constants')
const { scanFolder } = require('helpers-fn')
const { setter, getter, delay, shuffle, removeIndex } = require('rambdax')

const RANDOM_FILE_SKIP_PATTERNS = configAnt('RANDOM_FILE_SKIP_PATTERNS')
const RANDOM_FILE_ALLOWED_EXTENSIONS = configAnt('RANDOM_FILE_ALLOWED_EXTENSIONS')
const RANDOM_FILE_FORBIDDEN_EXTENSIONS = configAnt('RANDOM_FILE_FORBIDDEN_EXTENSIONS')
const RANDOM_FILE_PERIOD = configAnt('RANDOM_FILE_PERIOD')

const PREFER_FILES_FLAG = false

class Delay{
  constructor(){
    this.timeout = null
  }
      delay(ms){
        return new Promise(resolve => {
          this.timeout = setTimeout(() => {
            resolve()
          }, ms)
        })
      }
      clear(){
        if (this.timeout){
          clearTimeout(this.timeout)
        }
      }
}

let delayInstance = new Delay()

function changeOpenedFile(filePath, callback = () => {}){
  // editor should have
  // "workbench.editor.enablePreview": true,
  const openPath = vscode.Uri.file(filePath)
  vscode.workspace.openTextDocument(openPath).then(doc => {
    vscode.window.showTextDocument(doc)
    delay(250).then(callback)
  })
}

async function randomFileInitialize(){
  const projectFolder = vscode.workspace.workspaceFolders[ 0 ].uri.path
  const files = await scanFolder({
    folder    : projectFolder,
    maxDepth  : 20,
    excludeFn : dir => RANDOM_FILE_SKIP_PATTERNS.includes(dir),
    filterFn  : filePath => {
      const [ passAllowedExtension ] = RANDOM_FILE_ALLOWED_EXTENSIONS.filter(singleExtension => filePath.endsWith(singleExtension))
      if (!passAllowedExtension) return false

      const [ failForbiddenExtension ] =
        RANDOM_FILE_FORBIDDEN_EXTENSIONS.filter(singleExtension =>
          filePath.endsWith(singleExtension))

      return !failForbiddenExtension
    },
  })

  if (files.length === 0){
    logToUser(`no files left`)

    return
  } 
  const randomized = shuffle(files)
  if (PREFER_FILES_FLAG){
    randomized.sort((a, b) => {
      if (a.includes('package.json')) return -1
      if (b.includes('package.json')) return 1

      return 0
    })
  }
  setter('files', randomized)
}

function requestRandomFile(){
  const files = getter('files')
  if(!files){
    logToUser('no files')
    return false
  }
  if (files.length === 0) return false
  const index = 0
  changeOpenedFile(files[ index ])
  setter('files', removeIndex(index, files))
  logToUser(`${ files.length - 1 } files left`)

  return true
}

async function requestRandomFileFn(){
  if (!getter(REQUEST_RANDOM_FILE)){
    await randomFileInitialize()
    setter(REQUEST_RANDOM_FILE, true)
  }
  requestRandomFile()
}

async function startAutomatedMode(){
  while (true){
    // wait either for user to request a file or for the period to pass
    await Promise.race([delay(RANDOM_FILE_PERIOD), delayInstance.delay(RANDOM_FILE_PERIOD)])
    const success = requestRandomFile()
    if (!success){
      await randomFileInitialize()
    }
  }
}

async function requestRandomFileAutomatedFn(){
  if (!getter(REQUEST_RANDOM_FILE)){
    await randomFileInitialize()
    setter(REQUEST_RANDOM_FILE, true)
    startAutomatedMode()
  }
  requestRandomFile()
}

exports.requestRandomFile = requestRandomFileFn
exports.requestRandomFileAutomated = requestRandomFileAutomatedFn
