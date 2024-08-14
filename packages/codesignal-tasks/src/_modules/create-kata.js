const { writeFile } = require('fs-extra')
const { interpolate, join, map, piped, tail } = require('rambdax')
const { kebabCase } = require('string-fn')

function getDeclarations(testInputs) {
  return piped(
    testInputs,
    map(x => `  const ${x} = `),
    join('\n'),
  )
}

const restCasesTemplate = `
  Inputs/Expected:

{{testInput}}

{{expectedOutput}}
`

function getRestTestCases(testCases) {
  return piped(
    testCases,
    tail,
    map((testCase) =>  interpolate(restCasesTemplate, testCase)),
    join('\n===\n'),
  )
}

function getFileContent({ testCases, testInputs, url, taskDescription }) {
  const template = `
/**
 * {{url}}
 * 
 * {{taskDescription}}
 */

function solution({{inputs}}){
  
  return
}

test('happy', () => {
  /**
   * {{firstTestInput}}
   */

{{declarations}}

  const result = solution({{inputs}})
  const expected = {{firstExpected}}
  console.log(result)

  /**
   expected

    {{firstExpected}}
  */
})


/*
  {{restTestCases}}
*/
`.trim()

  const templateArguments = {
    taskDescription,
    declarations: getDeclarations(testInputs),
    firstExpected: testCases[0].expectedOutput,
    firstTestInput: testCases[0].testInput,
    inputs: testInputs.join(', '),
    restTestCases: getRestTestCases(testCases),
    url
  }
  return interpolate(template, templateArguments)
}

async function createKata(dir, parsedData, url) {
  const fileContent = getFileContent({...parsedData, url})
  const filePath = `${dir}/${kebabCase(parsedData.functionName)}.spec.js`

  await writeFile(filePath, fileContent)
}

exports.createKata = createKata
