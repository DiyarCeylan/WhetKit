import { Router } from 'express'
import { z } from 'zod'
import { register, login } from '../services/authService'
import { authLimiter } from '../middleware/rateLimiter'

const router = Router()

const registerSchema = z.object({
  email: z.string().email('Geçerli bir e-posta girin'),
  password: z.string().min(8, 'Şifre en az 8 karakter olmalı'),
  name: z.string().min(2, 'İsim en az 2 karakter olmalı')
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

router.post('/register', authLimiter, async (req, res) => {
  const body = registerSchema.parse(req.body)
  const result = await register(body.email, body.password, body.name)
  res.status(201).json(result)
})

router.post('/login', authLimiter, async (req, res) => {
  const body = loginSchema.parse(req.body)
  const result = await login(body.email, body.password)
  res.json(result)
})

export default router
