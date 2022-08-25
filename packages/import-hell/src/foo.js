import { existsSync } from 'fs'

export function import-hell(){
  return existsSync(`${__dirname}/import-hell.js`)
}
