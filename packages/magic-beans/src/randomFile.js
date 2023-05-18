const vscode = require('vscode')
const {
  setter,
  getter,
  delay,
  shuffle,
  random,
  removeIndex,
} = require('rambdax')
const {configAnt} = require('./ants/config')
const {logToUser} = require('./bar')
const {REQUEST_RANDOM_FILE} = require('./constants')
const {scanFolder} = require('helpers-fn')

const RANDOM_FILE_SKIP_PATTERNS = configAnt('RANDOM_FILE_SKIP_PATTERNS')
const RANDOM_FILE_ALLOWED_EXTENSIONS = configAnt(
  'RANDOM_FILE_ALLOWED_EXTENSIONS'
)
const RANDOM_FILE_FORBIDDEN_EXTENSIONS = configAnt(
  'RANDOM_FILE_FORBIDDEN_EXTENSIONS'
)

function changeOpenedFile(filePath, callback = () => {}) {
  // editor should have
  // "workbench.editor.enablePreview": true,
  const openPath = vscode.Uri.file(filePath)
  vscode.workspace.openTextDocument(openPath).then(doc => {
    vscode.window.showTextDocument(doc)
    delay(250).then(callback)
  })
}

async function randomFile() {
  const projectFolder = vscode.workspace.workspaceFolders[0].uri.path
  const files = await scanFolder({
    folder: projectFolder,
    maxDepth: 20,
    excludeFn: dir => RANDOM_FILE_SKIP_PATTERNS.includes(dir),
    filterFn: filePath => {
      if(filePath.endsWith('package.json')) return true
      const [
        passAllowedExtension,
      ] = RANDOM_FILE_ALLOWED_EXTENSIONS.filter(singleExtension =>
        filePath.endsWith(singleExtension)
      )
      if (!passAllowedExtension) return false

      const [
        failForbiddenExtension,
      ] = RANDOM_FILE_FORBIDDEN_EXTENSIONS.filter(singleExtension =>
        filePath.endsWith(singleExtension)
      )

      return Boolean(failForbiddenExtension) ? false : true
    },
  })

  if (files.length === 0) return
  const randomized = shuffle(files)
  randomized.sort((a, b) => {
    if(a.includes('package.json')) return -1
    if(b.includes('package.json')) return 1
    return 0
  })
  setter('files', shuffle(randomized))
  requestRandomFile()
}

function requestRandomFile() {
  const files = getter('files')
  if (files.length === 0) return
  const index = 0
  // const index = random(0, files.length - 1)
  changeOpenedFile(files[index])
  setter('files', removeIndex(index, files))
  logToUser(`${files.length - 1} files left`)
}

async function requestRandomFileFn(){
  if (!getter(REQUEST_RANDOM_FILE)){
    await randomFile()
    setter(REQUEST_RANDOM_FILE, true)
  } 
  requestRandomFile()
}

exports.requestRandomFile = requestRandomFileFn
