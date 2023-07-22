export async function fetchThumbnailForPage(
  pageName: string,
  size = 500,
): Promise<string | null> {
  const url = getUrlForPageImageQuery(pageName, size)
  const res = await fetch(url, { headers: { 'User-Agent': '101.school' } })

  if (!res.ok) {
    return null
  }

  const json = await (res.json() as Promise<QueryResult>)
  const page = Object.values(json.query.pages)[0]

  if (!page.thumbnail) {
    return null
  }

  return page.thumbnail.source
}

function getUrlForPageImageQuery(pageName: string, size = 500) {
  const url = new URL('https://en.wikipedia.org/w/api.php')
  url.searchParams.set('action', 'query')
  url.searchParams.set('titles', pageName)
  url.searchParams.set('prop', 'pageimages')
  url.searchParams.set('format', 'json')
  url.searchParams.set('pithumbsize', size.toString())
  return url.toString()
}

interface QueryResult {
  batchcomplete: string
  query: {
    normalized: {
      from: string
      to: string
    }[]
    pages: {
      [key: string]: {
        pageid: number
        ns: number
        title: string
        thumbnail?: {
          source: string
          width: number
          height: number
        }
        pageimage?: string
      }
    }
  }
}
