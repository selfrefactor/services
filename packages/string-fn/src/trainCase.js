import {
  compose,
  toUpper,
  join,
  map,
} from 'rambdax'
import { transformFirst } from './utils'
import { words } from './words'
  
export const trainCase =  compose(
   join('-'),
   map(transformFirst(toUpper)),
   words
 )

