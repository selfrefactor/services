interface Input {
  repo: string
  isDev?: boolean
  scrapeLibraries?: boolean
  showProgress?: boolean
  pageLimit?: number
}

export function sortUsedBy(
  input: Input
): Promise<Array<{stars: number; repo: string}>>
