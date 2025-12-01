const { execSafe, exec: execFn } = require('helpers-fn')
const { resolve } = require('node:path')

const cwd = resolve(__dirname, '../../')
const PRETTIER = 'node_modules/prettier/bin/prettier.cjs'
const OXLINT = 'node_modules/@oxlint/linux-x64-musl/oxlint'
const BIOME = 'node_modules/@biomejs/biome/bin/biome'

async function exec(command) {
  try {
    await execSafe({ command, cwd })
    return { success: true }
  } catch (error) {
    return {
      errorMessage: error?.message ?? JSON.stringify(error, null, 2),
      success: false,
    }
  }
}

async function execWithStandartOutput(command) {
  try {
    const logs = await execFn({ command, cwd })
    return { success: true, logString: logs.join() }
  } catch (error) {
    return {
      errorMessage: error?.message ?? JSON.stringify(error, null, 2),
      success: false,
    }
  }
}

async function lintFileWithPrettier(filePath) {
  const command = `${PRETTIER} --write ${filePath} --print-width=80 --semi=false --jsx-single-quote ${
    filePath.endsWith('.scss') ? '' : '--single-quote'
  }`
  await exec(command)
}

async function biomeLint(filePath) {
  // check include lint and format command
  const checkCommand = `${BIOME} check --write --unsafe --javascript-formatter-line-width=85 --jsx-quote-style=single --line-width=85 ${filePath}`

  const { errorMessage: checkCommandErrorMessage } = await exec(checkCommand)

  return checkCommandErrorMessage ?? ''
}

async function oxlint(filePath) {
  const command = `${OXLINT} --fix-dangerously --fix-suggestions --fix ${filePath}`

  const { logString, success, errorMessage } = await execWithStandartOutput(command)
  if (!success) {
    return errorMessage
  }
  return logString
}
const escapeTerminalPath = path => {
  return path.replace(/([()[\]])/g, '\\$1') // Escapes (, ), [, and ]
}
async function lintFn(filePath) {
  const escapedPath = escapeTerminalPath(filePath)
  const oxlintOutput = await oxlint(escapedPath)
  await lintFileWithPrettier(escapedPath)
  const biomeOutput = await biomeLint(escapedPath)
  if (oxlintOutput) {
    console.log('\n oxlint: ', oxlintOutput, '\n')
  }
  if (biomeOutput) {
    console.log('\n biomelint: ', biomeOutput, '\n')
  }
}

exports.escapeTerminalPath = escapeTerminalPath
exports.lintFile = lintFn
