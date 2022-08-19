const { map } = require('rambdax')
const { resolve } = require('path')
const BASE = resolve(__dirname, '../../../../popular-dependents-lists')
// const BASE = resolve(__dirname, '../../all-stars-of/')

const shouldRefreshScraped = true
const shouldRefreshApi = true
// to see it without headless
const IS_DEV = 0
const SHOW_PROGRESS = 1
const MAX_SCRAPE_DEPTH = 600

const playwright = {
  priority  : 0,
  daysLimit : 150,
  repo      : 'microsoft/playwright',
  title     : 'Popular dependents of **Playwright**',
  stars     : 5,
}
const puppeteer = {
  priority  : 2,
  daysLimit : 150,
  repo      : 'puppeteer/puppeteer',
  title     : 'Popular dependents of **Puppeteer**',
  stars     : 10,
}
const nest = {
  priority  : 2,
  daysLimit : 200,
  repo      : 'nestjs/nest',
  title     : 'Popular dependents of **Nest.js**',
  stars     : 10,
}
const angular = {
  priority   : 0,
  daysLimit  : 120,
  repo       : 'angular/angular',
  title      : 'Popular dependents of **Angular** frontend framework',
  stars      : 10,
}

const rambda = {
  priority   : 1,
  repo       : 'selfrefactor/rambda',
  title      : 'Popular dependents of **Rambda**',
  stars      : 2,
}

const rambdax = {
  priority   : 1,
  repo       : 'selfrefactor/rambdax',
  title      : 'Popular dependents of **Rambdax**',
  stars      : 2,
}

const swc = {
  priority : 2,
  repo     : 'swc-project/swc',
  title    : 'Popular dependents of **SWC(Rust-based platform for the Web)**',
  stars    : 10,
}

const ramda = {
  priority : 1,
  repo     : 'ramda/ramda',
  title    : 'Popular dependents of **Ramda**',
  stars    : 2,
}

const vitest = {
  priority : 1,
  repo     : 'vitest-dev/vitest',
  title    : 'Popular dependents of **Vitest**',
  stars    : 2,
}

const cucumber = {
  priority   : 1,
  repo       : 'cucumber/cucumber-js',
  title      : 'Popular dependents of **Cucumber.js**',
  stars      : 2,
}

const rough = {
  priority   : 1,
  repo       : 'rough-stuff/rough',
  title      : 'Popular dependents of **Rough**',
  stars      : 2,
}
const fpts = {
  priority   : 1,
  repo       : 'gcanti/fp-ts',
  title      : 'Popular dependents of **FP TS** - library for functional programming with TS support',
  stars      : 2,
}
const webAudio = {
  priority   : 2,
  repo       : 'audiojs/web-audio-api',
  title      : 'Popular dependents of **Web audio API**',
  stars      : 1,
}
const kefir = {
  priority   : 2,
  repo       : 'kefirjs/kefir',
  title      : 'Popular dependents of **Kefir**',
  stars      : 2,
}
const seneca = {
  priority   : 2,
  repo       : 'senecajs/seneca',
  title      : 'Popular dependents of **Seneca** framework',
  stars      : 2,
}
const rxjs = {
  priority   : 1,
  repo       : 'ReactiveX/rxjs',
  title      : 'Popular dependents of **RxJS**',
  stars      : 8,
}
const nextjs = {
  priority   : 1,
  repo       : 'vercel/next.js',
  title      : 'Popular dependents of **NextJS**',
  stars      : 12,
}
const bun = {
  priority   : 1,
  repo       : 'oven-sh/bun',
  title      : 'Popular dependents of **Bun**',
  stars      : 10,
}

const iterator = (x, prop) => ({
  ...x,
  daysLimit      : x.daysLimit ? x.daysLimit : 370,
  isHuge         : true,
  scrapeDeep     : true,
  showProgress   : SHOW_PROGRESS,
  maxScrapeDepth : MAX_SCRAPE_DEPTH,
  isDev          : IS_DEV,
  starsLimit     : x.stars ? x.stars : 5,
  shouldRefreshApi,
  shouldRefreshScraped,
  outputLocation : `${ BASE }/stars-of-${ prop }.md`,
})

const allModes = map(iterator, {
  rambda,
  rambdax,
  bun,
  playwright,
  puppeteer,
  ramda,
  rough,
  webAudio,
  fpts,
  seneca,
  nest,
  angular,
  swc,
  rxjs,
  nextjs,
  vitest,
  cucumber,
  kefir,
})

exports.allModes = allModes
