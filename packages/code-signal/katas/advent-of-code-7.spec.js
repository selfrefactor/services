function getCommandType(command){
  if (command.startsWith('ls ') || command === 'ls') {
    return {
      type: 'list directory',
      path: command.replace('ls', '')
    }
  }
  if (command.startsWith('cd ')) 
  {
    return {
      type: 'change directory',
      path: command.replace('cd ', '')
    }
  }
  if (command.startsWith('dir ')) {
    return {
      type: 'list files in directory',
      path: command.replace('dir ', '')
    }
  }
  console.log(command.length, `command`)
  throw Error('Unknown command')
}
const isCommand = line => line.startsWith('$ ') || line.startsWith('dir ')

class FileSystemF {
  lineNumber = 0
  input = null
  informationSequence = []
  currentCWD = '/'
  constructor(input) {
    this.input = input
  }
  attachToLastCommand(actualValueList){
    const lastCommand = this.informationSequence[this.informationSequence.length-1]
    if(lastCommand){
      lastCommand.value = actualValueList
    }
  }
  readNextBatch () {
    if (this.lineNumber === this.input.length) {
      return {isOver: true}
    }
    if(isCommand(this.input[this.lineNumber])){
      let command = this.input[this.lineNumber].replace('$ ', '')
      this.lineNumber++
      return {
        ...getCommandType(command),
        isOver: this.lineNumber === this.input.length,
      }
    }
    const actualValueList = []
    let found = false
    while (!found || this.lineNumber <= this.input.length-1) {
      const line = this.input[this.lineNumber]
      if(!line){
        found = true
        break
      }
      if (isCommand(line)) {
        found = true
        break
      }
      actualValueList.push(line)
      this.lineNumber++
    }
    this.attachToLastCommand(actualValueList)
    return {
      isOver: !found,
    }
  }
  changeDirectory(path){
    console.log(path, `path`)
    if(path === '/'){
      this.currentCWD = '/'
      return
    }
    if(path === '..'){
      this.currentCWD = this.currentCWD.split('/').slice(0, -1).join('/')
      return
    }
    this.currentCWD = `${this.currentCWD}/${path}`
  }
  readInformation = () => {
    let isOver = false
    while (!isOver) {
      const batch = this.readNextBatch()
      isOver = batch.isOver
      console.log(batch, `batch`)
      if(batch.type === 'change directory'){
        this.changeDirectory(batch.path)
      }
      this.informationSequence.push(batch)
    }
    return
  }
}
test('happy',  () => {
  const fileSystem = new FileSystemF(getDemoInput())
  console.log(typeof fileSystem, `fileSystem`)
  fileSystem.readInformation()
  console.log(fileSystem.informationSequence)
})

function getDemoInput(){
  return `
  $ cd /
  $ ls
  dir a
  14848514 b.txt
  8504156 c.dat
  dir d
  $ cd a
  $ ls
  dir e
  29116 f
  2557 g
  62596 h.lst
  $ cd e
  $ ls
  584 i
  $ cd ..
  $ cd ..
  $ cd d
  $ ls
  4060174 j
  8033020 d.log
  5626152 d.ext
  7214296 k
`.trim().split('\n').map(line => line.trim())
}

function getInput(){
return ``
}
