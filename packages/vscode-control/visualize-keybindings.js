const { readJson } = require('fs-extra')

void async function main() {
  const fileContent = await readJson(`${__dirname}/.vscode/keybindings.json`)

  const filtered = fileContent.filter(({ command, comment }) => command && !command.startsWith('-') && (!comment || !comment.startsWith('===')))
  let sorted = filtered.sort((a, b) => a.key.localeCompare(b.key))
  console.log(sorted)
}()