
const { exec } = require('./exec');
const { join   } = require('path');
const copyArguments = ['--clipboard'];

const xselFallback = join(__dirname, './assets/xsel');

async function copy(text){
  let command = `echo ${ text } | ${ xselFallback } ${ copyArguments.join(' ') }`

  await exec({
    cwd    : __dirname,
    command,
  });
}

exports.copy = copy;
