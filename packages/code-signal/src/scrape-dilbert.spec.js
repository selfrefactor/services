import { playwrightRun } from 'playwright-wrap'
import { delay, mapAsync } from 'rambdax'
import { ms } from 'string-fn'

export const initialSelector = '.img-responsive'
export const selector = 'img[class="img-responsive img-comic"]'

function handleError(err){
  console.log(err)
}

export async function scrape(date = `1999-03-11`){
  async function getRawData(_){
    await _.waitFor(initialSelector)
    await delay(5000)
    await _.page.locator(selector).screenshot({ path: `assets/${  date  }.png` });
  }
  const url  = `https://web.archive.org/web/20230302071539/https://dilbert.com/strip/${date}`
  await playwrightRun({fn: getRawData, fallback: null, url, handleError})
  await delay(22000)
}


jest.setTimeout(ms('30 minutes'))

test('happy', async () => {
  await mapAsync(scrape, getInput())
})


function getInput   (){
  return [
'1994-01-09',
'1994-02-05',
'1995-01-03',
'1995-07-31',
'1998-02-23',
'1997-12-07',
'1997-03-09',
'1996-05-26',
'1996-02-25',
'1994-12-16',
'1993-05-03',
'1993-01-23',
'1993-01-03',
'1992-10-13',
'1992-09-13',
'1992-08-18',
'1992-08-09',
'1992-04-05',
'1992-03-28',
'1992-03-19',
'1991-09-28',
'1991-04-04',
'1991-03-11',
'1989-12-17',
'2005-11-27',
'1993-04-17',
'2010-05-03'
  ]
}