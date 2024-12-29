const { isKebabCase, isDotCase, isSnakeCase, isConstantCase, isPascalCase, isCamelCase } = require('string-fn')

function getNamePattern(text){
  if(isConstantCase(text)) return 6
  if(isPascalCase(text)) return 5
  if(isCamelCase(text)) return 4
  if(isSnakeCase(text)) return 3
  if(isDotCase(text)) return 2
  if(isKebabCase(text)) return 1
  return 0
}

function sortNamesList(a, b){
  const aPattern = getNamePattern(a)
  const bPattern = getNamePattern(b)
  if(aPattern > bPattern) return -1
  if(aPattern < bPattern) return 1
  return a > b ? 1 : -1
}

module.exports = {
  sortNamesList
}
