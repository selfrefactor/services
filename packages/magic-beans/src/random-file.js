const vscode = require('vscode')
const { getter, removeIndex, setter, shuffle } = require('rambdax')
const { configAnt } = require('./ants/config')
const { logToUser } = require('./bar')
const { REQUEST_RANDOM_FILE } = require('./constants')
const { scanFolder } = require('helpers-fn')
const { dirname } = require('node:path')

const RANDOM_FILE_SKIP_DIRECTORIES = configAnt('RANDOM_FILE_SKIP_DIRECTORIES')
const RANDOM_FILE_ALLOWED = configAnt('RANDOM_FILE_ALLOWED')
const RANDOM_FILE_FORBIDDEN = configAnt('RANDOM_FILE_FORBIDDEN')
const RANDOM_FILE_ALLOWED_DIRECTORY = configAnt('RANDOM_FILE_ALLOWED_DIRECTORY')

const CURRENT_SUBFOLDER = 'CURRENT_SUBFOLDER'

function changeOpenedFile(filePath) {
  const openPath = vscode.Uri.file(filePath)
  vscode.workspace.openTextDocument(openPath).then((doc) => {
    vscode.window.showTextDocument(doc)
  })
}

const LISTENER = 'LISTENER'

let latestFilePath = ''
let previousLine = 0

function activateListener(context) {
  const disposable = vscode.window.onDidChangeTextEditorSelection((event) => {
    const activeEditor = vscode.window.activeTextEditor
    if (activeEditor) {
      const document = activeEditor.document
      let filePath = document.fileName
      if (filePath === latestFilePath){
        latestFilePath = filePath
      }
      if(document.lineCount <=2) return

      const lastLine = document.lineCount - 1
      const activeLine = activeEditor.selection.active.line

      if (activeLine === lastLine && previousLine+1 === activeLine) {
        requestRandomFile()
      }else{
        previousLine = activeLine
      }
    }
  })

  context.subscriptions.push(disposable)
}

async function randomFileInitialize(
  projectFolder,
  context,
  skipDirectories = RANDOM_FILE_SKIP_DIRECTORIES,
) {
  try {
    if (!setter(LISTENER)) {
      setter(LISTENER, true)
      activateListener(context)
    }
    const files = await scanFolder({
      excludeFn: (dir) => skipDirectories.includes(dir),
      filterFn: (filePath) => {
        const [passAllowed] = RANDOM_FILE_ALLOWED.filter((singleExtension) =>
          filePath.endsWith(singleExtension),
        )
        if (!passAllowed) return false
        const allowedDirectory = RANDOM_FILE_ALLOWED_DIRECTORY
          ? filePath.includes(RANDOM_FILE_ALLOWED_DIRECTORY)
          : undefined

        const [failForbidden] = RANDOM_FILE_FORBIDDEN.filter(
          (singleExtension) => filePath.endsWith(singleExtension),
        )
        if (allowedDirectory === undefined) return !failForbidden

        return allowedDirectory && !failForbidden
      },
      folder: projectFolder,
      maxDepth: 20,
    })

    if (files.length === 0) {
      logToUser('no files left')

      return
    }
    const randomized = shuffle(files)
    setter('files', randomized)
  } catch (err) {
    console.log(err)
    logToUser('error')
  }
}

function requestRandomFile() {
  const files = getter('files')
  if (!files) {
    logToUser('no files')

    return false
  }
  if (files.length === 0) return false
  const index = 0
  changeOpenedFile(files[index])
  setter('files', removeIndex(index, files))
  logToUser(`${files.length - 1} files left | Magic beans random file mode`)

  return true
}

function requestRandomFileFn(context) {
  return async () => {
    if (!getter(REQUEST_RANDOM_FILE)) {
      const projectFolder = vscode.workspace.workspaceFolders[0].uri.path

      await randomFileInitialize(projectFolder, context)
      setter(REQUEST_RANDOM_FILE, true)
    }
    requestRandomFile()
  }
}

function getCurrentDirectory() {
  if (!vscode.window.activeTextEditor) {
    return {
      directory: vscode.workspace.workspaceFolders[0].uri.path,
      skipDirectories: RANDOM_FILE_SKIP_DIRECTORIES,
    }
  }
  const previousDirectory = getter(CURRENT_SUBFOLDER)
  const filePath = vscode.window.activeTextEditor.document.fileName
  // get directory of `filePath` using node.js path module
  const directory = dirname(filePath)

  if (previousDirectory !== directory) {
    setter(CURRENT_SUBFOLDER, directory)
    setter(REQUEST_RANDOM_FILE, false)
  }

  return { directory, skipDirectories: [] }
}


async function requestRandomFileWithSubfolderRightClick(data, context) {
  const directory = data.fsPath
  await randomFileInitialize(directory, context, [])
  setter(REQUEST_RANDOM_FILE, true)
  requestRandomFile()
}

exports.requestRandomFile = requestRandomFileFn
exports.requestRandomFileWithSubfolderRightClick =
requestRandomFileWithSubfolderRightClick
