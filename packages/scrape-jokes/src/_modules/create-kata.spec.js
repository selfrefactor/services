const { KATA_DIR } = require('../constants')
const { createKata } = require('./create-kata')
const data = require('../../parsedData.json')

test('happy', async () => {
  await createKata(KATA_DIR, data)
})