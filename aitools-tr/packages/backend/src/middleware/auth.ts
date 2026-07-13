import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../services/authService'
import { AppError } from './errorHandler'

export interface AuthRequest extends Request {
  userId?: string
  email?: string
}

export function authenticate(req: AuthRequest, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    throw new AppError(401, 'UNAUTHORIZED', 'Token bulunamadı')
  }

  try {
    const payload = verifyAccessToken(authHeader.slice(7))
    req.userId = payload.userId
    req.email = payload.email
    next()
  } catch {
    throw new AppError(401, 'TOKEN_EXPIRED', 'Token süresi dolmuş')
  }
}
