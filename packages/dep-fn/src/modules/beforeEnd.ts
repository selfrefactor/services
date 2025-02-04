import {unlinkSync} from 'fs'
import {writeJsonSync} from 'fs-extra'
import {join} from 'path'
import {Dependencies} from '../../typings'
import { sortObject } from 'rambdax'

let sortFn = (aProp, bProp) => {
	if(aProp === bProp) return 0

	return aProp.localeCompare(bProp)
}

export const beforeEnd = (input: Dependencies): void => {
  const filePath = join(process.cwd(), 'package.json')

  unlinkSync(filePath)
	let dependencies = sortObject(sortFn, input.dependencies)
	let devDependencies = sortObject(sortFn, input.devDependencies)

  const newPackageJson = {
		...input.packageJson,
		dependencies,
		devDependencies,
	}

  writeJsonSync(filePath, newPackageJson, {spaces: 2})

  console.log('end')
}
