const { CWD } = require('../../constants')
const { lintFn } = require('lint-fn')

async function lintFile(filePathRaw, useAlternativeExecCommand = false){
  const filePath = `${ CWD }/${ filePathRaw }`

  await lintFn({
    filePath,
    prettierSpecialCase: 'outer',
    useAlternativeExecCommand
  })
}

exports.lintFile = lintFile
