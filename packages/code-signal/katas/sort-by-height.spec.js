function sortByHeight(
    list
){
  const sorted = list.filter(x => x!== -1).sort(
    (a,b) => a>b?1:-1
  )
  let counter= 0

  return list.map(x => {
    if(x === -1) return x
    return sorted[counter++]
  })
}

test('happy', () => {
  const a = [4, 2, 9, 11, 2, 16]


  
const expected = [2, 2, 4, 9, 11, 16]
  const result = sortByHeight(
    a
  )
  result

  expect(result).toEqual(expected)
})


/*
  
  Inputs:

const a = [-1, -1, -1, -1, -1]


  Expected: 
  
const expected = [-1, -1, -1, -1, -1]

===

  Inputs:

const a = [-1]


  Expected: 
  
const expected = [-1]

===

  Inputs:

const a = [4, 2, 9, 11, 2, 16]


  Expected: 
  
const expected = [2, 2, 4, 9, 11, 16]

===

  Inputs:

const a = [2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1]


  Expected: 
  
const expected = [1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2]

===

  Inputs:

const a = [23, 54, -1, 43, 1, -1, -1, 77, -1, -1, -1, 3]


  Expected: 
  
const expected = [1, 3, -1, 23, 43, -1, -1, 54, -1, -1, -1, 77]

*/