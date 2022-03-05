import { Browser, Page, BrowserContext } from 'playwright'

export type WaitConditionType = 'load' | 'domcontentloaded' | 'networkidle'
export type SupportedBrowsers = 'chromium' | 'firefox'

interface SlowNetwork{
  offline: boolean
  downloadThroughput: number  
  uploadThroughput: number
  latency: number 
}

export interface InputPlaywright{
  extraProps?: object
  resolution?: Resolution
  url?: string
  mobile?: boolean
  slowNetwork?: SlowNetwork | true
  browser?: SupportedBrowsers
  headless?: boolean
  fullScreen?: boolean
  blockAds?: boolean
  waitCondition?: WaitConditionType | WaitCondition 
  logFlag?: boolean
  logAllFlag?: boolean
  logMethod?: (input: object) => void
}

interface OutputPlaywright{
  page: Page
  browser: Browser
  context: BrowserContext
}

interface Resolution {
  x: number
  y: number
}

interface PlaywrightSettings{
  args: Array<string>
  pipe?: boolean
  handleSIGINT?: boolean
  ignoreHTTPSErrors?: boolean
  handleSIGTERM?: boolean
  handleSIGHUP?: boolean
  headless: boolean
}

export function playwrightInit(input: InputPlaywright): Promise<OutputPlaywright>
