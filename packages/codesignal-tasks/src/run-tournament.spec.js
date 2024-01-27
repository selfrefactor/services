const { envFn } = require('env-fn');
envFn('special');
const { ms } = require('string-fn');

const { runTournament } = require('./run-tournament');
jest.setTimeout(ms('30 minutes'))

test('happy', async () => {
  await runTournament()
})
