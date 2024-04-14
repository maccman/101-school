import { XCircle } from 'lucide-react'

import { HeaderLayout } from '@/components/layouts/header-layout'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TryAgainButton } from './components/try-again-button'

export default function PaymentsFailure() {
  return (
    <HeaderLayout>
      <div className="flex-1 flex items-center justify-center">
        <Card className="text-center border-none shadow-none">
          <CardHeader className="space-y-5">
            <XCircle className="mx-auto h-12 w-12 text-destructive" />

            <CardTitle>Payment failure</CardTitle>

            <CardDescription className="text-lg max-w-[350px]">
              <p>Payment failed.</p>

              <TryAgainButton />
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </HeaderLayout>
  )
}
