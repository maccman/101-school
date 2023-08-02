import { HeaderLayout } from '@/components/layouts/header-layout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function CourseGenerating() {
  return (
    <HeaderLayout>
      <div className="flex-1 flex items-center justify-center">
        <Card className="text-center">
          <CardHeader className="space-y-5">
            <CardTitle>Just one sec</CardTitle>
            <CardDescription className="text-lg">
              <p>Your course is generating...</p>
              <p>You will receive an email once it&apos;s ready.</p>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </HeaderLayout>
  )
}
