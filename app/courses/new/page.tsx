import { HeaderLayout } from '@/components/layouts/header-layout'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { authOrRedirect } from '@/server/helpers/auth'

import { NewCourseManager } from './components/new-course-manager'
import { UserManual } from './components/user-manual'

export default async function NewCoursePage() {
  await authOrRedirect()

  return (
    <HeaderLayout>
      <div className="p-10 flex flex-col items-center flex-1 overflow-auto">
        <Card className="w-full max-w-2xl relative">
          <UserManual className="lg:absolute lg:left-[104%] lg:mb-7 lg:w-full lg:max-w-sm border-none lg:border" />

          <CardHeader>
            <CardTitle>Create a new course</CardTitle>
            <CardDescription>
              Describe your course and AI will do the rest.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NewCourseManager />
          </CardContent>
        </Card>
      </div>
    </HeaderLayout>
  )
}
