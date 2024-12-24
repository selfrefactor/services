import {exec} from 'child_process'

export const execCommand = command =>
  new Promise((resolve, reject) => {
    const cwd = process.env.COMMIT_MESSAGE_CWD || process.cwd()
    const proc = exec(command, {cwd})
    if (!proc) return reject('!proc')
    if (!proc.stdout) return reject('!proc')

    proc.stdout.on('data', chunk => {
      console.log(chunk.toString())
    })
    proc.stdout.on('end', resolve)
    proc.stdout.on('error', err => {
      reject(err)
    })
  })
