import {scrapeChallenge} from './scrape-challenge'
import { ms } from 'string-fn'
import { writeJson } from 'fs-extra'
import { CHALLENGE_TEST_DATA } from './constants'

const challengeID = 'F356AsueiKuhyYaAk'
jest.setTimeout(ms('30 minutes'))

test('happy', async () => {
  const result = await scrapeChallenge(challengeID)

  await writeJson(CHALLENGE_TEST_DATA, {data:result})
})