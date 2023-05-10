import { writeFile } from "fs-extra"
import { interpolate, join, piped, tail , map, tap } from "rambdax"
import { kebabCase } from "string-fn"

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

  {{expectedDeclaration}}    
  expect(result).toEqual(expected)
})


/*
  {{restTestCases}}
*/
`.trim()

  const templateArguments = {
    declarations: getDeclarations(sortedTestInputs, testCases[0]),
    inputLines: getInputLines(sortedTestInputs),
    restTestCases: getRestTestCases(testCases),
    expectedDeclaration: getExpectedDeclaration(testCases[0])
  }
  return interpolate(template, templateArguments)
}

export async function createKata(dir, parsedData){
  const fileContent = getFileContent(parsedData)
  const filePath = `${dir}/${kebabCase(parsedData.functionName)}.spec.js`

  await writeFile(filePath, fileContent)
}
