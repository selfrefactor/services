import {unlinkSync} from 'fs'
import {writeFileSync} from 'fs-extra'
import * as jsonFormat from 'json-format'
import {join} from 'path'
import {merge} from 'rambdax'
import {Dependencies} from '../../typings'

export const beforeEnd = (input: Dependencies): void => {
  const filePath = join(process.cwd(), 'package.json')

  unlinkSync(filePath)

  const newProps = {
    dependencies: input.dependencies,
    devDependencies: input.devDependencies,
  }

  const newPackageJson = merge(input.packageJson, newProps)

  writeFileSync(filePath, jsonFormat(newPackageJson))

  console.log('end')
}
