function produceDivide(a, b){
  if(a%b !== 0) return {pass: false, a, b}
  const result = Math.floor(a/b)

  return {pass: true, a:b > result ? b: result,b: b > result ? result: b}
}


function solution(
    aInput,
    bInput
){
  let [a,b] = aInput> bInput ? [aInput,bInput]: [bInput,aInput]
  let counter = 0
  let whileCondition = true
  while(whileCondition){
    const result = produceDivide(a,b)
    if(!result.pass){
      whileCondition = false
      continue
    }
    counter++
    a = result.a
    b = result.b
  }
  return counter
}

test('happy', () => {
    const a = 432
    const b = 72

  const result = solution(
    a,
    b
  )

  const expected = 4    
  expect(result).toEqual(expected)
})


/*
  
  Inputs/Expected:

const a = 7
const b = 14


const expected = 1

*/
