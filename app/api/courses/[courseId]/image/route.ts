import { getFirstCourseUnit } from '@/server/db/courses/getters'

export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  const courseUnit = await getFirstCourseUnit(params.courseId)

  if (!courseUnit?.unitImage) {
    return {
      status: 404,
      body: {
        message: 'Image not found',
      },
    }
  }

  // Return image
  return fetch(courseUnit.unitImage.source)
}
