const { writeFile } = require("fs-extra");
const { interpolate, join, piped, tail, map } = require("rambdax");
const { kebabCase } = require("string-fn");

function getExpectedDeclaration({expected}){
  return `const expected = ${expected}`
}

function getDeclarations(sortedTestInputs, testCase){
  return piped(
    sortedTestInputs,
    map(x => `    const ${x} = ${testCase.testInputs[x]}`),
    join('\n')    
  )
}

const restCasesTemplate = `
  Inputs/Expected:

{{inputs}}

{{expected}}
`

function getRestTestCases(testCases){
  return piped(
    testCases,
    tail,
    map(
      testCase =>{
        let inputs = ''
        map((x, prop)=>{
          inputs += `const ${prop} = ${x}\n`
        }, testCase.testInputs)
        return interpolate(restCasesTemplate, {inputs, expected: `const expected = ${testCase.expected}`})
      }
    ),
    join('\n===\n')
  )
}

function getInputLines(sortedTestInputs){
  return piped(
    sortedTestInputs,
    map(x => `    ${x}`),
    join(',\n'),
  )
}

function getFileContent({sortedTestInputs,functionName, testCases}){
  const template = `
function solution(
{{inputLines}}
){
  
  return
}

test('happy', () => {
{{declarations}}

  const result = solution(
{{inputLines}}
  )

  console.log(result)

  /**
    {{firstExpected}}
  */
})


/*
  {{restTestCases}}
*/
`.trim()

  const templateArguments = {
    declarations: getDeclarations(sortedTestInputs, testCases[0]),
    inputLines: getInputLines(sortedTestInputs),
    restTestCases: getRestTestCases(testCases),
    firstExpected: testCases[0]
  }
  return interpolate(template, templateArguments)
}

async function createKata(dir, parsedData){
  const fileContent = getFileContent(parsedData)
  const filePath = `${dir}/${kebabCase(parsedData.functionName)}.spec.js`

  await writeFile(filePath, fileContent)
}

exports.createKata = createKata
