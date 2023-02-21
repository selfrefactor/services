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
void (async function main(){
  const fileContent = await readJson(`${ __dirname }/.vscode/keybindings.json`)

  const filtered = fileContent.filter(({ alreadyLearned, command }) =>
    command && !command.startsWith('-') && !alreadyLearned)
  const sorted = filtered.sort((a, b) => b.key.localeCompare(a.key))

  const outputContent = sorted
    .map(({ key, command: commandInput, args, comment, when }) => {
      const command =
        when === 'editorLangId==python' ?
          `PYTHON ONLY - ${ commandInput }` :
          commandInput

      if (args){
        const snippetInfo = args.snippet ?? args.name

        return interpolate(snippetTemplate, {
          key     : key.toUpperCase(),
          command,
          snippet : `Snippet: ${ snippetInfo }`,
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

  await outputFile(destination, outputContent)
})()
