import {StringMap} from '../../typings'
import {getUpdate} from './helpers/getUpdate'
import {isDependencyEligible} from './helpers/isDependencyEligible'

export const getUpdateDependencies = async(
  dependencies: object
): Promise<StringMap<string>> => {
  const willReturn = {}

  for (const prop in dependencies) {
    const dependency = dependencies[prop]
    const eligible = isDependencyEligible(prop)

    if (!eligible) {
      console.log(`Dependency ${prop} is skipped`)
      willReturn[prop] = dependency

      continue
    }

    const willPush: string = await getUpdate({
      dependency: prop,
      tag: dependency,
    })

    if (willPush !== dependency) {
      console.log(`Updated '${prop}' dependency to ${willPush}`)
    } else {
      console.log(`'${prop}' dependency no need to update`)
    }

    willReturn[prop] = willPush
  }

  return willReturn
}
