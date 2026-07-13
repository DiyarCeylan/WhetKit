import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { env } from './config/env'
import { errorHandler } from './middleware/errorHandler'
import { apiLimiter } from './middleware/rateLimiter'
import authRoutes from './routes/auth'
import toolsRoutes from './routes/tools'
import subscriptionRoutes from './routes/subscription'

const app = express()

app.use(helmet())
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }))

app.post('/api/subscription/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']!
  try {
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(env.STRIPE_SECRET_KEY)
    const event = stripe.webhooks.constructEvent(req.body, sig, env.STRIPE_WEBHOOK_SECRET)
    const { handleWebhook } = await import('./services/stripeService')
    await handleWebhook(event)
    res.json({ received: true })
  } catch (err) {
    res.status(400).json({ error: 'Webhook signature verification failed' })
  }
})

app.use(express.json())
app.use('/api', apiLimiter)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/auth', authRoutes)
app.use('/api/tools', toolsRoutes)
app.use('/api/subscription', subscriptionRoutes)

app.use(errorHandler)

export { app }
