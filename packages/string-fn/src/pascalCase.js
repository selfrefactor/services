import { head, tail } from 'rambdax'
import { createMethodWithAdditionalSupport } from './utils'

let transform = x => head(x).toUpperCase() + tail(x).toLowerCase()

export const pascalCase = createMethodWithAdditionalSupport(
  transform,
  ''
)
