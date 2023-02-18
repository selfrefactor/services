const { readJson } = require('fs-extra')

void async function main() {
  const fileContent = await readJson(`${__dirname}/.vscode/keybindings.json`)
  console.log(fileContent, `fileContent`)
}()