const { lintTypescript } = require('./lintTypescript');
const { writeFile, readFile } = require('fs-extra');

async function forceTypescriptFn(filePath, prettierSpecialCase) {
  const TEMP = `${__dirname}/TEMP.ts`;
  const content = (await readFile(filePath)).toString();

  await writeFile(TEMP, content);

  const lintTypescriptResult = await lintTypescript(
    {
      filePath: TEMP,
      projectDir: __dirname,
      prettierSpecialCase,
      cwdOverride: false
    }
  );

  const lintedContent = (await readFile(TEMP)).toString();
  await writeFile(filePath, lintedContent);

  return {...lintTypescriptResult, case: 'force-ts'}
}

exports.forceTypescriptFn = forceTypescriptFn
