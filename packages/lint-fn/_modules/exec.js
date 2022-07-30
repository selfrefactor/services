const { exec } = require('child_process');
const { executeCommandOld } = require('./exec-old');

const executeCommand = ({ command, inputs, cwd, debug = false }) => {
  if(debug){
    console.log(command, inputs, cwd, `command, inputs, cwd`)
  }
  return new Promise((resolve, reject)=>{
    const childCommand = exec(`${command} ${inputs.join(' ')}`, {cwd}, function (error, stdout, stderr) {
      if (error) {
        console.log(error.stack);
        console.log('Error code: ' + error.code);
        console.log('Signal received: ' + error.signal);
        return reject(error.code)
      }
      if(stdout) console.log('Child Process STDOUT: ' + stdout);
      if(stderr) console.log('Child Process STDERR: ' + stderr);
      resolve(stdout)
    });

    childCommand.on('exit', function (code) {
      console.log('Child process exited with exit code ' + code);
    });
    childCommand.on('close', function (data) {
      console.log('Child process close: ' + data);
    });
  })
}

// exports.executeCommand = executeCommand
exports.executeCommand = executeCommandOld
