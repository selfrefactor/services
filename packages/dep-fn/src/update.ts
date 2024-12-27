import {beforeEnd} from './modules/beforeEnd'
import {getUpdateDependencies} from './modules/getUpdateDependencies'
import {getDependencies} from './modules/helpers/getDependencies'

export async function update(input: any): Promise<void> {
	let isParallel = input.parallel ?? false
  const {devDependencies, dependencies, peerDependencies, packageJson} =
    getDependencies()

  const updatedDependencies = await getUpdateDependencies(dependencies, isParallel)
  const updatedDevDependencies = await getUpdateDependencies(devDependencies, isParallel)

  const updatedPeerDependencies = await getUpdateDependencies(
    peerDependencies,
		isParallel
  )

  beforeEnd({
    dependencies: updatedDependencies,
    devDependencies: updatedDevDependencies,
    packageJson: packageJson,
    peerDependencies: updatedPeerDependencies,
  })
}

export async function updateParallel(): Promise<void> {
	await update({parallel: true})
}
