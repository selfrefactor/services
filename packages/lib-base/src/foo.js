import { existsSync } from 'fs'

export function foo(){
  return existsSync(`${__dirname}/foo.js`)
}
