const {replace} = require('rambda')

function ramdaCompose(
  text,
  numberOfParameters
){
  const replacer = {}
  Array(numberOfParameters).fill('').forEach(
    (_, i) => {
      replacer[`fn${i}`] = `FN${numberOfParameters - i - 1}`
    }
  )
  let textHolder = text
  Object.entries(replacer).forEach(
    ([from, to]) => {
      textHolder = replace(
        new RegExp(from, 'g'),
        `REPLACE_FROM_${from}_TO_${to}`,
        textHolder
      )
    }
  )
  Object.entries(replacer).forEach(
    ([from, to]) => {
      const marker = `REPLACE_FROM_${from}_TO_${to}`
      textHolder = replace(
        new RegExp(marker, 'g'),
        to.toLowerCase(),
        textHolder
      )
    }
  )
  console.log(textHolder)
}

const input = `
export function compose<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(fn0: () => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5, fn5: (x: T5) => T6, fn6: (x: T6) => T7, fn7: (x: T7) => T8, fn8: (x: T8) => T9, fn9: (x: T9) => T10): () => T10;
export function compose<V0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(fn0: (x0: V0) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5, fn5: (x: T5) => T6, fn6: (x: T6) => T7, fn7: (x: T7) => T8, fn8: (x: T8) => T9, fn9: (x: T9) => T10): (x0: V0) => T10;
export function compose<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(fn0: (x0: V0, x1: V1) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5, fn5: (x: T5) => T6, fn6: (x: T6) => T7, fn7: (x: T7) => T8, fn8: (x: T8) => T9, fn9: (x: T9) => T10): (x0: V0, x1: V1) => T10;
export function compose<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(fn0: (x0: V0, x1: V1, x2: V2) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5, fn5: (x: T5) => T6, fn6: (x: T6) => T7, fn7: (x: T7) => T8, fn8: (x: T8) => T9, fn9: (x: T9) => T10): (x0: V0, x1: V1, x2: V2) => T10;
`.trim()

test('happy', () => {
const result = ramdaCompose(
  input,
  // equals to LAST in <..., T8, T{LAST}>
  10
)

console.log(`result`, result)
})
