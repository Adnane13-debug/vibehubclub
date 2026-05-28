// this is the main file that starts the server

import express      from 'express'
import cors         from 'cors'
import helmet       from 'helmet'           // FIX: security headers
import rateLimit    from 'express-rate-limit' // FIX: brute-force protection
import dotenv       from 'dotenv'
import passport     from 'passport'
import './config/passport.js'
import authRoutes   from './routes/auth.routes.js'
import publicRoutes from './routes/public.routes.js'
import adminRoutes  from './routes/admin.routes.js'
import memberRoutes from './routes/member.routes.js'

dotenv.config()

const app = express()

app.use(passport.initialize())

// FIX 1: helmet adds ~12 security headers automatically (clickjacking, sniffing, etc.)
app.use(helmet())

// FIX 2: CORS — only allow your real frontend domain
// Change the origin below to your actual frontend URL
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))

// FIX 3: limit request body to 10kb — prevents memory abuse
app.use(express.json({ limit: '10kb' }))

// FIX 4: rate limit on login — max 10 attempts per 15 minutes per IP
const loginLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many login attempts, please try again in 15 minutes' }
})
app.use('/api/auth/login', loginLimit)

// test route
app.get('/', (req, res) => {
  res.json({ message: 'Vibe Hub API works ✅' })
})

// auth routes
app.use('/api/auth', authRoutes)

// public routes
app.use('/api/public', publicRoutes)

// admin routes
app.use('/api/admin', adminRoutes)

// member routes
app.use('/api/member', memberRoutes)

// Export app so tests can import it without starting the server
export default app
 
// Only start listening when run directly — not during tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} ✅`)
  })
}