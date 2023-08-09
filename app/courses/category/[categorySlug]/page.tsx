import { CoursesLayout } from '../../components/courses-layout'

export default async function CoursesCategoryPage({
  params,
}: {
  params: { categorySlug: string }
}) {
  return <CoursesLayout categorySlug={params.categorySlug} />
}
