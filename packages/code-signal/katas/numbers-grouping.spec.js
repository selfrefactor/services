function group(list){
  const hash = {}
  list.forEach(x => {
    const whole = Math.floor(x / 10000)
    const remainder  = x % 10000
    const marker = remainder === 0 ? whole - 1: whole
    if(hash[marker] === undefined){
      hash[marker] = [x]
    }else{
      hash[marker].push(x)
    }
  })

  const sorted = Object.keys(hash).sort(
    (a, b) => Number(a) > Number(b) ? 1 : -1
  )
  return sorted.map(hashKey => hash[hashKey])
}

function numbersGrouping(
    list
){
  
  return list.length + group(list).length
}

test('happy', () => {
    const a = [20000, 239, 10001, 999999, 10000, 20566, 29999]
  console.log(group(a).length);
  const result = numbersGrouping(
    a
  )

  const expected = 11    
  expect(result).toEqual(expected)
})


/*
  
  Inputs/Expected:

const a = [10000, 20000, 30000, 40000, 50000, 60000, 10000, 120000, 150000, 200000, 300000, 1000000, 10000000, 100000000, 10000000]


const expected = 28

===

  Inputs/Expected:

const a = [10000]


const expected = 2

===

  Inputs/Expected:

const a = [10000, 1]


const expected = 3

===

  Inputs/Expected:

const a = [685400881, 696804468, 696804942, 803902442, 976412678, 976414920, 47763597, 803900633, 233144924, 47764349, 233149077, 214990733, 214994039, 280528089, 280524347, 685401797]


const expected = 24

===

  Inputs/Expected:

const a = [598589004, 92986320, 520103781, 808743817, 635098665, 95244159, 808747008, 867017063, 635092226, 867013865, 92989995, 520100093, 95245838, 84897101, 598583113, 84893918]


const expected = 24

===

  Inputs/Expected:

const a = [1000000000, 999990000, 999980000, 999970000, 999960000, 999950000, 999940000, 999930000, 999920000, 999910000]


const expected = 20

===

  Inputs/Expected:

const a = [102382103, 21039898, 39823, 433, 30928398, 40283209, 23234, 342534, 98473483, 498398424, 9384984, 9839239]


const expected = 24

*/