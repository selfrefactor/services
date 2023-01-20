import { equals, filter } from 'rambdax'
import settings from '../.vscode/settings.json'
import defaultSettings from '../.vscode/default-settings.json'
import { writeJsonSync } from 'fs-extra'

const compared = filter((x, prop) => {
  return equals(x, defaultSettings[prop])
}, settings)

writeJsonSync(`${__dirname}/compared.json`,compared, {spaces:2})
