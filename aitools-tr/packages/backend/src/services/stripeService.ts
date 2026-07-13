import Stripe from 'stripe'
import { prisma } from '../lib/prisma'
import { env } from '../config/env'

const stripe = new Stripe(env.STRIPE_SECRET_KEY)

export async function createCheckoutSession(userId: string, plan: 'pro' | 'business', interval: 'month' | 'year') {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new Error('User not found')

  const priceId = getPriceId(plan, interval)

  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: `${env.FRONTEND_URL}/dashboard/abonelik?success=true`,
    cancel_url: `${env.FRONTEND_URL}/fiyatlandirma?canceled=true`,
    metadata: { userId, plan }
  })

  return { sessionId: session.id, url: session.url }
}

export async function handleWebhook(event: Stripe.Event) {
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.userId
    const plan = session.metadata?.plan as string

    if (userId && plan) {
      const subscription = await stripe.subscriptions.retrieve(session.subscription as string, {
        expand: ['items']
      })
      const item = subscription.items.data[0]

      await prisma.subscription.upsert({
        where: { userId },
        create: {
          userId,
          plan,
          status: 'active',
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          currentPeriodStart: new Date(item.current_period_start * 1000),
          currentPeriodEnd: new Date(item.current_period_end * 1000)
        },
        update: {
          plan,
          status: 'active',
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          currentPeriodStart: new Date(item.current_period_start * 1000),
          currentPeriodEnd: new Date(item.current_period_end * 1000)
        }
      })

      if (plan !== 'free') {
        await prisma.credits.update({
          where: { userId },
          data: { dailyRemaining: 999999 }
        })
      }
    }
  }

  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as Stripe.Subscription
    const expanded = await stripe.subscriptions.retrieve(subscription.id, {
      expand: ['items']
    })
    const item = expanded.items.data[0]
    await prisma.subscription.updateMany({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        status: subscription.status === 'active' ? 'active' : 'expired',
        currentPeriodEnd: new Date(item.current_period_end * 1000)
      }
    })
  }
}

function getPriceId(plan: string, interval: string): string {
  const key = `STRIPE_PRICE_${plan.toUpperCase()}_${interval === 'month' ? 'MONTHLY' : 'YEARLY'}`
  const value = process.env[key]
  if (!value) throw new Error(`Missing environment variable: ${key}`)
  return value
}
