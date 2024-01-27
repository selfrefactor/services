function parseMoveCommand(command){
  const matches = command.match(/move\s(?<howMany>[0-9]+)\sfrom\s(?<oldPlace>[0-9]+)\sto\s(?<newDestination>[0-9]+)/)

  return {
    howMany        : Number(matches.groups.howMany),
    oldPlace       : Number(matches.groups.oldPlace) - 1,
    newDestination : Number(matches.groups.newDestination) - 1,
  }
}

class Crates{
  columns = []
  constructor(input){
    const max = input.reduce((acc, curr) => Math.max(acc, curr.length), 0)
    Array.from({ length : max }).forEach((_, i) => {
      if (!this.columns[ i ]){
        this.columns[ i ] = []
      }
      input.forEach((__, j) => {
        if (input[ j ][ i ]){
          this.columns[ i ].push(input[ j ][ i ])
        }
      })
    })
  }

  move(command){
    const { howMany, oldPlace, newDestination } = parseMoveCommand(command)
    Array.from({ length : Number(howMany) }).forEach(() => {
      const moved = this.columns[ oldPlace ].shift()
      this.columns[ newDestination ].unshift(moved)
    })
  }

  moveOldModel(command){
    const { howMany, oldPlace, newDestination } = parseMoveCommand(command)
    const movedList = Array.from({ length : Number(howMany) }).map(() => this.columns[ oldPlace ].shift())
    this.columns[ newDestination ] = movedList.concat(this.columns[ newDestination ])
  }

  getResult(){
    return this.columns.map(column => column[ 0 ]).join('')
  }
}

function splitEvery(str, n){
  const result = []
  for (let i = 0; i < str.length; i += n){
    result.push(str.slice(i, i + n))
  }

  return result
}

function getCrates(cratesInput){
  return cratesInput
    .split('\n')
    .map(row => splitEvery(row, 4).map(x => x.trim().replace(/[\]\[]/g, '')))
}

test('second', () => {
  const { crates: cratesInput, moves } = getInput()
  const crates = new Crates(getCrates(cratesInput))

  moves.split('\n').forEach(move => {
    crates.moveOldModel(move)
  })
  console.log(crates.getResult())
})

test('first', () => {
  const { crates: cratesInput, moves } = getInput()
  const crates = new Crates(getCrates(cratesInput))
  moves.split('\n').forEach(move => {
    crates.move(move)
  })
  console.log(crates.getResult())
})

function getDemoInput(){
  const crates = `    [D]    
[N] [C]    
[Z] [M] [P]`

  const moves = `
move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`.trim()

  return {
    crates,
    moves,
  }
}

