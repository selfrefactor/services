const { lintTypescript } = require('./lintTypescript');
const { writeFile, readFile } = require('fs-extra');

async function forceTypescriptFn(filePath, prettierSpecialCase) {
  const TEMP = `${__dirname}/TEMP.ts`;
  const content = (await readFile(filePath)).toString();

  await writeFile(TEMP, content);

  await lintTypescript(
    TEMP, __dirname, prettierSpecialCase, false
  );

  const lintedContent = (await readFile(TEMP)).toString();
  await writeFile(filePath, lintedContent);
}

exports.forceTypescriptFn = forceTypescriptFn
