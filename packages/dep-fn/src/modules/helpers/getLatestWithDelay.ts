import {execCommand} from './execCommand'

import {last} from 'rambdax'

let isVersionString = (x: string) => x.indexOf('.') > -1 && x.lastIndexOf('.') > -1 && x.indexOf('.') !== x.lastIndexOf('.')

export const isAtLeast30DaysOld = (dateString: string): boolean => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays >= 30;
}

export const getLatestWithDelay = async(dependency: string) => {
  const command = `npm info --json ${dependency}`
  const packageInfoRaw: string = await execCommand(command)
  try {
    const packageInfo = JSON.parse(packageInfoRaw)

    const filtered = Object.entries(packageInfo.time).filter(
			([key, value]) => isVersionString(key) && isAtLeast30DaysOld(value as string)
    ).map(([key]) => key)
    if (filtered.length === 0) return false

    return last(filtered)
  } catch (err) {
    console.log(err, 'dep.fn')
    process.exit(1)
  }
}