function getInput(){
  const crates = `[J]             [F] [M]            
[Z] [F]     [G] [Q] [F]            
[G] [P]     [H] [Z] [S] [Q]        
[V] [W] [Z] [P] [D] [G] [P]        
[T] [D] [S] [Z] [N] [W] [B] [N]    
[D] [M] [R] [J] [J] [P] [V] [P] [J]
[B] [R] [C] [T] [C] [V] [C] [B] [P]
[N] [S] [V] [R] [T] [N] [G] [Z] [W]`

  const moves = `
move 2 from 4 to 6
move 1 from 9 to 5
move 3 from 2 to 4
move 8 from 4 to 7
move 2 from 9 to 7
move 3 from 8 to 3
move 2 from 1 to 2
move 5 from 7 to 9
move 1 from 9 to 4
move 1 from 8 to 3
move 1 from 3 to 4
move 2 from 4 to 9
move 7 from 3 to 5
move 6 from 1 to 8
move 11 from 7 to 9
move 12 from 5 to 3
move 6 from 6 to 9
move 3 from 3 to 8
move 4 from 2 to 7
move 3 from 5 to 7
move 1 from 5 to 7
move 2 from 2 to 5
move 1 from 5 to 2
move 5 from 8 to 9
move 7 from 7 to 2
move 3 from 8 to 7
move 1 from 8 to 9
move 4 from 3 to 6
move 1 from 5 to 1
move 9 from 9 to 6
move 7 from 9 to 6
move 20 from 6 to 5
move 12 from 9 to 8
move 5 from 5 to 1
move 3 from 7 to 4
move 6 from 2 to 7
move 2 from 3 to 1
move 4 from 3 to 8
move 1 from 4 to 1
move 7 from 7 to 5
move 4 from 8 to 2
move 3 from 6 to 2
move 3 from 2 to 9
move 4 from 1 to 7
move 2 from 1 to 2
move 3 from 9 to 5
move 11 from 8 to 5
move 1 from 6 to 9
move 1 from 8 to 5
move 1 from 1 to 2
move 24 from 5 to 4
move 2 from 1 to 6
move 11 from 5 to 4
move 2 from 7 to 9
move 1 from 6 to 2
move 4 from 2 to 1
move 28 from 4 to 2
move 1 from 7 to 8
move 9 from 2 to 5
move 2 from 9 to 6
move 4 from 4 to 2
move 1 from 7 to 4
move 3 from 4 to 7
move 1 from 6 to 9
move 21 from 2 to 3
move 3 from 1 to 6
move 5 from 6 to 2
move 7 from 2 to 3
move 1 from 9 to 3
move 1 from 8 to 4
move 1 from 7 to 8
move 3 from 5 to 8
move 1 from 1 to 7
move 2 from 7 to 9
move 2 from 8 to 4
move 1 from 9 to 2
move 1 from 8 to 6
move 11 from 3 to 4
move 1 from 7 to 8
move 6 from 5 to 9
move 2 from 8 to 7
move 1 from 6 to 5
move 7 from 3 to 8
move 9 from 3 to 6
move 1 from 8 to 3
move 1 from 7 to 4
move 2 from 3 to 5
move 4 from 5 to 7
move 4 from 6 to 8
move 2 from 7 to 9
move 11 from 4 to 2
move 1 from 4 to 2
move 6 from 8 to 9
move 1 from 7 to 1
move 1 from 3 to 7
move 3 from 7 to 8
move 6 from 8 to 9
move 6 from 4 to 8
move 18 from 9 to 3
move 1 from 5 to 8
move 5 from 6 to 5
move 6 from 8 to 1
move 3 from 5 to 4
move 1 from 9 to 8
move 3 from 4 to 8
move 15 from 3 to 6
move 2 from 5 to 9
move 3 from 3 to 1
move 9 from 6 to 4
move 2 from 1 to 5
move 2 from 5 to 8
move 6 from 4 to 2
move 6 from 1 to 6
move 3 from 4 to 6
move 6 from 9 to 1
move 4 from 2 to 1
move 7 from 8 to 1
move 1 from 6 to 7
move 17 from 1 to 5
move 1 from 7 to 1
move 5 from 2 to 1
move 1 from 8 to 6
move 11 from 6 to 4
move 2 from 2 to 3
move 3 from 1 to 8
move 7 from 2 to 5
move 4 from 6 to 7
move 4 from 1 to 5
move 15 from 5 to 9
move 2 from 3 to 7
move 2 from 8 to 2
move 1 from 1 to 9
move 6 from 2 to 6
move 7 from 5 to 6
move 5 from 7 to 3
move 1 from 6 to 1
move 2 from 3 to 4
move 1 from 3 to 4
move 5 from 6 to 4
move 14 from 9 to 2
move 1 from 8 to 9
move 1 from 7 to 8
move 1 from 9 to 6
move 2 from 9 to 5
move 1 from 1 to 2
move 7 from 6 to 9
move 1 from 3 to 4
move 8 from 5 to 2
move 1 from 6 to 7
move 1 from 7 to 4
move 1 from 8 to 4
move 1 from 3 to 9
move 7 from 9 to 5
move 1 from 9 to 1
move 6 from 5 to 1
move 8 from 2 to 4
move 1 from 5 to 6
move 1 from 6 to 7
move 1 from 7 to 9
move 7 from 2 to 9
move 1 from 9 to 4
move 3 from 9 to 1
move 1 from 9 to 6
move 11 from 2 to 8
move 9 from 1 to 8
move 1 from 6 to 4
move 1 from 1 to 9
move 12 from 4 to 2
move 4 from 9 to 3
move 3 from 4 to 6
move 9 from 8 to 6
move 12 from 4 to 9
move 8 from 6 to 3
move 8 from 2 to 7
move 11 from 3 to 4
move 2 from 2 to 7
move 2 from 6 to 1
move 1 from 2 to 3
move 2 from 6 to 2
move 3 from 2 to 6
move 2 from 1 to 6
move 1 from 6 to 1
move 1 from 6 to 4
move 2 from 6 to 3
move 1 from 6 to 5
move 4 from 3 to 8
move 12 from 4 to 5
move 5 from 9 to 7
move 3 from 8 to 7
move 1 from 9 to 1
move 3 from 8 to 2
move 13 from 5 to 6
move 1 from 2 to 9
move 13 from 6 to 7
move 7 from 9 to 6
move 2 from 4 to 6
move 1 from 8 to 6
move 1 from 1 to 6
move 1 from 2 to 9
move 1 from 2 to 3
move 12 from 7 to 9
move 7 from 8 to 4
move 1 from 1 to 3
move 2 from 7 to 9
move 15 from 7 to 4
move 8 from 6 to 3
move 1 from 8 to 9
move 1 from 7 to 2
move 10 from 3 to 5
move 6 from 5 to 9
move 1 from 2 to 8
move 1 from 5 to 8
move 2 from 8 to 9
move 10 from 4 to 9
move 20 from 9 to 6
move 1 from 7 to 6
move 4 from 9 to 3
move 1 from 5 to 9
move 4 from 4 to 9
move 8 from 9 to 7
move 2 from 5 to 1
move 7 from 4 to 3
move 8 from 3 to 2
move 6 from 9 to 8
move 1 from 3 to 7
move 1 from 3 to 1
move 7 from 7 to 8
move 13 from 8 to 3
move 2 from 2 to 8
move 1 from 8 to 2
move 1 from 4 to 1
move 1 from 1 to 8
move 2 from 8 to 2
move 24 from 6 to 2
move 2 from 7 to 8
move 5 from 3 to 4
move 25 from 2 to 6
move 5 from 4 to 9
move 2 from 8 to 7
move 2 from 7 to 3
move 4 from 6 to 2
move 2 from 6 to 4
move 9 from 2 to 3
move 11 from 3 to 7
move 10 from 7 to 8
move 1 from 7 to 9
move 3 from 2 to 4
move 8 from 8 to 2
move 1 from 2 to 6
move 2 from 4 to 1
move 1 from 8 to 2
move 1 from 6 to 9
move 1 from 8 to 3
move 6 from 9 to 7
move 2 from 9 to 1
move 9 from 6 to 8
move 7 from 2 to 3
move 7 from 8 to 2
move 10 from 6 to 8
move 7 from 1 to 2
move 9 from 3 to 2
move 5 from 3 to 8
move 4 from 7 to 2
move 2 from 3 to 2
move 12 from 2 to 3
move 6 from 4 to 2
move 1 from 7 to 6
move 5 from 3 to 5
move 16 from 8 to 4
move 12 from 2 to 7
move 5 from 5 to 7
move 1 from 8 to 3
move 1 from 6 to 4
move 17 from 7 to 4
move 1 from 7 to 1
move 1 from 1 to 9
move 1 from 9 to 5
move 11 from 4 to 9
move 10 from 2 to 3
move 1 from 5 to 4
move 1 from 9 to 2
move 2 from 2 to 1
move 1 from 2 to 3
move 23 from 4 to 5
move 7 from 9 to 7
move 3 from 9 to 1
move 20 from 5 to 6
move 3 from 5 to 8
move 1 from 4 to 1
move 2 from 8 to 3
move 4 from 6 to 4
move 7 from 7 to 2
move 1 from 8 to 4
move 19 from 3 to 9
move 5 from 1 to 7
move 7 from 2 to 6
move 3 from 7 to 5
move 2 from 3 to 4
move 1 from 5 to 4
move 1 from 1 to 4
move 1 from 7 to 6
move 13 from 6 to 7
move 6 from 9 to 3
move 1 from 3 to 5
move 2 from 3 to 4
move 2 from 6 to 2
move 3 from 4 to 3
move 8 from 9 to 1
move 2 from 2 to 1
move 8 from 6 to 7
move 2 from 9 to 4
move 20 from 7 to 1
move 2 from 7 to 5
move 2 from 5 to 1
move 8 from 1 to 8
move 8 from 8 to 6
move 1 from 6 to 9
move 8 from 6 to 1
move 1 from 5 to 3
move 7 from 3 to 2
move 1 from 5 to 2
move 2 from 9 to 7
move 1 from 5 to 8
move 18 from 1 to 4
move 1 from 8 to 9
move 3 from 2 to 3
move 2 from 7 to 4
move 5 from 2 to 4
move 3 from 3 to 8
move 8 from 1 to 7
move 2 from 9 to 2
move 32 from 4 to 5
move 1 from 9 to 7
move 1 from 2 to 1
move 6 from 1 to 6
move 1 from 2 to 4
move 3 from 8 to 1
move 3 from 6 to 5
move 1 from 3 to 6
move 2 from 1 to 9
move 4 from 4 to 7
move 31 from 5 to 4
move 4 from 5 to 6
move 1 from 6 to 1
move 7 from 6 to 5
move 1 from 9 to 4
move 19 from 4 to 2
move 1 from 5 to 9
move 5 from 5 to 6
move 3 from 4 to 2
move 2 from 7 to 1
move 4 from 7 to 8
move 3 from 8 to 6
move 2 from 6 to 7
move 6 from 7 to 8
move 3 from 1 to 5
move 4 from 5 to 9
move 15 from 2 to 1
move 4 from 6 to 4
move 2 from 6 to 3
move 1 from 3 to 7
move 4 from 1 to 2
move 1 from 3 to 4
move 2 from 7 to 4
move 5 from 9 to 3
move 2 from 7 to 3
move 16 from 4 to 8
move 8 from 8 to 5
move 2 from 1 to 5
move 1 from 9 to 6
move 1 from 6 to 5
move 7 from 5 to 9
move 3 from 1 to 8
move 1 from 8 to 4
move 8 from 2 to 7
move 3 from 1 to 3
move 1 from 3 to 9
move 2 from 4 to 2
move 7 from 8 to 5
move 7 from 9 to 1
move 6 from 3 to 5
move 6 from 7 to 4
move 3 from 4 to 1
move 3 from 2 to 5
move 1 from 7 to 8
move 1 from 7 to 5
move 1 from 9 to 8
move 2 from 2 to 4
move 15 from 1 to 6
move 8 from 5 to 9
move 3 from 3 to 4
move 4 from 4 to 3
move 1 from 9 to 7
move 6 from 9 to 4
move 1 from 9 to 2
move 6 from 4 to 9
move 2 from 4 to 6
move 5 from 6 to 9
move 1 from 3 to 1
move 8 from 6 to 8
move 12 from 5 to 3
move 1 from 5 to 3
move 1 from 3 to 8
move 4 from 6 to 1
move 11 from 3 to 8
move 1 from 2 to 1
move 23 from 8 to 2
move 3 from 1 to 2
move 1 from 1 to 9
move 2 from 2 to 3
move 6 from 3 to 6
move 1 from 7 to 6
move 1 from 4 to 7
move 1 from 4 to 3
move 1 from 7 to 3
move 4 from 8 to 4
move 2 from 1 to 8
move 3 from 8 to 1
move 4 from 6 to 2
move 7 from 9 to 1
move 1 from 9 to 6
move 2 from 2 to 3
move 3 from 9 to 4
move 1 from 9 to 3
move 10 from 2 to 8
move 16 from 2 to 5
move 2 from 3 to 6
move 6 from 1 to 8
move 1 from 1 to 5
move 8 from 8 to 5
move 11 from 5 to 9
move 2 from 1 to 8
move 1 from 1 to 8
move 4 from 4 to 6
move 3 from 3 to 9
move 14 from 9 to 3
move 15 from 8 to 5
move 9 from 5 to 4
move 7 from 6 to 1
move 1 from 6 to 3
move 4 from 4 to 7
move 2 from 6 to 2
move 4 from 7 to 4
move 4 from 1 to 4
move 10 from 4 to 3
move 14 from 3 to 6
move 5 from 4 to 1
move 6 from 5 to 7
move 1 from 2 to 6
move 3 from 7 to 2
move 2 from 2 to 3
move 3 from 7 to 8
move 2 from 8 to 2
move 2 from 2 to 7
move 6 from 6 to 2
move 1 from 8 to 7
move 8 from 2 to 7
move 1 from 4 to 1
move 5 from 5 to 3
move 3 from 3 to 2
move 5 from 1 to 3
move 7 from 5 to 8
move 6 from 6 to 3
move 1 from 5 to 9
move 10 from 7 to 9
move 26 from 3 to 4
move 1 from 5 to 1
move 6 from 8 to 2
move 9 from 2 to 9
move 1 from 7 to 5
move 1 from 8 to 5
move 2 from 6 to 2
move 20 from 9 to 6
move 1 from 1 to 6
move 1 from 4 to 2
move 1 from 5 to 8
move 1 from 5 to 7
move 3 from 1 to 3
move 1 from 3 to 6
move 12 from 4 to 8
move 11 from 4 to 5
move 1 from 7 to 5
move 1 from 2 to 8
move 1 from 1 to 8
move 2 from 2 to 5
move 8 from 6 to 2
move 5 from 6 to 4
move 2 from 5 to 3
move 12 from 8 to 4
move 5 from 2 to 6
move 3 from 8 to 1
move 11 from 6 to 8
move 10 from 4 to 6
move 5 from 4 to 6
move 12 from 6 to 5
move 22 from 5 to 6
move 3 from 6 to 5
move 3 from 8 to 5
move 1 from 3 to 8
move 4 from 8 to 1
move 6 from 1 to 7
move 5 from 6 to 9
  `.trim()

  return {
    crates,
    moves,
  }
}
