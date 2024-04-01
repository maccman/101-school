import { parseCourseCip } from './parse-course-cip'

describe('parseCourseCip', () => {
  it('returns the expected cip code and title for a valid course description', async () => {
    const description =
      'This course covers the fundamentals of computer science, including programming concepts, data structures, and algorithms.'
    const result = await parseCourseCip(description)

    expect(result).toMatchInlineSnapshot(`
      {
        "cipCode": "11.0701",
        "cipTitle": "Computer Science",
      }
    `)
  })
})
