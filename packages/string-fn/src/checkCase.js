import { constantCase } from "./constantCase"
import { camelCase } from "./camelCase"
import { kebabCase } from "./kebabCase"
import { titleCase } from "./titleCase"
import { dotCase } from "./dotCase"
import { snakeCase } from "./snakeCase"

function checkCase(transformFn){
  return input => transformFn(input) === input
}

export const isTitleCase = checkCase(titleCase)
export const isKebabCase = checkCase(kebabCase)
export const isCamelCase = checkCase(camelCase)
export const isConstantCase = checkCase(constantCase)
export const isDotCase = checkCase(dotCase)
export const isSnakeCase = checkCase(snakeCase)