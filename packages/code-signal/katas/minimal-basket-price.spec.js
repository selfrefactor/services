function minimalBasketPrice(
    maxPrice,
    vendorsDelivery,
    vendorsProducts
){
  
  return
}

test('happy', () => {
    const maxPrice = 7
    const vendorsDelivery = [5, 4, 2, 3]
    const vendorsProducts = [[1,1,1], 
 [3,-1,3], 
 [-1,2,2], 
 [5,-1,-1]]

  const result = minimalBasketPrice(
    maxPrice,
    vendorsDelivery,
    vendorsProducts
  )

  const expected = [1, 2]    
  // expect(result).toEqual(expected)
})


/*
  
  Inputs/Expected:

const maxPrice = 6
const vendorsDelivery = [1, 5, 10, 12]
const vendorsProducts = [[-1,-1,-1], 
 [3,-1,-1], 
 [-1,2,-1], 
 [-1,-1,1]]


const expected = [1, 2, 3]

===

  Inputs/Expected:

const maxPrice = 5
const vendorsDelivery = [5, 6]
const vendorsProducts = [[5], 
 [6]]


const expected = [0]

===

  Inputs/Expected:

const maxPrice = 1000000
const vendorsDelivery = [1000000]
const vendorsProducts = [[1000000]]


const expected = [0]

===

  Inputs/Expected:

const maxPrice = 6
const vendorsDelivery = [100, 5, 10, 12]
const vendorsProducts = [[3,4,4], 
 [4,4,4], 
 [4,2,4], 
 [4,4,1]]


const expected = [0, 2, 3]

===

  Inputs/Expected:

const maxPrice = 10
const vendorsDelivery = [1]
const vendorsProducts = [[10]]


const expected = [0]

*/