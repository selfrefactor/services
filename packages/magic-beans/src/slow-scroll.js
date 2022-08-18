// taken from https://github.com/windwp/scroll_auto
const vscode = require('vscode')
const { configAnt } = require('./ants/config')

const STEP = configAnt(
  'SLOW_SCROLL'
)

class ContextKey{
  constructor(name){
    this._name = name
  }

  set(value){
    if (this._lastValue === value){
      return
    }
    this._lastValue = value
    vscode.commands.executeCommand(
      'setContext', this._name, this._lastValue
    )
  }
}

class ScrollController{
  dispose(){
    this.stopScroll()
    this._disposable.dispose()
  }

  constructor(){
    this.isAutoScroll = new ContextKey('scroll.isStart')
    const subscriptions = []
    this._disposable = vscode.Disposable.from(...subscriptions)
  }

  startScroll(line){
    this._line = line
    if (this._isRunning){
      return
    }
    this._isRunning = true
    this.isAutoScroll.set(this._isRunning)
    this.scrollInterval = setInterval(() => {
      const result = this.scroll(this._line)
      if (!result){
        this.stopScroll()
      }
    }, STEP ? Number(STEP) : 700)
  }

  scroll(line){
    const editor = vscode.window.activeTextEditor
    if (!editor){
      return false
    }
    const currentPosition = editor.selection.active
    let moveToLine = currentPosition.line + line
    const documentLineCount = editor.document.lineCount
    if (moveToLine > documentLineCount - 1){
      moveToLine = documentLineCount - 1

      return false
    }
    if (moveToLine < 0){
      moveToLine = 0

      return false
    }
    const moveToCharactor =
      editor.document.lineAt(moveToLine).firstNonWhitespaceCharacterIndex
    const newPosition = new vscode.Position(moveToLine, moveToCharactor)
    editor.selection = new vscode.Selection(newPosition, newPosition)
    editor.revealRange(editor.selection,
      vscode.TextEditorRevealType.InCenter)

    return true
  }

  stopScroll(){
    if (this._isRunning){
      this._isRunning = false
      if (this.scrollInterval){
        this.isAutoScroll.set(false)
        clearInterval(this.scrollInterval)
      }
    }
  }
}

let initFlag = false

function slowScroll(context){
  return () => {
    if(initFlag) return
    if(!initFlag) initFlag = true
    const controller = new ScrollController()

    const stopHandler = vscode.commands.registerCommand('magicBeans.slowScrollStop',
      () => {
        controller.stopScroll()
      })

    const downHandler = vscode.commands.registerCommand('magicBeans.slowScrollStart',
      () => {
        controller.startScroll(1)
      })
  
    context.subscriptions.push(downHandler)
    context.subscriptions.push(stopHandler)
    context.subscriptions.push(controller)
  }
}

exports.slowScroll = slowScroll
