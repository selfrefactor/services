import {execCommand} from './execCommand'

export const getLatest = async(dependency: string, currentVersion: string): Promise<string> => {
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
		return versions[0]
  } catch (err) {
    console.log(err, 'dep.fn')
    process.exit(1)
  }
}
