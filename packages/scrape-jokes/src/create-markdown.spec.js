const { readJson } = require('fs-extra')
const { OUTPUT_DIR } = require('./constants')
const { createMarkdown } = require('./create-markdown')

test('happy path', async () => {
  const testFilePath = `${OUTPUT_DIR}/all.json`
  const content = await readJson(testFilePath)
  const markdown = await createMarkdown(content, 'all-jokes')
  console.log(markdown)
})
