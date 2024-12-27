import {beforeEnd} from './modules/beforeEnd'
import {getUpdateDependencies} from './modules/getUpdateDependencies'
import {getDependencies} from './modules/helpers/getDependencies'

export async function update(input: any): Promise<void> {
	let isParallel = input.parallel ?? false
	let parrallelLimit = input.parrallelLimit ?? 6
  const {devDependencies, dependencies, peerDependencies, packageJson} =
    getDependencies()

  const updatedDependencies = await getUpdateDependencies(dependencies, isParallel, parrallelLimit)
  const updatedDevDependencies = await getUpdateDependencies(devDependencies, isParallel, parrallelLimit)

  const updatedPeerDependencies = await getUpdateDependencies(
    peerDependencies,
		isParallel,
		parrallelLimit
  )

  beforeEnd({
    dependencies: updatedDependencies,
    devDependencies: updatedDevDependencies,
    packageJson: packageJson,
    peerDependencies: updatedPeerDependencies,
  })
}
