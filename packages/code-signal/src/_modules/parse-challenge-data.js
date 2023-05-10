import {
  head,
  last,
  map,
  piped,
  sort,
  split,
  trim,
} from 'rambdax'

const EXPECTED_OUTPUT = 'Expected Output:'
const EXPECTED_OUTPUT_END = 'Click the '

function whenNext(testInput, next, rawText){
  const sk = piped(
    rawText,
    split(next),
    head,
    split(`${ testInput }:`),
    last,
    trim
  )

  return sk
}

function whenLast(testInput, rawText){
  const sk = piped(
    rawText,
    split(EXPECTED_OUTPUT),
    head,
    split(`${ testInput }:`),
    last,
    trim
  )

  return sk
}

function parseTestCase(testCase, sortedTestInputs){
  const hash = {}

  sortedTestInputs.forEach((x, i) => {
    const next = sortedTestInputs[ i + 1 ]
    if (!next){
      return hash[ x ] = whenLast(x, testCase.rawText)
    }

    hash[ x ] = whenNext(x, next, testCase.rawText)
  })
  const expected = piped(
    testCase.rawText,
    split(EXPECTED_OUTPUT_END),
    head,
    split(EXPECTED_OUTPUT),
    last,
    trim
  )

  return {expected, testInputs: hash}
}

export function parseChallengeData(challengeData){
  const testInputs = piped(
    challengeData.replContent,
    split('('),
    last,
    split(')'),
    head,
    split(','),
    map(trim)
  )
  if (testInputs.length === 0) throw new Error('testInputs.length')

  const sortedTestInputs = sort((x, y) => {
    const xPosition = challengeData.testCases[0].rawText.indexOf(x)
    const yPosition = challengeData.testCases[0].rawText.indexOf(y)

    return xPosition < yPosition ? -1 : 1
  }, testInputs)

  const testCases = piped(
    challengeData.testCases,
    map(x => parseTestCase(x, sortedTestInputs))
  )

  return {testCases, functionName: challengeData.kataTitle, sortedTestInputs}
}
