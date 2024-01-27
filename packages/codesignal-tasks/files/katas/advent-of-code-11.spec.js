function getCalculatedWorry(item, operation){
  let newValue
  let old = item
  eval(operation)
  return Math.floor(newValue / 3)
}

class Monkey {
  inspectionCount = 0
  currentItems = []
  id = 0
  operation = ''
  divisibleBy = 0
  onTrue = 0
  onFalse = 0
  constructor (input, id) {
    this.id = id
    this.currentItems = input[0].split(': ')[1].split(', ').map(x => parseInt(x))
    this.operation = input[1].split(': ')[1].replace('new', 'newValue')
    this.divisibleBy = Number(input[2].split('divisible by')[1].trim())
    this.onTrue = Number(input[3].split('monkey ')[1].split('\n')[0])
    this.onFalse = Number(input[4].split('monkey ')[1].split('\n')[0])
  }
  runSingleRound () {
    if(this.currentItems.length === 0) return null
    const moves = []
    this.inspectionCount = this.inspectionCount + this.currentItems.length
    
    while(this.currentItems.length > 0){
      const item = this.currentItems.shift()
      const calculatedWorry = getCalculatedWorry(item, this.operation)
      const newMonkey = calculatedWorry % this.divisibleBy === 0 ? this.onTrue : this.onFalse
      moves.push({newMonkey, item})
    }
    return moves
  }
}

test('happy', () => {
  const input = getInput().reduce((acc, x) => {
    if (x.startsWith('Monkey')){
      acc.push([])
    }else{
      acc[ acc.length - 1 ].push(x)
    }
    return acc
  }, [])
  const monkeys = input.map((monkey, i) => {
    return new Monkey(monkey, i)
  })

  function runSingleRound(){
    const moves = monkeys.map((monkey) => {
      return monkey.runSingleRound()
    }).filter(Boolean).flat()
    moves.forEach((move) => {
      monkeys[move.newMonkey].currentItems.push(move.item)
    })
  }
  Array.from({ length: 8 }).forEach((_, i) => {
    runSingleRound()
  })
  monkeys.sort((a, b) => a.inspectionCount - b.inspectionCount)
  console.log(monkeys[6].inspectionCount)
  console.log(monkeys[7].inspectionCount)
  console.log(monkeys[6].inspectionCount * monkeys[7].inspectionCount)
})

function getInput(){
  return `
  Monkey 0:
  Starting items: 84, 72, 58, 51
  Operation: new = old * 3
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 7

Monkey 1:
  Starting items: 88, 58, 58
  Operation: new = old + 8
  Test: divisible by 2
    If true: throw to monkey 7
    If false: throw to monkey 5

Monkey 2:
  Starting items: 93, 82, 71, 77, 83, 53, 71, 89
  Operation: new = old * old
  Test: divisible by 7
    If true: throw to monkey 3
    If false: throw to monkey 4

Monkey 3:
  Starting items: 81, 68, 65, 81, 73, 77, 96
  Operation: new = old + 2
  Test: divisible by 17
    If true: throw to monkey 4
    If false: throw to monkey 6

Monkey 4:
  Starting items: 75, 80, 50, 73, 88
  Operation: new = old + 3
  Test: divisible by 5
    If true: throw to monkey 6
    If false: throw to monkey 0

Monkey 5:
  Starting items: 59, 72, 99, 87, 91, 81
  Operation: new = old * 17
  Test: divisible by 11
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 6:
  Starting items: 86, 69
  Operation: new = old + 6
  Test: divisible by 3
    If true: throw to monkey 1
    If false: throw to monkey 0

Monkey 7:
  Starting items: 91
  Operation: new = old + 1
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 5

  `.trim().split('\n').map(x => x.trim()).filter(x => x.length > 0)
}
