const vscode = require('vscode')
const {
  delay,
  getter,
  removeIndex,
  setter,
  shuffle,
  waitFor,
} = require('rambdax')
const { configAnt } = require('./ants/config')
const { logToUser } = require('./bar')
const { REQUEST_RANDOM_FILE } = require('./constants')
const { scanFolder } = require('helpers-fn')

const RANDOM_FILE_SKIP_PATTERNS = configAnt('RANDOM_FILE_SKIP_PATTERNS')
const RANDOM_FILE_ALLOWED_EXTENSIONS = configAnt('RANDOM_FILE_ALLOWED_EXTENSIONS')
const RANDOM_FILE_FORBIDDEN_EXTENSIONS = configAnt('RANDOM_FILE_FORBIDDEN_EXTENSIONS')
const RANDOM_FILE_PERIOD = configAnt('RANDOM_FILE_PERIOD')

const PREFER_PACKAGE_JSON = false

class Delay{
  constructor(){
    this.timeout = null
    this.actionIsApplied = false
  }

  actionApplied(){
    this.actionIsApplied = true
  }

  clear(){
    if (this.timeout) clearTimeout(this.timeout)
  }

  delay(ms){
    return new Promise(resolve => {
      this.timeout = setTimeout(() => {
        resolve()
      }, ms)
    })
  }

  async startWaitingForAction(ms){
    this.actionIsApplied = false
    let timestamp = Date.now()
    await waitFor(
      () => this.actionIsApplied === true, ms, 100
    )()

    if (this.actionIsApplied === true) return Date.now() - timestamp
  }
}

const delayInstance = new Delay()

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
    excludeFn : dir => RANDOM_FILE_SKIP_PATTERNS.includes(dir),
    filterFn  : filePath => {
      const [ passAllowedExtension ] = RANDOM_FILE_ALLOWED_EXTENSIONS.filter(singleExtension => filePath.endsWith(singleExtension))
      if (!passAllowedExtension) return false

      const [ failForbiddenExtension ] =
        RANDOM_FILE_FORBIDDEN_EXTENSIONS.filter(singleExtension =>
          filePath.endsWith(singleExtension))

      return !failForbiddenExtension
    },
    folder   : projectFolder,
    maxDepth : 20,
  })

  if (files.length === 0){
    logToUser('no files left')

    return
  }
  const randomized = shuffle(files)
  if (PREFER_PACKAGE_JSON)
    randomized.sort((a, b) => {
      if (a.includes('package.json')) return -1
      if (b.includes('package.json')) return 1

      return 0
    })

  setter('files', randomized)
}

function requestRandomFile(){
  const files = getter('files')
  if (!files){
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
  delayInstance.actionApplied()
}

async function startAutomatedMode(){
  requestRandomFile()
  while (true){
    // wait either for user to request a file or for the period to pass
    const result = await Promise.race([
      delay(RANDOM_FILE_PERIOD),
      delayInstance.delay(RANDOM_FILE_PERIOD),
      delayInstance.startWaitingForAction(RANDOM_FILE_PERIOD),
    ])
    if (typeof result === 'number'){

    }
    const success = requestRandomFile()
    if (!success) await randomFileInitialize()
  }
}

async function requestRandomFileAutomatedFn(){
  // so it doesn't matter which action is triggered as long as init process is done
  if (getter(REQUEST_RANDOM_FILE)){
    requestRandomFile()
    delayInstance.actionApplied()

    return
  }
  await randomFileInitialize()
  setter(REQUEST_RANDOM_FILE, true)
  startAutomatedMode()
}

exports.requestRandomFile = requestRandomFileFn
exports.requestRandomFileAutomated = requestRandomFileAutomatedFn
