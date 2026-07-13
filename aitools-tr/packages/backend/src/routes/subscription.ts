import { Router } from 'express'
import { z } from 'zod'
import { createCheckoutSession } from '../services/stripeService'
import { authenticate, AuthRequest } from '../middleware/auth'
import { prisma } from '../lib/prisma'

const router = Router()

router.get('/current', authenticate, async (req: AuthRequest, res) => {
  const subscription = await prisma.subscription.findUnique({
    where: { userId: req.userId! },
    select: { plan: true, status: true, currentPeriodEnd: true }
  })
  res.json(subscription)
})

const checkoutSchema = z.object({
  plan: z.enum(['pro', 'business']),
  interval: z.enum(['month', 'year'])
})

router.post('/checkout', authenticate, async (req: AuthRequest, res) => {
  const body = checkoutSchema.parse(req.body)
  const result = await createCheckoutSession(req.userId!, body.plan, body.interval)
  res.json(result)
})

export default router
