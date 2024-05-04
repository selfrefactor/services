const { createKata } = require('./_modules/create-kata')
const { parseChallengeData } = require('./_modules/parse-challenge-data')
const { KATA_DIR } = require('./constants')
const { scrapeChallenge } = require('./scrape-challenge')

async function runChallenge(challengeID) {
  try {
    const [scrapeData, url] = await scrapeChallenge(challengeID)
    const parsedData = parseChallengeData(scrapeData)
    await createKata(KATA_DIR, parsedData, url)
    console.log('DONE')
  }
  catch (err) {
    console.log(err)
  }
}

exports.runChallenge = runChallenge
