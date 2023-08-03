import { CheckCircle2 } from 'lucide-react'

import { HeaderLayout } from '@/components/layouts/header-layout'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function CourseGenerating() {
  return (
    <HeaderLayout>
      <div className="flex-1 flex items-center justify-center">
        <Card className="text-center border-none shadow-none">
          <CardHeader className="space-y-5">
            <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />

            <CardTitle>Just one sec...</CardTitle>

            <CardDescription className="text-lg max-w-[350px]">
              <p>
                Your course is generating. You&apos;ll will receive an email once
                it&apos;s ready.
              </p>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </HeaderLayout>
  )
}
