import { readFileSync, writeFileSync } from 'fs-extra'
import { resolve } from 'path'
const path = resolve('./.vscode/default-settings.json')

const content = readFileSync(path).toString()

const fixedContent = content
  .split('\n')
  .filter(x => !x.includes('//'))
  .join('\n')

writeFileSync(path, fixedContent)
