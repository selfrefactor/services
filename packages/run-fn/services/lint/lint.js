
const { execSafe } = require('helpers-fn')
const { resolve } = require('path')

const cwd = resolve(__dirname, '../../')
const PRETTIER = 'node_modules/prettier/bin/prettier.cjs'

async function exec(command) {
  try {
    await execSafe({ command, cwd })
    return { success: true }
  }
  catch (error) {
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

async function biome(filePath, applyUnsafe) {
  const label = `${filePath} - biome`
  console.time(label)
  const command = `node_modules/@biomejs/biome/bin/biome check ${
    applyUnsafe ? '--apply-unsafe' : ''
  } ${filePath}`
  const { errorMessage } = await exec(command)
  console.timeEnd(label)
  return errorMessage ?? false
}

async function lintFn(filePath, applyUnsafe) {
  await lintFileWithPrettier(filePath)
  const biomeOutput = await biome(filePath, applyUnsafe)
  if (biomeOutput) console.log( '\n', biomeOutput, '\n')
}

exports.lintFile = lintFn
