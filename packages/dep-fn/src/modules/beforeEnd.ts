import {existsSync, unlinkSync} from 'fs'
import {writeFileSync} from 'fs-extra'
import * as jsonFormat from 'json-format'
import {join} from 'path'
import {merge} from 'rambdax'
import {Dependencies} from '../../typings'

export const beforeEnd = (input: Dependencies): void => {
  const filePath = join(process.cwd(), 'package.json')
  const lockFilePath = join(process.cwd(), 'yarn.lock')
  const lockFilePath2 = join(process.cwd(), 'package-lock.json')

  unlinkSync(filePath)

  if (existsSync(lockFilePath)) {
    unlinkSync(lockFilePath)
    unlinkSync(lockFilePath2)
  }

  const newProps = {
    dependencies: input.dependencies,
    devDependencies: input.devDependencies,
  }

  const newPackageJson = merge(input.packageJson, newProps)

  writeFileSync(filePath, jsonFormat(newPackageJson))

  console.log('end')
}
