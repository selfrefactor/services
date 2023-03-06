const { interpolate } = require('rambdax')
const { readJson, outputFile } = require('fs-extra')

const destination = `${ __dirname }/LEARN_KEYBINDINGS.md`
const template = `
## {{key}}

Command: {{command}}
`.trim()

const templateWithComment = `
## {{key}}

Command: {{command}}

> Comment: {{comment}}
`.trim()

const snippetTemplate = `
## {{key}}

Command: {{command}}

> Snippet: {{snippet}}
`.trim()

const CONVENIENT_BUTTONS = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'a',
  'c',
  'd',
  'e',
  'g',
  'q',
  'r',
  's',
  't',
  'v',
  'w',
  'x',
  'z',
  '-',
  '=',
]

let CONVENIENT_KEYS = [ 'ctrl', 'alt', 'ctrl+shift', 'capslock' ].flatMap(x =>
  CONVENIENT_BUTTONS.map(y => x === 'capslock' ? `${x} ${y}` : `${ x }+${ y }`))

const removeFromConvenientKeys = key => {
  CONVENIENT_KEYS = CONVENIENT_KEYS.filter(x => x !== key)
}

void (async function main(){
  const fileContent = await readJson(`${ __dirname }/.vscode/keybindings.json`)

  const filtered = fileContent.filter(({ command }) =>
    command && !command.startsWith('-')).filter(({key, alreadyLearned}) => {
      removeFromConvenientKeys(key)
      return !alreadyLearned
    })
  const sorted = filtered.sort((a, b) => {
    if(a.priority && !b.priority) return -1
    if(b.priority && !a.priority) return 1
    return a.key.localeCompare(b.key)
  })

  const outputContent = sorted
    .map(({ key: keyInput, command: commandInput, args, comment, when }) => {
      const key = keyInput.split('+').join('  ')
      const command =
        when === 'editorLangId==python' ?
          `PYTHON ONLY - ${ commandInput }` :
          commandInput

      if (args){
        const snippetInfo = args.snippet ?? args.name

        return interpolate(snippetTemplate, {
          key     : key.toUpperCase(),
          command,
          snippet : snippetInfo,
        })
      }
      if (comment){
        return interpolate(templateWithComment, {
          key : key.toUpperCase(),
          command,
          comment,
        })
      }

      return interpolate(template, {
        key : key.toUpperCase(),
        command,
      })
    })
    .join('\n\n')

  const finalContent = `
# Keybindings

${ outputContent }

## Convenient keys

${ CONVENIENT_KEYS.map(x => `* ${ x }`).join('\n') }
`.trim()

  await outputFile(destination, finalContent)
})()
