function convert(str) {
  if (str === 'Same as in-store') return 0
  const percent = str.split('%')[0]
  const number = Number(percent)

  return str.includes('higher') ? -number : number
}

function solution(prices, notes, x) {
  const converted = notes.map(convert)
  const convertedPrices = prices.map((price, i) => {
    if (converted[i] === 0) return price
    return Math.round(price / (1 - converted[i] / 100))
  })

  const sumConverted = convertedPrices.reduce((acc, price) => acc + price, 0)
  const sumPrices = prices.reduce((acc, price) => acc + price, 0)
  return sumPrices - sumConverted <= x
}

test('happy', () => {
  const prices = [110, 95, 70]
  const notes = [
    '10.0% higher than in-store',
    '5.0% lower than in-store',
    'Same as in-store',
  ]
  const x = 5

  const result = solution(prices, notes, x)

  expect(result).toEqual(true)
})

test('happ', () => {
  const notes = ['20.00% lower than in-store', '10.00% higher than in-store']
  const prices = [48, 165]
  const x = 2
  const result = solution(prices, notes, x)
  expect(result).toEqual(false)
})

/*

  Inputs/Expected:

const prices = [48, 165]
const notes = ["20.00% lower than in-store",
 "10.00% higher than in-store"]
const x = 2

const expected = Test 2InputReturn ValueConsole OutputError Outputprices: [48, 165]notes:
["20.00% lower than in-store",
 "10.00% higher than in-store"]x: 2

===

  Inputs/Expected:

const prices = [24.42, 24.42, 24.2424, 85.23]
const notes = ["13.157% higher than in-store",
 "13.157% lower than in-store",
 "Same as in-store",
 "19.24% higher than in-store"]
const x = 24.24

const expected = Test 3InputReturn ValueConsole OutputError Outputprices: [24.42, 24.42, 24.2424, 85.23]notes:
["13.157% higher than in-store",
 "13.157% lower than in-store",
 "Same as in-store",
 "19.24% higher than in-store"]x: 24.24

===

  Inputs/Expected:

const prices = [220]
const notes = ["120.0000% higher than in-store"]
const x = 120

const expected = Test 4InputReturn ValueConsole OutputError Outputprices: [220]notes: ["120.0000% higher than in-store"]x: 120

===

  Inputs/Expected:

const prices = [40, 40, 40, 40]
const notes = ["10.0% higher than in-store",
 "10.0% lower than in-store",
 "10.0% higher than in-store",
 "10.0% lower than in-store"]
const x = 0

const expected = Test 5InputReturn ValueConsole OutputError Outputprices: [40, 40, 40, 40]notes:
["10.0% higher than in-store",
 "10.0% lower than in-store",
 "10.0% higher than in-store",
 "10.0% lower than in-store"]x: 0

===

  Inputs/Expected:

const prices = [40, 40, 40, 40]
const notes = ["0.001% higher than in-store",
 "0.0% lower than in-store",
 "0.0% higher than in-store",
 "0.0% lower than in-store"]
const x = 0

const expected = Test 6InputReturn ValueConsole OutputError Outputprices: [40, 40, 40, 40]notes:
["0.001% higher than in-store",
 "0.0% lower than in-store",
 "0.0% higher than in-store",
 "0.0% lower than in-store"]x: 0

===

  Inputs/Expected:

const prices = [110, 110, 110, 110, 110, 110, 110, 110, 110, 160]
const notes = ["10.0% higher than in-store",
 "10.0% higher than in-store",
 "10.0% higher than in-store",
 "10.0% higher than in-store",
 "10.0% higher than in-store",
 "10.0% higher than in-store",
 "10.0% higher than in-store",
 "10.0% higher than in-store",
 "10.0% higher than in-store",
 "60.0% higher than in-store"]
const x = 150

const expected = Test 7InputReturn ValueConsole OutputError Outputprices: [110, 110, 110, 110, 110, 110, 110, 110, 110, 160]notes:
["10.0% higher than in-store",
 "10.0% higher than in-store",
 "10.0% higher than in-store",
 "10.0% higher than in-store",
 "10.0% higher than in-store",
 "10.0% higher than in-store",
 "10.0% higher than in-store",
 "10.0% higher than in-store",
 "10.0% higher than in-store",
 "60.0% higher than in-store"]x: 150

===

  Inputs/Expected:

const prices = [20]
const notes = ["100.0% higher than in-store"]
const x = 9

const expected = Test 8InputReturn ValueConsole OutputError Outputprices: [20]notes: ["100.0% higher than in-store"]x: 9

===

  Inputs/Expected:

const prices = [35000, 35000]
const notes = ["35000.0% higher than in-store",
 "10000.0% lower than in-store"]
const x = 150

const expected = Test 9InputReturn ValueConsole OutputError Outputprices: [35000, 35000]notes:
["35000.0% higher than in-store",
 "10000.0% lower than in-store"]x: 150

===

  Inputs/Expected:

const prices = [20, 20]
const notes = ["20.0% higher than in-store",
 "20.0% lower than in-store"]
const x = 0

const expected = Test 10InputReturn ValueConsole OutputError Outputprices: [20, 20]notes:
["20.0% higher than in-store",
 "20.0% lower than in-store"]x: 0

*/
