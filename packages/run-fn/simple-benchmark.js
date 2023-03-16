const list = Array(20000000).fill(null)

function test(fn, label){
  console.time(label)
  list.forEach((x) => {
    fn(x)
  })
  console.timeEnd(label)
}

const foo = x => x == undefined 
const bar = x => x === undefined 

test(foo, 'foo')
test(bar, 'bar')
