const { interpolate, join, last, maybe, piped, split, splitEvery, takeLast } = require('rambdax');
const { readJson, outputFile } = require('fs-extra');
const getMarkdownTable = async () => {
  const { markdownTable } = await import('markdown-table');
  return markdownTable;
};

const destination = `${ __dirname }/LEARN_KEYBINDINGS.md`
const destinationOld = `${ __dirname }/LEARN_KEYBINDINGS_OLD.md`
const template = `
## {{key}}

\`{{command}}\`
`.trim()

const templateWithComment = `
## {{key}}

\`{{command}}\`

{{comment}}
`.trim()

const snippetTemplate = `
## {{key}}

\`{{command}}\`

> Snippet: {{snippet}}
`.trim()

const CONVENIENT_BUTTONS = [
  '1',
  '2',
  '3',
  '4',
  '5',
  'a',
  'c',
  'd',
  'e',
  'f',
  'g',
  'q',
  'r',
  's',
  'v',
  'w',
  'x',
  '`',
  'z',
]
let CONVENIENT_KEYS = [ 'ctrl', 'alt','ctrl+shift' ].flatMap(x =>
  CONVENIENT_BUTTONS.map(y => x === 'capslock' ? `${x} ${y}` : `${ x }+${ y }`))

const PERMANENT_KEYS = [
	'ctrl+1',
	'ctrl+z',
	'ctrl+a',
	'ctrl+c',
	'ctrl+v',
	'ctrl+f',
	'ctrl+s',
	'ctrl+y',
	'ctrl+x',
	'alt+w',
]	
	
const removeFromConvenientKeys = key => {
  CONVENIENT_KEYS = CONVENIENT_KEYS.filter(x => x !== key)
}
PERMANENT_KEYS.forEach(removeFromConvenientKeys)

void (async function main(){
	let lines = []
  const fileContent = await readJson(`${ __dirname }/.vscode/keybindings.json`)

  const filtered = fileContent.filter(({ command }) =>
    command && !command.startsWith('-')).filter(({key, alreadyLearned}) => {
      removeFromConvenientKeys(key)
      return !alreadyLearned
    })
  const sorted = filtered.sort((a, b) => {
    if(a.priority && !b.priority) return -1
    if(b.priority && !a.priority) return 1
		return 0
  })
	let fixLongCommand = command => {
		if(command.length < 30) return command

		let result = piped(
			command,
			split('.'),
			takeLast(2),
			join('.'),
		)

		let fallback = piped(
			command,
			split('.'),
			last
		)

		return result.length < 30 ? result : fallback
	}
  const outputContent = sorted
    .map(({ key: keyInput, command: commandInput, hint, args, comment, when }) => {
      const key = keyInput.split('+').join('  ')
      const command =
			fixLongCommand(when === 'editorLangId==python' ?
          `PYTHON ONLY - ${ commandInput }` :
          commandInput)

      if (args){
        const snippetInfo = args.snippet ?? args.name

				lines.push({
					key: keyInput.toUpperCase(),
					command: `Snippet - ${ snippetInfo }`
				})

        return interpolate(snippetTemplate, {
          key     : key.toUpperCase(),
          command,
          snippet : snippetInfo,
        })
      }
			lines.push({ key: keyInput.toUpperCase(), command: comment ?? command })

      if (comment || hint){
        let commentInput = maybe(
          hint,
           () =>comment ? `> ${ comment }\n\n HINT: ${ hint.toUpperCase() }` : `> HINT: ${ hint.toUpperCase() }`,
          `> ${ comment }`
        )
        return interpolate(templateWithComment, {
          key : key.toUpperCase(),
          command,
          comment: commentInput,
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

  await outputFile(destinationOld, finalContent)
	let splitted = splitEvery(
		Math.ceil(lines.length / 2),
		lines
	)
	let fourColumns = splitted[0].map(({ key, command }, i) => {
		return {
			key,
			command,
			keySecond: splitted[1][i]?.key ?? '',
			commandSecond: splitted[1][i]?.command ?? ''
		}
	})
	const markdownTable = await getMarkdownTable();
	let markdownTableContent = markdownTable([
		[ 'Key', 'Command', 'Key', 'Command' ],
		...fourColumns.map(({ key, command, keySecond, commandSecond }) => [ key, command, keySecond, commandSecond ]),
	])
  await outputFile(destination, markdownTableContent)
})()
