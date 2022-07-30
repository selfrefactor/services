const { spawn } = require('child_process')

const executeCommandOld = ({ command, inputs, cwd, debug = false }) => {
  if(debug){
    console.log(command, inputs, cwd, `command, inputs, cwd`)
  }
  const child = spawn(
    command, inputs, {
      stdio : 'inherit',
      cwd,
    }
  )

  return new Promise((resolve, reject) => {
    child.on('close', code => {
      if (code !== 0){
        reject(new Error(`${ command } ${ inputs.join(' ') } failed with exit code ${ code }`))

        return
      }
      resolve(true)
    })
  })
}

exports.executeCommandOld = executeCommandOld
