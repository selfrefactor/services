import { equals, filter } from 'rambdax'
import settings from '../.vscode/settings.json'
import settingsOld from '../.vscode/settings-old.json'
import { writeJsonSync } from 'fs-extra'

const first = filter((x, prop) => {
  return !equals(x, settingsOld[prop])
}, settings)
const second = filter((x, prop) => {
  return !equals(x, settings[prop])
}, settingsOld)

writeJsonSync(`${__dirname}/compared.json`,{first,second}, {spaces:2})
