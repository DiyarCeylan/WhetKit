import { Router } from 'express'
import { z } from 'zod'
import { generateText } from '../services/aiService'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = Router()

const textGeneratorSchema = z.object({
  prompt: z.string().min(1, 'Prompt boş olamaz').max(5000, 'Prompt çok uzun'),
  systemPrompt: z.string().optional(),
  maxTokens: z.number().min(1).max(4000).optional()
})

router.post('/text-generator', authenticate, async (req: AuthRequest, res) => {
  const body = textGeneratorSchema.parse(req.body)
  const result = await generateText({
    userId: req.userId!,
    prompt: body.prompt,
    systemPrompt: body.systemPrompt,
    maxTokens: body.maxTokens
  })
  res.json(result)
})

export default router
