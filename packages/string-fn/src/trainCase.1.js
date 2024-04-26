import {
  toUpper,
} from 'rambdax'
import { createMethod, transformFirst } from './utils'

export const trainCase = createMethod(
  transformFirst(toUpper),
  '-'
)

