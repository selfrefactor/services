const { writeFile } = require('fs-extra')
const { OUTPUT_DIR } = require('./constants')

async function createMarkdown(data, label) {
  const header = `# ${label}\n`
  const content = data
    .map((x, index) => `## ${index} \n\n ${x.text}`)
    .join('\n\n')
  await writeFile(`${OUTPUT_DIR}/${label}.md`, `${header}\n${content}`)
}

exports.createMarkdown = createMarkdown
