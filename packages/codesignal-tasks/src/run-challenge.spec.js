const { ms } = require('string-fn')
const { runChallenge } = require('./run-challenge')
const { last } = require('rambdax')
jest.setTimeout(ms('30 minutes'))

let getUrl = (input) => {
  if(input.startsWith('https')) return input
  return `https://app.codesignal.com/challenge/${input}`
}

test('happy', async () => {
  const url = getUrl(last(process.argv))
  await runChallenge(url)
})