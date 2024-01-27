const { parseChallengeData } = require('./parse-challenge-data');
const { data } = require('../challange-test-data.json');
const { writeJson } = require('fs-extra');

test('happy', async () => {
  const result = parseChallengeData(data)
  await writeJson(`${__dirname}/parsed-test-data.json`, {data:result})

  expect(
    result
  ).toMatchSnapshot()
})