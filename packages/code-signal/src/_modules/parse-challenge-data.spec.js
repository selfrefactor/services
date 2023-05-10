import { parseChallengeData } from './parse-challenge-data'
import {data} from '../challange-test-data.json'
import { writeJson } from 'fs-extra'

test('happy', async () => {
  const result = parseChallengeData(data)
  await writeJson(`${__dirname}/parsed-test-data.json`, {data:result})

  expect(
    result
  ).toMatchSnapshot()
})