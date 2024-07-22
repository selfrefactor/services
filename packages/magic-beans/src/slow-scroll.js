// taken from https://github.com/windwp/scroll_auto
const vscode = require('vscode')
const { configAnt } = require('./ants/config')
const { initSlowScrollBars } = require('./bar')
const { SLOW_SCROLL_START, SLOW_SCROLL_STOP, SLOW_SCROLL_KEY } = require('./constants')
const { setter } = require('rambdax')
const STEP_MS = configAnt('SLOW_SCROLL_MS')
const SLOW_SCROLL_LINES_TO_SCROLL = configAnt('SLOW_SCROLL_LINES_TO_SCROLL')

class ScrollController{
  dispose(){
    this.stopScroll()
  }

  startScroll(line){
    this._line = line
    this.scrollInterval = setInterval(() => {
      const result = this.scroll(this._line)
      if (result === false){
        this.stopScroll()
      }
    },
    STEP_MS ? Number(STEP_MS) : 700)
  }
  // handle if same file as before
  scroll(line){
    const editor = vscode.window.activeTextEditor
    if (!editor){
      return false
    }
    const currentPosition = editor.selection.active
    const documentLineCount = editor.document.lineCount
    if (currentPosition.line === documentLineCount - 1){
      return 
    }
    let moveToLine = currentPosition.line + line > documentLineCount - 1 ? documentLineCount - 1 : currentPosition.line + line
    const moveToCharactor =
      editor.document.lineAt(moveToLine).firstNonWhitespaceCharacterIndex
    const newPosition = new vscode.Position(moveToLine, moveToCharactor)
    editor.selection = new vscode.Selection(newPosition, newPosition)
    editor.revealRange(editor.selection,
      vscode.TextEditorRevealType.InCenter)

    return true
  }

  stopScroll(){
    if (this.scrollInterval){
      clearInterval(this.scrollInterval)
    }
  }
}

let initFlag = false

function slowScrollInit(context){
  return () => {
    if (initFlag) return
    if (!initFlag){
      initFlag = true
      initSlowScrollBars()
    }
    const controller = new ScrollController()

    const stopHandler = vscode.commands.registerCommand(SLOW_SCROLL_STOP,
      () => {
        setter(SLOW_SCROLL_KEY, false)
        controller.stopScroll()
      })

    const downHandler = vscode.commands.registerCommand(SLOW_SCROLL_START,
      () => {
        setter(SLOW_SCROLL_KEY, true)
        controller.startScroll(SLOW_SCROLL_LINES_TO_SCROLL)
      })

    context.subscriptions.push(downHandler)
    context.subscriptions.push(stopHandler)
    context.subscriptions.push(controller)
  }
}

exports.slowScrollInit = slowScrollInit
