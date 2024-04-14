'use client'

import { XCircle } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { HeaderLayout } from '@/components/layouts/header-layout'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function PaymentsFailure() {
  const searchParams = useSearchParams()
  const courseId = searchParams?.get('courseId')

  return (
    <HeaderLayout>
      <div className="flex-1 flex items-center justify-center">
        <Card className="text-center border-none shadow-none">
          <CardHeader className="space-y-5">
            <XCircle className="mx-auto h-12 w-12 text-destructive" />

            <CardTitle>Payment failure</CardTitle>

            <CardDescription className="text-lg max-w-[350px]">
              <p>Payment failed.</p>

              {courseId && (
                <Link
                  href={`/api/courses/${courseId}/checkout`}
                  className={cn(buttonVariants({ variant: 'outline' }))}
                >
                  Try again...
                </Link>
              )}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </HeaderLayout>
  )
}
