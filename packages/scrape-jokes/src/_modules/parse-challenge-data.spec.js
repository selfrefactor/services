const { parseChallengeData } = require('./parse-challenge-data');
const data = require('../../rawData.json');
const { writeFile } = require('fs-extra');

test('happy', async () => {
  const result = parseChallengeData(data)
  await writeFile('parsedData.json', JSON.stringify(result, null, 2))
  expect(
    result
  ).toMatchSnapshot()
})