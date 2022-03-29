const {readJson}  = require('fs-extra')
const {ms}  = require('string-fn')
const {delay, mapAsync}  = require('rambdax')
const open = require('open');

async function openURLs(urls, stepDelay){
  await mapAsync(async (url) => {
    open(url)
    await delay(stepDelay)
  }, urls)
}

function getURLs(urls, priority){
  return urls.filter(x => {
    if(priority === '3' && x.priority === undefined) return true
    if(x.priority === undefined) return false
    return x.priority === priority
  }).map(x => x.url)  
}

const source = `${__dirname}/config.json`
void async function cron(){
  const {priorities, urls, delay: stepDelay} = await readJson(source)
  const firstDelay = ms(priorities['1'])
  const secondDelay = ms(priorities['2'])
  const thirdDelay = ms(priorities['3'])
  console.log(`delays`, {firstDelay, secondDelay, thirdDelay})

  const firstBatch = getURLs(urls, '1')
  const secondBatch = getURLs(urls, '2')
  const thirdBatch = getURLs(urls, '3')
  console.log(`batches`, {thirdBatch, secondBatch, firstBatch})
  if(thirdBatch.length > 0 ){
    openURLs(thirdBatch)
    while(true){
      await delay(thirdDelay)
      openURLs(thirdBatch,stepDelay)
    }
  }
  if(secondBatch.length > 0 ){
    while(true){
      await delay(secondDelay)
      openURLs(secondBatch,stepDelay)
    }
  }
  if(firstBatch.length > 0 ){
    while(true){
      await delay(firstDelay)
      openURLs(firstBatch,stepDelay)
    }
  }
}()
