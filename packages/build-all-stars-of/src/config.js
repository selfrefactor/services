const { resolve } = require('path')
const { map } = require('rambdax')
const BASE = resolve(__dirname, '../../all-stars-of/')

const shouldRefreshScraped = true
const shouldRefreshApi = true
const IS_DEV = 0
const SHOW_PROGRESS = 1
const MAX_SCRAPE_DEPTH = 600

const playwright = {
  priority: 0,
  daysLimit: 150,
  repo: 'microsoft/playwright',
  title : 'Popular dependants of **Playwright**',
  stars:5
}
const puppeteer = {
  priority: 2,
  daysLimit: 150,
  repo: 'puppeteer/puppeteer',
  title : 'Popular dependants of **Puppeteer**',
  stars:10
}
const nest = {
  priority: 2,
  daysLimit: 200,
  repo: 'nestjs/nest',
  title : 'Popular dependants of **Nest.js**',
  stars:10
}
const angular = {
  priority: 0,
  daysLimit: 120,
  scrapeDeep: true,
  repo: 'angular/angular',
  title : 'Popular dependants of **Angular** frontend framework',
  stars:10
}

const rambda = {
  priority: 1,
  scrapeDeep: true,
  repo: 'selfrefactor/rambda',
  title : 'Popular dependants of **Rambda** list',
  stars: 2
}

const swc = {
  priority: 2,
  repo: 'swc-project/swc',
  title : 'Popular dependants of **SWC(Rust-based platform for the Web)** list',
  stars: 10
}

const ramda = {
  priority: 1,
  repo: 'ramda/ramda',
  title : 'Popular dependants of **Ramda** list',
  stars: 2
}

const vitest = {
  priority: 1,
  repo: 'vitest-dev/vitest',
  title : 'Popular dependants of **Vitest** list',
  stars: 2
}

const cucumber = {
  priority: 1,
  repo: 'cucumber/cucumber-js',
  scrapeDeep: true,
  title : 'Popular dependants of **Cucumber.js** list',
  stars: 2
}

const kefir = {
  priority: 2,
  repo: 'kefirjs/kefir',
  scrapeDeep: true,
  title : 'Popular dependants of **Kefir** list',
  stars: 2
}

const iterator = (x, prop) => {
  return {
    ...x,
    daysLimit: x.daysLimit ? x.daysLimit : 370,
    isHuge: x.isHuge ? x.isHuge : true,
    scrapeDeep: x.scrapeDeep ? x.scrapeDeep : false,
    showProgress: SHOW_PROGRESS,
    maxScrapeDepth: MAX_SCRAPE_DEPTH,
    isDev: IS_DEV,
    starsLimit: x.stars ? x.stars : 5,
    shouldRefreshApi,
    shouldRefreshScraped,
    outputLocation: `${BASE}/stars-of-${prop}.md`
  }
}

const allModes = map(
  iterator,
  {rambda, playwright, puppeteer, ramda, nest, angular, swc, vitest, cucumber, kefir}
)

exports.allModes = allModes
