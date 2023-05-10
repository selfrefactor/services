import { ms } from 'string-fn'
import { runChallenge } from './run-challenge'
jest.setTimeout(ms('30 minutes'))

test('happy', async () => {
  await runChallenge()
})