const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

function isBeautifulString(
    inputString
){
  const hash = []
    inputString.split('').forEach(
      x => {
        const found = hash.find(y => y[0] === x)
        if(found === undefined){
          hash.push([x, 1])
        }else{
          found[1] = found[1] + 1
        }
      }
    )
    hash.sort((a, b) => a[0] > b[0] ? 1 : -1)

  let result = true
  hash.forEach(([key, count], i) => {
    if(!result) return
    if(i === hash.length - 1) return

    const next = hash[i + 1]

    const indexA = alphabet.indexOf(key)
    const indexB = alphabet.indexOf(next[0])
    if(indexA !== i) {
      result = false
      return
    }
    if(indexB - indexA !== 1) {
      result = false
      return
    }
    if(next[1] > count) {
      result = false
      return
    }
  })
  
  return result
}

test('happy', () => {
    const inputString = "bbbaacdafe"

  const result = isBeautifulString(
    inputString
  )

  const expected = true    
  expect(result).toEqual(expected)
})

test('1', () => {
    const inputString = "aabbb"

  const result = isBeautifulString(
    inputString
  )

  const expected = false    
  expect(result).toEqual(expected)
})
test('2', () => {
    const inputString = "bbc"

  const result = isBeautifulString(
    inputString
  )

  const expected = false    
  expect(result).toEqual(expected)
})


/*
  
  Inputs/Expected:

const inputString = "aabbb"


const expected = false

===

  Inputs/Expected:

const inputString = "bbc"


const expected = false

===

  Inputs/Expected:

const inputString = "bbbaa"


const expected = false

===

  Inputs/Expected:

const inputString = "abcdefghijklmnopqrstuvwxyzz"


const expected = false

===

  Inputs/Expected:

const inputString = "abcdefghijklmnopqrstuvwxyz"


const expected = true

===

  Inputs/Expected:

const inputString = "abcdefghijklmnopqrstuvwxyzqwertuiopasdfghjklxcvbnm"


const expected = true

===

  Inputs/Expected:

const inputString = "fyudhrygiuhdfeis"


const expected = false

===

  Inputs/Expected:

const inputString = "zaa"


const expected = false

===

  Inputs/Expected:

const inputString = "zyy"


const expected = false

*/
