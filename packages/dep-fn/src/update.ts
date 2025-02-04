import {beforeEnd} from './modules/beforeEnd'
import {getUpdateDependencies} from './modules/getUpdateDependencies'
import {getDependencies} from './modules/helpers/getDependencies'

export async function update(input: any): Promise<void> {
	let isParallel = input.parallel ?? false
	let parrallelLimit = input.parrallelLimit ?? 6
	let atLeast30DaysOld = input.atLeast30DaysOld ?? false
  const {devDependencies, dependencies, peerDependencies, packageJson} =
    getDependencies()

  const updatedDependencies = await getUpdateDependencies(dependencies, isParallel, parrallelLimit, atLeast30DaysOld)
  const updatedDevDependencies = await getUpdateDependencies(devDependencies, isParallel, parrallelLimit, atLeast30DaysOld)

  const updatedPeerDependencies = await getUpdateDependencies(
    peerDependencies,
		isParallel,
		parrallelLimit,
		atLeast30DaysOld
  )

  beforeEnd({
    dependencies: updatedDependencies,
    devDependencies: updatedDevDependencies,
    packageJson: packageJson,
    peerDependencies: updatedPeerDependencies,
  })
}
