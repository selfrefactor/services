const { scrapeChallenge } = require('../src/scrape-challenge');
const { ms } = require('string-fn');
const { writeJson } = require('fs-extra');
const { CHALLENGE_TEST_DATA } = require('../src/constants');

const challengeID = 'h9TndHHMewEvesw3o';
jest.setTimeout(ms('30 minutes'));

test('happy', async () => {
  const result = await scrapeChallenge(challengeID);

  await writeJson(CHALLENGE_TEST_DATA, { data: result });
});
