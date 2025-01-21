const { glue, replace, interpolate, remove, maybe, replaceAll } = require('rambdax')

const specTemplate = glue(`
import { {{methodName}} } from './{{fileName}}'
_NEW_LINE_
test('happy', () => {
__const result = {{methodName}}()
__console.log(result)
})
`,
'\n')

const specTemplateJs = glue(`
const { {{methodName}} } = require('./{{fileName}}')
_NEW_LINE_
test('happy', () => {
__const result = {{methodName}}()
__console.log(result)
})
`,
'\n')

const specTemplateAsync = glue(`
import { {{methodName}} } from './{{fileName}}'
_NEW_LINE_
test('happy', async () => {
__const result = await {{methodName}}()
__console.log(result)
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
  const withTab = replaceAll(
    [/__/g], '  ', result
  )
  const withNewLine = remove('_NEW_LINE_', withTab)

  return withNewLine
}

exports.specTemplate = specTemplateFn
