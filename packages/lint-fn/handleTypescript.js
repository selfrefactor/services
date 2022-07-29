const { glue } = require('rambdax');
const { lintTypescript } = require('./_modules/lintTypescript');
const { takeProjectDir } = require('./_modules/takeProjectDir');
const { forceTypescriptFn } = require('./forceTypescriptFn');

async function handleTypescript(
  filePath,
  prettierSpecialCase,
  cwdOverride,
  forceTypescript,
  debug
) {
  const { ok, eslintFlag, path } = takeProjectDir(filePath, cwdOverride);

  if (!ok && !forceTypescript) {
    return console.log('This is not a Typescript project');
  }
  if (forceTypescript) {
    if(debug){
      console.log({filePath, ok}, `!ok && forceTypescript`)
    }
    return forceTypescriptFn(filePath, prettierSpecialCase);
  }

  if (!eslintFlag) {
    return console.log(glue(`
        TSLint is no longer
        supported! You need to switch
        to the new setup, which
        lints Typescript files
        using ESLint with 'tslint-fn' library
      `));
  }

  return lintTypescript(
    filePath, path, prettierSpecialCase, cwdOverride
  );
}

exports.handleTypescript = handleTypescript;
