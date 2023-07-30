import { HeaderLayout } from '@/components/layouts/header-layout'
import { authOrRedirect } from '@/server/helpers/auth'

export default function NewCoursePage() {
  const userId = authOrRedirect()
  console.log({ userId })

  return (
    <HeaderLayout>
      <div className="p-10">
        <h1>New Course Page</h1>
        <p>To create a new course email alex@alexmaccaw.com</p>
      </div>
    </HeaderLayout>
  )
}
