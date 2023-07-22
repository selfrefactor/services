const { map } = require('rambdax')
const { resolve } = require('path')
const BASE = resolve(__dirname, '../../../../popular-dependents-lists')

const shouldRefreshScraped = true
const shouldRefreshApi = true
// to see it without headless
const IS_DEV = 0
const SHOW_PROGRESS = 1
const MAX_SCRAPE_DEPTH = 600

const esbuild = {
  priority  : 2,
  daysLimit : 150,
  repo      : 'evanw/esbuild',
  title     : 'Popular dependents of **ESBuild**',
  stars     : 5,
}
// Bad abstraction
// playwright after microsoft must be equal to const playwright
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

const rambda = {
  priority : 1,
  repo     : 'selfrefactor/rambda',
  title    : 'Popular dependents of **Rambda**',
  stars    : 2,
}

const rambdax = {
  priority : 1,
  repo     : 'selfrefactor/rambdax',
  title    : 'Popular dependents of **Rambdax**',
  stars    : 2,
}

const ramda = {
  priority : 1,
  repo     : 'ramda/ramda',
  title    : 'Popular dependents of **Ramda**',
  stars    : 2,
}

const cucumberjs = {
  priority : 1,
  repo     : 'cucumber/cucumber-js',
  title    : 'Popular dependents of **Cucumber.js**',
  stars    : 2,
}

const rough = {
  priority : 1,
  repo     : 'rough-stuff/rough',
  title    : 'Popular dependents of **Rough**',
  stars    : 2,
}
const fpts = {
  priority : 1,
  repo     : 'gcanti/fp-ts',
  title    :
    'Popular dependents of **FP TS** - library for functional programming with TS support',
  stars : 2,
}
const nextjs = {
  priority : 1,
  repo     : 'vercel/next.js',
  title    : 'Popular dependents of **NextJS**',
  stars    : 12,
}
const qwik = {
  priority : 1,
  repo     : 'BuilderIO/qwik',
  title    : 'Popular dependents of **NextJS**',
  stars    : 5,
}
const solid = {
  priority : 1,
  repo     : 'solidjs/solid',
  title    : 'Popular dependents of **NextJS**',
  stars    : 5,
}


const iterator = (x, prop) => ({
  ...x,
  daysLimit      : x.daysLimit ? x.daysLimit : 370,
  isHuge         : !x.smallScrape,
  scrapeDeep     : !x.smallScrape,
  showProgress   : SHOW_PROGRESS,
  maxScrapeDepth : MAX_SCRAPE_DEPTH,
  isDev          : IS_DEV,
  starsLimit     : x.stars ? x.stars : 5,
  shouldRefreshApi,
  shouldRefreshScraped,
  outputLocation : `${ BASE }/dependents-of-${ prop }.md`,
})

const allModes = map(iterator, {
  cucumberjs,
  fpts,
  nest,
  nextjs,
  esbuild,
  playwright,
  puppeteer,
  rambda,
  rambdax,
  ramda,
  rough,
  solid,
  qwik
})

exports.allModes = allModes
