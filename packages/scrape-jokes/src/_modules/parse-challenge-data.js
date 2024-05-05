const { head, last, map, piped, split, trim } = require('rambdax')

function parseChallengeData(challengeData) {
  const testInputs = piped(
    challengeData.replContent,
    split('('),
    last,
    split(')'),
    head,
    split(','),
    map(trim),
  )
  if (testInputs.length === 0) throw new Error('testInputs.length')

  return {
    functionName: challengeData.kataTitle,
    replContent: challengeData.replContent,
    testCases: challengeData.testCases,
    testInputs,
  }
}

exports.parseChallengeData = parseChallengeData
