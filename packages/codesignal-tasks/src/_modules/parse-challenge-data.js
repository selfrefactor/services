let {
  head,
  last,
  map,
  piped,
  split,
  trim,
} = require('rambdax')

function parseChallengeData(challengeData){
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

  return {testCases: challengeData.testCases, functionName: challengeData.kataTitle, replContent: challengeData.replContent, testInputs, taskDescription: challengeData.taskDescription}
}

exports.parseChallengeData = parseChallengeData
