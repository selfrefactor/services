const { log } = require('./src')
const boxen = require('boxen')
const str = 'FOO bar'
const chalk = require('chalk')

console.log(chalk.default)
console.log(boxen.default('unicorn', {padding: 0.5}));
log(`1,2,3,` ,'box')
