import { assertString } from '@/lib/assert'
import { z } from 'zod'
/**
 * Extracts the page name from a Wikipedia URL.
 * @param url The URL of the Wikipedia page.
 * @returns The name of the Wikipedia page.
 */
export function getPageNameFromWikipediaUrl(url: string) {
  const match = url.match(/\/wiki\/(.*)$/)

  if (!match || !match[1]) {
    throw new Error(`Invalid Wikipedia URL: ${url}`)
  }

  return match[1]
}

/**
 * Retrieves the image URL and description for a given Wikipedia page name. Test the image URL to make sure it is valid.
 * @param pageName The name of the Wikipedia page.
 * @param size The desired size of the image (default is 500).
 * @returns A promise that resolves to a WikipediaImage object containing the image URL and description, or null if no image is available.
 */
export async function getBestImageForWikipediaUrls(
  urls: string[],
): Promise<WikipediaImage | null> {
  for (const url of urls) {
    try {
      const page = getPageNameFromWikipediaUrl(url)
      const image = await getImageForPage(page)

      if (image) {
        const test = await fetch(image.source)

        if (test.ok) {
          return image
        }
      }
    } catch (error: any) {
      console.error(`Failed to fetch image for ${url}: ${error.message}`)
    }
  }

  return null
}

/**
 * Retrieves the image for a given Wikipedia page.
 * @param pageName The name of the Wikipedia page.
 * @param size The desired size of the image (default is 500).
 * @returns A promise that resolves to a WikipediaImage object if an image is found, or null if no image is available.
 */

export async function getImageForPage(
  pageName: string,
  size = 500,
): Promise<WikipediaImage | null> {
  // First we make a request to the Wikipedia API to get the image URL for the page
  const url = getUrlForPageImageQuery(pageName, size)
  const result = await makeRequest(url)

  const page = result.query.pages[0]

  if (!page?.original) {
    return null
  }

  const imageFileName = page.original.source.split('/').pop()
  assertString(imageFileName, 'Invalid image file name')

  const unescapedImageFileName = decodeURIComponent(imageFileName)

  // Next we make a request to the Wikipedia API to get the image description
  const description =
    (await getFileDescription(unescapedImageFileName)) ||
    page.terms?.description?.[0] ||
    null

  return { source: page.original.source, description }
}

async function getFileDescription(fileName: string) {
  // Next we make a request to the Wikipedia API to get the image description
  const url = getUrlForImageInfoQuery(fileName)
  const result = await makeRequest(url)

  const imageInfo = result.query.pages[0]?.imageinfo?.[0].extmetadata
  const description =
    imageInfo?.ImageDescription?.value || imageInfo?.ObjectName?.value || null

  return description
}

// API request to fetch the image from Wikipedia

async function makeRequest(url: string) {
  const response = await fetch(url, { headers: { 'User-Agent': '101.school' } })

  if (!response.ok) {
    throw new Error(`Failed to fetch Wikipedia image: ${response.statusText}`)
  }

  const json = await response.json()
  const result = QueryResult.parse(json)

  return result
}

// Helper function to generate the URL for the Wikipedia API

function getWikipediaApiUrl(params: Record<string, string>) {
  const url = new URL('https://en.wikipedia.org/w/api.php')
  url.searchParams.set('format', 'json')
  url.searchParams.set('formatversion', '2')

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }

  return url.toString()
}

function getUrlForPageImageQuery(pageName: string, size = 500) {
  return getWikipediaApiUrl({
    action: 'query',
    titles: pageName,
    prop: 'pageimages|pageterms',
    piprop: 'original|name',
    pilicense: 'any',
    pithumbsize: size.toString(),
  })
}

function getUrlForImageInfoQuery(imageFileName: string) {
  return getWikipediaApiUrl({
    action: 'query',
    titles: `File:${imageFileName}`,
    prop: 'imageinfo',
    iiprop: 'extmetadata',
  })
}

// Types

interface WikipediaImage {
  source: string
  description: string | null
}

const QueryResult = z.object({
  query: z.object({
    pages: z.array(
      z.object({
        title: z.string(),
        original: z.optional(
          z.object({
            source: z.string(),
            width: z.number(),
            height: z.number(),
          }),
        ),
        terms: z.optional(
          z.object({
            label: z.array(z.string()),
            description: z.array(z.string()),
          }),
        ),
        imageinfo: z.optional(
          z.array(
            z.object({
              extmetadata: z.object({
                ImageDescription: z.optional(
                  z.object({
                    source: z.string(),
                    value: z.string(),
                  }),
                ),
                ObjectName: z.optional(
                  z.object({
                    source: z.string(),
                    value: z.string(),
                  }),
                ),
              }),
            }),
          ),
        ),
      }),
    ),
  }),
})
