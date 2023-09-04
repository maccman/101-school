import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import { assertString } from '@/lib/assert'
import { withAuth } from '@/server/helpers/auth'
import { stripe } from '@/server/payments/stripe'

const priceId = process.env.STRIPE_PRICE_ID

async function createCheckoutSession(
  request: Request,
  { userId, params }: { userId: string; params: { courseId: string } },
) {
  const { courseId } = params

  const origin = request.headers.get('origin')

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: 'payment',
    client_reference_id: userId,
    metadata: {
      courseId,
    },
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${origin}/payments/success?courseId=${courseId}`,
    cancel_url: `${origin}/payments/failure?courseId=${courseId}`,
  }

  console.log('[stripe] Creating session', { sessionParams })

  const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
    sessionParams,
  )

  assertString(checkoutSession.url)

  console.log('[stripe] Created session', { checkoutSession })
  console.log('[stripe] Redirecting to checkout session', { url: checkoutSession.url })

  return NextResponse.json({ checkoutUrl: checkoutSession.url })
}

export const POST = withAuth(createCheckoutSession)
