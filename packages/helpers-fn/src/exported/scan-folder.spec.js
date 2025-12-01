import { resolve } from 'path'
import { expect, test } from 'vitest'
import { scanFolder } from './scan-folder'
const testDir = resolve(__dirname, '../../src')

test('happy', async () => {
	let result = await scanFolder({ folder : testDir })
	// console.log(result)
})

test('with filter', async () => {
  const filterFn = x => x.endsWith('.spec.js')

  expect(await scanFolder({
    folder : testDir,
    filterFn,
  })).toMatchSnapshot()
})

test('with exclude', async () => {
  const excludeFn = dir => dir.endsWith('log')

  const result = await scanFolder({
    folder : testDir,
    excludeFn,
  })
	// console.log(result)
})
