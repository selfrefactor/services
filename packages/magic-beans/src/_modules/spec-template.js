const { glue, replace, interpolate, remove, maybe } = require('rambdax')

const specTemplate = glue(`
  import { {{methodName}} } from './{{fileName}}'
  _NEW_LINE_
  test('happy', () => {
  ___const result = {{methodName}}()
  ___console.log(result)
  })
`,
'\n')

const specTemplateJs = glue(`
  const { {{methodName}} } = require('./{{fileName}}')
  _NEW_LINE_
  test('happy', () => {
  ___const result = {{methodName}}()
  ___console.log(result)
  })
`,
'\n')

const specTemplateAsync = glue(`
  import { {{methodName}} } from './{{fileName}}'
  _NEW_LINE_
  test('happy', async () => {
  ___const result = await {{methodName}}()
  ___console.log(result)
  })
`,
'\n')

function specTemplateFn({ isAsync, fileName, methodName, isJavascript }){
  const actualTemplate = maybe(
    isJavascript, specTemplateJs, isAsync ? specTemplateAsync : specTemplate
  )
  
  const result = interpolate(actualTemplate, {
    fileName : remove([ '.js', '.ts' ], fileName),
    methodName,
  })
  const withTab = replace(
    '___', '  ', result
  )
  const withNewLine = remove('_NEW_LINE_', withTab)

  return withNewLine
}

exports.specTemplate = specTemplateFn
