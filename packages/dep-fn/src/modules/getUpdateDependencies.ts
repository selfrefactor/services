import { mapAsync, mapParallelAsyncWithLimit } from 'rambdax'
import {StringMap} from '../../typings'
import {getUpdate} from './helpers/getUpdate'
import {isDependencyEligible} from './helpers/isDependencyEligible'

export const getUpdateDependencies = async(
  dependencies: object,
	isParallel: boolean
): Promise<StringMap<string>> => {
  const willReturn = {}

	let iterable = async (prop: string) => {
		const dependency = dependencies[prop]
    const eligible = isDependencyEligible(prop)

    if (!eligible) {
      console.log(`Dependency ${prop} is skipped`)
      willReturn[prop] = dependency

      return
    }

    const willPush: string = await getUpdate({
      dependency: prop,
      tag: dependency,
			isParallel,
    })

    if (willPush !== dependency) {
      console.log(`Updated '${prop}' dependency to ${willPush}`)
    } else {
      console.log(`'${prop}' dependency no need to update`)
    }

    willReturn[prop] = willPush
	}

	if(isParallel){
		await mapParallelAsyncWithLimit(iterable, 6 ,Object.keys(dependencies))
	}else{
		await mapAsync(iterable, Object.keys(dependencies))
	}

  return willReturn
}

