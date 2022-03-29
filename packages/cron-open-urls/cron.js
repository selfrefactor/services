const {readJson}  = require('fs-extra')
const {ms}  = require('string-fn')
const {delay, mapAsync, mapFastAsync}  = require('rambdax')
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
  const delays = [ms(priorities['1']), ms(priorities['2']), ms(priorities['3'])]

  const firstBatch = getURLs(urls, '1')
  const secondBatch = getURLs(urls, '2')
  const thirdBatch = getURLs(urls, '3')

  await mapFastAsync(async (batch, i) => {
    if(batch.length > 0 ){
      if(i === 2) openURLs(batch)
      while(true){
        await delay(delays[i])
        openURLs(batch,stepDelay)
      }
    }
  }, [firstBatch, secondBatch, thirdBatch])
}()
