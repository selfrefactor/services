function toBinaryString(x){
  return (x >>> 0).toString(2);
}

function count(x, str){
  return (str.split('').filter(y => x === y)).length
}

function rangeBitCount(
    a,
    b
){
  let counter = 0

  for (let index = a; index < b+1; index++) {
    counter = counter + count('1', toBinaryString(index))
  }
  return counter
}

test('happy', () => {
    const a = 2
    const b = 7

  const result = rangeBitCount(
    a,
    b
  )

  const expected = 11    
  expect(result).toEqual(expected)
})


/*
  
  Inputs/Expected:

const a = 0
const b = 1


const expected = 1

===

  Inputs/Expected:

const a = 1
const b = 10


const expected = 17

===

  Inputs/Expected:

const a = 8
const b = 9


const expected = 3

===

  Inputs/Expected:

const a = 9
const b = 10


const expected = 4

*/