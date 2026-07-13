import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_'),
  OPENAI_API_KEY: z.string().startsWith('sk-'),
  FRONTEND_URL: z.string().url(),
  BACKEND_URL: z.string().url(),
  PORT: z.coerce.number().default(3001)
})

export const env = envSchema.parse(process.env)
