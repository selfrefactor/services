const { compile } = require('nexe')

compile({
  build: true,
  target: [
    ['linux-x32', `linux-x86-${process.version.slice(1)}`],
  ],
  input: './foo.js',
}).then(() => {
  console.log('success')
})
