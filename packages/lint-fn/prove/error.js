const { lintFn } = require('../lintFn')
const { TS_PROVE } = require('../constants')

void (async function prove(){
  const result = await lintFn({
    filePath            : TS_PROVE,
    prettierSpecialCase : 'local',
    // error with outer
    // prettierSpecialCase : 'outer',
    debug               : true,
  })
  console.log(result, 'result')
})()
