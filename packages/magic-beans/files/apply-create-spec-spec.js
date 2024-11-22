const { applyCreateSpec } = require("../src/_modules/apply-create-spec")

test('happy', () => {
  const filePath = `${ process.env.HOME }/repos/rambda/source/add.js`
  const result = applyCreateSpec(filePath, 'add')
  console.log(result)
})
