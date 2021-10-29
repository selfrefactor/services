const list = Array(100000000).fill('')

function test(fn, label){
  console.time(label)
  list.forEach((x) => {
    fn(x)
  })
  console.timeEnd(label)
}

const foo = x => typeof x == 'string' 
const bar = x => typeof x === 'string' 

test(foo, 'foo')
test(bar, 'bar')
