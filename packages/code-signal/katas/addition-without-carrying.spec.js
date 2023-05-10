function additionWithoutCarrying(
    param1,
    param2
){
  const holder = []
  const [longer, shorter] = param1 > param2 ? [param1, param2] : [param2, param1]
  const first = String(longer).split('').reverse() 
  const second = String(shorter).split('').reverse() 

  first.forEach((x /*?*/,i) => {
    if(second[i] === undefined){
      return holder.push(x)
    }
    const additionResult = String(Number(x) + Number(second[i])).split('')
    holder.push(additionResult.length === 2 ?additionResult[1]: additionResult[0])
  })
  holder
  return Number(holder.reverse().join(''))
}

test('happy', () => {
    const param1 = 456
    const param2 = 1734

  const result = additionWithoutCarrying(
    param1,
    param2
  )

  const expected = 1180    
  expect(result).toEqual(expected)
})
test('happy', () => {
    const param1 = 99999
    const param2 = 0

  const result = additionWithoutCarrying(
    param1,
    param2
  )

  const expected = 99999
  expect(result).toEqual(expected)
})


/*
  
  Inputs:



  Expected: 
  

===

  Inputs:

const param1 = 999
const param2 = 999


  Expected: 
  
const expected = 888

===

  Inputs:

const param1 = 0
const param2 = 0


  Expected: 
  
const expected = 0

===

  Inputs:

const param1 = 54321
const param2 = 54321


  Expected: 
  
const expected = 8642

===

  Inputs:

const param1 = 54321
const param2 = 56789


  Expected: 
  
const expected = 0

*/
