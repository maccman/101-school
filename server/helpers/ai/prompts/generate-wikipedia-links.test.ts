import { generateWikipediaUrls } from './generate-wikipedia-links'

describe('generateWikipediaUrls', () => {
  it(
    'returns relevant Wikipedia URLs for a given text body',
    async () => {
      const body = 'The Eiffel Tower is a famous landmark in Paris, France.'
      const urls = await generateWikipediaUrls(body)

      expect(urls).toContain('https://en.wikipedia.org/wiki/Eiffel_Tower')
      expect(urls).toContain('https://en.wikipedia.org/wiki/Paris')
      expect(urls.length).toBeLessThanOrEqual(5)
    },
    { timeout: 20000 },
  )
})
