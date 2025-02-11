const vscode = require('vscode')
const { basename, extname } = require('node:path')
const { existsSync, writeFileSync } = require('node:fs')
const { replace } = require('rambdax')
const { applyCreateSpec } = require('./_modules/apply-create-spec')

function createSpec() {
  const filePath = vscode.window.activeTextEditor.document.fileName
  const fileName = basename(filePath)
  const extension = extname(filePath)
  const specFileName = replace(extension, `.spec${extension}`, fileName)
  const specFilePath = replace(fileName, specFileName, filePath)
  const okExist = existsSync(specFilePath)
  if (okExist) {
    return
  }

  const template = applyCreateSpec(filePath, fileName)
  if (!template) {
    return
  }

  writeFileSync(specFilePath, template)
}

exports.createSpec = createSpec
