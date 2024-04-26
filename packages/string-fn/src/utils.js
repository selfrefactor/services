import { compose, join, map } from 'rambdax'
import { words } from './words'
import { wordsX } from './wordsX'

export const transformFirst = ({transformFirst, transformTail}) => (str) => {
  if (str.length >= 2) return transformFirst(str[0]) + transformTail(str.slice(1))
  return transformFirst(str[0])
}

export const transformLast = ({transformStart, transformLast}) => (str) => {
if (str.length >= 2) return transformStart(str.slice(0, -1)) + transformLast(str.slice(-1))
return transformLast(str[0])
}

export const createMethod = (transformFn, separator) =>
  compose(join(separator), map(transformFn), words)

export const createMethodWithAdditionalSupport = (transformFn, separator) => (str, extraLatin) => 
  compose(join(separator), map(transformFn), extraLatin ? wordsX : words)(str)
