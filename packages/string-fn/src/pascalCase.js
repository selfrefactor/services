import {
  join,
  map,
  toUpper,
  head,
  toLower,
  tail,
} from 'rambdax'
import { words } from './words'
import { wordsX } from './wordsX'

// what if one/two chars
export function pascalCase(str, extraLatin = false){
  const method = extraLatin ?
    wordsX :
    words

  return join(
    '',
    map(
      val => `${ toUpper(head(val)) }${ toLower(tail(val)) }`,
      method(str)
    )
  )
}
