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
const RANDOM_FILE_ALLOWED = configAnt('RANDOM_FILE_ALLOWED')
const RANDOM_FILE_FORBIDDEN_EXTENSIONS = configAnt('RANDOM_FILE_FORBIDDEN_EXTENSIONS')


function changeOpenedFile(filePath){
  // editor should have
  // "workbench.editor.enablePreview": true,
  const openPath = vscode.Uri.file(filePath)
  vscode.workspace.openTextDocument(openPath).then(doc => {
    vscode.window.showTextDocument(doc)
  })
}

async function randomFileInitialize(){
  const projectFolder = vscode.workspace.workspaceFolders[ 0 ].uri.path
  const files = await scanFolder({
    excludeFn : dir => RANDOM_FILE_SKIP_PATTERNS.includes(dir),
    filterFn  : filePath => {
      const [ passAllowed ] = RANDOM_FILE_ALLOWED.filter(singleExtension => filePath.includes(singleExtension))
      if (!passAllowed) return false

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
  logToUser(`${ files.length - 1 } files left | Magic beans random file mode`)

  return true
}

async function requestRandomFileFn(){
  if (!getter(REQUEST_RANDOM_FILE)){
    await randomFileInitialize()
    setter(REQUEST_RANDOM_FILE, true)
  }
  requestRandomFile()
}

exports.requestRandomFile = requestRandomFileFn
