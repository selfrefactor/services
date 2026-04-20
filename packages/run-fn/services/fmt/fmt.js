const { escapeTerminalPath, exec } = require('../lint/lint');

const OXFMT = 'node_modules/oxfmt/bin/oxfmt'

async function formatFn(filePath) {
  const command = `${OXFMT} --write ${filePath}'
  }`
  await exec(command)
}

async function formatFile(filePath) {
  const escapedPath = escapeTerminalPath(filePath)
  await formatFn(escapedPath)
}

exports.formatFile = formatFile
