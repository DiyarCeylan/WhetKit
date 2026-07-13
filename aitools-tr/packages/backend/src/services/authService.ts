import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma'
import { env } from '../config/env'
import { AppError } from '../middleware/errorHandler'

interface TokenPayload {
  userId: string
  email: string
}

export async function register(email: string, password: string, name: string) {
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    throw new AppError(409, 'EMAIL_EXISTS', 'Bu e-posta adresi zaten kayıtlı')
  }

  const passwordHash = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
      subscription: { create: { plan: 'free', status: 'active' } },
      credits: { create: { dailyRemaining: 10 } }
    }
  })

  const tokens = generateTokens({ userId: user.id, email: user.email })
  return { user: { id: user.id, email: user.email, name: user.name }, ...tokens }
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    throw new AppError(401, 'INVALID_CREDENTIALS', 'E-posta veya şifre hatalı')
  }

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) {
    throw new AppError(401, 'INVALID_CREDENTIALS', 'E-posta veya şifre hatalı')
  }

  const tokens = generateTokens({ userId: user.id, email: user.email })
  return { user: { id: user.id, email: user.email, name: user.name }, ...tokens }
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload
}

export function verifyRefreshToken(token: string): TokenPayload {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload
}

export function generateTokens(payload: TokenPayload) {
  const accessToken = jwt.sign(payload, env.JWT_SECRET, { expiresIn: '15m' })
  const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: '7d' })
  return { accessToken, refreshToken }
}
