const { readJson, outputFile } = require('fs-extra')
const { interpolate } = require('rambdax')

let destination = `${ __dirname }/LEARN_KEYBINDINGS.md`

void (async function main(){
  const fileContent = await readJson(`${ __dirname }/.vscode/keybindings.json`)

  const filtered = fileContent.filter(({ alreadyLearned, command, comment }) =>
    command &&
      !command.startsWith('-') &&
      !comment?.startsWith('===') &&
      !alreadyLearned)
  const sorted = filtered.sort((a, b) => a.key.localeCompare(b.key))

  const outputContent = sorted.map(({ key, command }) => {
    let template = `
## {{key}}

{{command}}
`.trim()
    return interpolate(template, { key: key.toUpperCase(), command })
  }).join('\n\n')

  await outputFile(destination, outputContent)
})()
