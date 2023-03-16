const { resolve } = require('path')
const configFilePath = resolve(__dirname, '../config')

const getInputs = (src, configPath) => [ src, '--fix', '--config', `${ configFilePath }/.${ configPath }.js` ]

const commandFactory = ({ src, eslintPath }) => {
  const lintDefault = {
    command : eslintPath,
    inputs  : getInputs(src, 'eslintrcDefault'),
  }
  const lintJest = {
    command : eslintPath,
    inputs  : getInputs(src, 'eslintrcJest'),
  }
  const lintReact = {
    command : eslintPath,
    inputs  : getInputs(src, 'eslintrcReact'),
  }

  return {
    lintDefault,
    lintJest,
    lintReact,
  }
}

exports.commandFactory = commandFactory
