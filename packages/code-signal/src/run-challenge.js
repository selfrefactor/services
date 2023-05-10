import { last } from 'rambdax'

import { createKata } from './_modules/create-kata'
import { parseChallengeData } from './_modules/parse-challenge-data'
import { KATA_DIR } from './constants'
import { scrapeChallenge } from './scrape-challenge'

export async function runChallenge(){
  console.time('challenge')
  const challengeIDRaw = last(process.argv)
  const challengeID = challengeIDRaw.startsWith('http') ? last(challengeIDRaw.split('/')): challengeIDRaw

  const scrapeData = await scrapeChallenge(challengeID)
  const parsedData = parseChallengeData(scrapeData)
  await createKata(KATA_DIR, parsedData)
  console.timeEnd('challenge')
}
