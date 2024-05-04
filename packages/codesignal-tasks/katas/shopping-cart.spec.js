// https://app.codesignal.com/challenge/MCvv9beeFd96hWwRe

class ShoppingCart{
  constructor(){
    this.items = []
  }

  getItem(itemKey){
    return this.items.find(item => item.key === itemKey)
  }
  setItem(itemKey, quantity){
    let foundItem = this.getItem(itemKey)
    if(foundItem){
      foundItem.quantity = quantity
      this.items = this.items.map(item => {
        if(item.key === itemKey){
          return foundItem
        }
        return item
      })
    }else{
      this.items.push({key: itemKey, quantity})
    }
  }
  add(itemKey){
    this.setItem(itemKey, 1)
  }

  remove(itemKey){
    this.items = this.items.filter(item => item.key !== itemKey)
  }

  quantity_upd(item, quantity){
    let [operation, ...value] = quantity.split('')
    let foundItem = this.getItem(item)
    let actualValue = parseInt(value.join(''))

    if(operation === '+'){
      this.setItem(item, foundItem ? foundItem.quantity + actualValue : actualValue)
    }else if(operation === '-'){
      this.setItem(item, 
        Math.max(0, foundItem ? foundItem.quantity - actualValue : 0)
      )
    }
  }

  checkout(){
    let toReturn = this.items
    this.items = []
    return toReturn
  }
  getState(){
    return this.items.map(item => `${item.key} : ${item.quantity}`)
  }

  evaluateOperation(operation){
    let [op, itemKey, quantity] = operation.split(' : ')
    if(op === 'add'){
      this.add(itemKey)
    }else if(op === 'remove'){
      this.remove(itemKey)
    }else if(op === 'quantity_upd'){
      this.quantity_upd(itemKey, quantity)
    }else if(op === 'checkout'){
      return this.checkout()
    }
  }

}

function solution(requests){
  let shoppingCart = new ShoppingCart()
  requests.forEach(request => {
    shoppingCart.evaluateOperation(request)
  })
  return shoppingCart.getState()
}

test('happy', () => {
  /**
   * requests:
  */
 
 const requests = 
 ["add : milk", 
  "add : pickles", 
  "remove : milk", 
  "add : milk", 
  "quantity_upd : pickles : +4"]
 
  const result = solution(requests)
  const expected = ["pickles : 5", 
 "milk : 1"]
  console.log(result)

  /**
   expected

    ["pickles : 5", 
 "milk : 1"]
  */
})


/*
  
  Inputs/Expected:

requests:
["add : rock", 
 "add : paper", 
 "add : scissors", 
 "checkout", 
 "add : golden medal"]

["golden medal : 1"]

===

  Inputs/Expected:

requests:
["add : milk", 
 "add : pickles", 
 "remove : milk", 
 "checkout", 
 "add : milk", 
 "quantity_upd : milk : +3", 
 "quantity_upd : milk : -2"]

["milk : 2"]

===

  Inputs/Expected:

requests:
["add : milk", 
 "add : pickles", 
 "add : fruitz", 
 "add : vegetables", 
 "add : computer", 
 "add : whattheawesomeshopisit", 
 "quantity_upd : computer : +2", 
 "remove : computer", 
 "remove : milk", 
 "add : computer", 
 "quantity_upd : fruitz : +100", 
 "add : computer mouse", 
 "add : computer monitor", 
 "quantity_upd : computer mouse : +3", 
 "quantity_upd : computer mouse : +5", 
 "quantity_upd : computer : +3", 
 "quantity_upd : fruitz : -50", 
 "add : fruitz seed"]

["pickles : 1", 
 "fruitz : 51", 
 "vegetables : 1", 
 "whattheawesomeshopisit : 1", 
 "computer : 4", 
 "computer mouse : 9", 
 "computer monitor : 1", 
 "fruitz seed : 1"]

===

  Inputs/Expected:

requests:
["add : milk", 
 "add : pickles", 
 "add : fruits", 
 "checkout", 
 "checkout", 
 "checkout", 
 "checkout"]

[]

*/