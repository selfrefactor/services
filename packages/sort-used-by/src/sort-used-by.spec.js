import { sortUsedBy } from './sort-used-by'

jest.setTimeout(12 * 60 * 1000)

test('happy', async () => {
  await sortUsedBy({
    isDev : true,
    scrapeLibraries: 0,
    repo  : 'miniMAC/magic',
  })
})
