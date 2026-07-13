import OpenAI from 'openai'
import { prisma } from '../lib/prisma'
import { AppError } from '../middleware/errorHandler'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

interface GenerateTextParams {
  userId: string
  prompt: string
  systemPrompt?: string
  maxTokens?: number
}

export async function generateText({
  userId,
  prompt,
  systemPrompt = 'Sen yardımcı bir yapay zeka asistanısın. Türkçe yanıt ver.',
  maxTokens = 1000
}: GenerateTextParams) {
  await checkAndDeductCredits(userId)

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ],
    max_tokens: maxTokens
  })

  const tokensUsed = response.usage?.total_tokens ?? 0

  await prisma.usageLog.create({
    data: { userId, toolName: 'text-generator', tokensUsed }
  })

  return {
    content: response.choices[0].message.content,
    tokensUsed,
    model: response.model
  }
}

async function checkAndDeductCredits(userId: string) {
  const subscription = await prisma.subscription.findUnique({
    where: { userId }
  })

  if (subscription?.plan !== 'free') return

  const credits = await prisma.credits.findUnique({ where: { userId } })
  if (!credits) throw new AppError(500, 'CREDITS_ERROR', 'Kredi bilgisi bulunamadı')

  const now = new Date()
  const lastReset = new Date(credits.lastReset)
  const hoursSinceReset = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60)

  if (hoursSinceReset >= 24) {
    await prisma.credits.update({
      where: { userId },
      data: { dailyRemaining: 10, lastReset: now }
    })
    return
  }

  if (credits.dailyRemaining <= 0) {
    throw new AppError(429, 'CREDITS_EXHAUSTED', 'Günlük hakkınız dolmuş. Pro plana yükseltin.')
  }

  await prisma.credits.update({
    where: { userId },
    data: { dailyRemaining: { decrement: 1 } }
  })
}
