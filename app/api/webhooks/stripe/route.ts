import { NextResponse } from 'next/server'

import { assert, assertString } from '@/lib/assert'
import { updateCourse } from '@/server/db/courses/setters'
import { error } from '@/server/helpers/error'
import { inngest } from '@/server/jobs/client'
import { stripe } from '@/server/payments/stripe'

import type { Stripe } from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: Request) {
  let event: Stripe.Event

  assertString(webhookSecret)

  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return error('missing signature')
  }

  const payload = await (await request.blob()).text()

  try {
    event = await stripe.webhooks.constructEventAsync(payload, signature, webhookSecret)
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error(err)
    console.error(`[stripe-webhook] Error message: ${errorMessage}`)

    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 },
    )
  }

  // Successfully constructed event.
  console.log('[stripe-webhook] Success:', event.id)

  await handleEvent(event)

  return NextResponse.json({ message: 'Received' }, { status: 200 })
}

const eventHandlers: Record<string, (event: Stripe.Event) => Promise<void>> = {
  'checkout.session.completed': handleCheckoutSessionCompleted,
  'payment_intent.succeeded': handlePaymentIntentSucceeded,
  'payment_intent.payment_failed': handlePaymentIntentPaymentFailed,
}

function handleEvent(event: Stripe.Event) {
  const handler = eventHandlers[event.type]

  if (!handler) {
    throw new Error(`No event handler for ${event.type}`)
  }

  return handler(event)
}

async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session

  console.log(`💰 CheckoutSession status: ${session.payment_status}`)
}

async function handlePaymentIntentSucceeded(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent

  console.log(`💰 PaymentIntent status: ${paymentIntent.status}`)

  assert(
    paymentIntent.status === 'succeeded',
    `PaymentIntent not succeeded: ${paymentIntent.status}`,
  )

  // Get client reference ID from PaymentIntent metadata
  const courseId = paymentIntent.metadata.courseId
  assertString(courseId, 'Missing courseId')

  await updateCourse(courseId, { stripePaymentIntentId: paymentIntent.id })

  await inngest.send({
    id: `course-generate-${courseId}`,
    name: 'course/generate',
    data: {
      courseId,
    },
  })
}

async function handlePaymentIntentPaymentFailed(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent

  console.log(`❌ Payment failed: ${paymentIntent.last_payment_error?.message}`)
}
