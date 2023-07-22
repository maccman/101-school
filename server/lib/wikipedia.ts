export async function fetchImageForWikpediaUrl(url: string) {
  const pageName = getPageNameFromWikipediaUrl(url)
  return fetchImageForWikipediaPage(pageName)
}

function getPageNameFromWikipediaUrl(url: string) {
  const match = url.match(/\/wiki\/(.*)$/)

  if (!match) {
    throw new Error(`Invalid Wikipedia URL: ${url}`)
  }

  return match[1]
}

interface Image {
  source: string
  description: string | null
}

async function fetchImageForWikipediaPage(
  pageName: string,
  size = 500,
): Promise<Image | null> {
  const url = getUrlForPageImageQuery(pageName, size)
  const res = await fetch(url, { headers: { 'User-Agent': '101.school' } })

  if (!res.ok) {
    return null
  }

  const json = (await res.json()) as QueryResult
  const page = Object.values(json.query.pages)[0]

  if (!page) {
    return null
  }

  if (!page.original) {
    return null
  }

  return {
    source: page.original.source,
    description: page.terms?.description?.[0] ?? null,
  }
}

function getUrlForPageImageQuery(pageName: string, size = 500) {
  const url = new URL('https://en.wikipedia.org/w/api.php')
  url.searchParams.set('action', 'query')
  url.searchParams.set('titles', pageName)
  url.searchParams.set('prop', 'pageimages|pageterms')
  url.searchParams.set('piprop', 'original')
  url.searchParams.set('pilicense', 'any')
  url.searchParams.set('format', 'json')
  url.searchParams.set('pithumbsize', size.toString())
  return url.toString()
}

interface QueryResult {
  batchcomplete: string
  query: {
    pages: {
      pageid: number
      ns: number
      title: string
      original?: {
        source: string
        width: number
        height: number
      }
      terms?: {
        label: string[]
        description: string[]
      }
    }[]
  }
}
