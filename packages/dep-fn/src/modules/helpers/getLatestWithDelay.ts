import {execCommand} from './execCommand'
import {head} from 'rambdax'

export const isAtLeast30DaysOld = (dateString: string,key: string, dependency: string): boolean => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	// console.log(diffDays, 'diffDays', dependency, key, diffDays >= 30)
  return diffDays >= 30;
}

export const getLatestWithDelay = async(dependency: string, currentVersion: string) => {
  const command = `npm info --json ${dependency}`
  const packageInfoRaw: string = await execCommand(command)
  try {
    const packageInfo = JSON.parse(packageInfoRaw)
		let versions = packageInfo.versions
		versions.reverse()
		let indexOfCurrent = versions.indexOf(currentVersion)
		if(indexOfCurrent === -1){
			console.log(`Dependency ${dependency} ${currentVersion} is not found in npm registry!!`)
			return ''
		}
		if(indexOfCurrent === 0){
			console.log(`Dependency ${dependency} ${currentVersion} is already the latest version`)
			return ''
		}

		let versionsToCheck = versions.slice(0, indexOfCurrent).map((version: string) => ({version, time: packageInfo.time[version]}))

    const filtered = versionsToCheck.filter(
			({version, time}) => isAtLeast30DaysOld(time, version, dependency)
    ).map(x => x.version)
		console.log(filtered, 'filtered')
    if (filtered.length === 0) return ''

    return head(filtered)
  } catch (err) {
    console.log(err, 'dep.fn')
    process.exit(1)
  }
}
