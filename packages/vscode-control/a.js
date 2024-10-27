import {markdownTable} from 'markdown-table'

let a = markdownTable([
  ['Branch', 'Commit'],
  ['main', '0123456789abcdef'],
  ['staging', 'fedcba9876543210']
])

console.log(a)