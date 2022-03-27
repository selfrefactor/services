const { compile } = require('nexe')

compile({
  build: true,
  input: './foo.js',
}).then(() => {
  console.log('success')
})
