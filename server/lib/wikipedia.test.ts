import { describe, it, expect } from 'vitest'
import { getImageForPage, getPageNameFromWikipediaUrl } from './wikipedia'

describe('getImageForPage', () => {
  it('should retrieve the image and description for a valid Wikipedia page', async () => {
    const pageName = 'Eiffel_Tower'
    const image = await getImageForPage(pageName)

    expect(image).not.toBeNull()
    expect(image?.source).toMatchInlineSnapshot(
      `"https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg"`,
    )
    expect(image?.description).toMatchInlineSnapshot(
      `"Cropped to 1.66 ratio from the original."`,
    )
  })

  it('should return null for a Wikipedia page without an image', async () => {
    const pageName = 'List_of_minor_planets:_100001–101000'
    const image = await getImageForPage(pageName)

    expect(image).toBeNull()
  })

  it('should return null for a non-existent Wikipedia page', async () => {
    const pageName = 'NonExistentPage'

    const image = await getImageForPage(pageName)

    expect(image).toBeNull()
  })
})

describe('getPageNameFromWikipediaUrl', () => {
  it('should extract the page name from a valid Wikipedia URL', () => {
    const url = 'https://en.wikipedia.org/wiki/Eiffel_Tower'
    const pageName = getPageNameFromWikipediaUrl(url)
    expect(pageName).toBe('Eiffel_Tower')
  })

  it('should extract the page name with special characters from a valid Wikipedia URL', () => {
    const url = 'https://en.wikipedia.org/wiki/Eiffel_Tower_(Paris)'
    const pageName = getPageNameFromWikipediaUrl(url)
    expect(pageName).toBe('Eiffel_Tower_(Paris)')
  })

  it('should throw an error for an invalid Wikipedia URL', () => {
    const url = 'https://example.com/not-a-wikipedia-url'
    expect(() => getPageNameFromWikipediaUrl(url)).toThrowError(
      'Invalid Wikipedia URL: https://example.com/not-a-wikipedia-url',
    )
  })

  it('should throw an error for a Wikipedia URL without a page name', () => {
    const url = 'https://en.wikipedia.org/wiki/'
    expect(() => getPageNameFromWikipediaUrl(url)).toThrowError(
      'Invalid Wikipedia URL: https://en.wikipedia.org/wiki/',
    )
  })
})
