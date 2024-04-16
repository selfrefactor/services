export const transformFirst = modifier => str => {
  if(str.length > 2) return modifier(str[0]) + str.slice(1)
  return modifier(str[0])
}