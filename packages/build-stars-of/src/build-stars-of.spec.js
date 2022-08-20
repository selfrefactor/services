import { envFn } from 'env-fn'
envFn('special')
import { ms } from 'string-fn'

import { buildStarsOf } from './build-stars-of'

jest.setTimeout(ms('30 minutes'))

test('happy', async () => {
  const repo = 'ramda/ramda'
  const input = {
    repo,
    title : 'Stars of **Ramda** list',
    // shouldRefreshScraped: true,
    // shouldRefreshApi: true,
    showProgress:true,
    shouldRefreshScraped: false,
    shouldRefreshApi: true,
    outputLocation: `${__dirname}/assets/stars-of-ramda.md`
  }
  await buildStarsOf(input)
})
