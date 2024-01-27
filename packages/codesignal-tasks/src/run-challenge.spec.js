const { ms } = require('string-fn')
const { runChallenge } = require('./run-challenge')
const { last } = require('rambdax')
jest.setTimeout(ms('30 minutes'))

test('happy', async () => {
  const challengeIDRaw = last(process.argv)
  const challengeID = challengeIDRaw.startsWith('http') ? last(challengeIDRaw.split('/')): challengeIDRaw
  await runChallenge(challengeID)
})