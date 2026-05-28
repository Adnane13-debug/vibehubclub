// this file defines the auth URLs

import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import '../config/passport.js'
import * as ctrl from '../controllers/auth.controller.js'
import verifyToken from '../middleware/auth.js'

const router = express.Router()

// Step 1: redirect to Google
router.get('/google', (req, res, next) => {
  const mode = req.query.mode || 'login'
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    state: mode,
    session: false,
  })(req, res, next)
})

// Step 2: Google redirects back here
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: process.env.FRONTEND_URL + '/login' }),
  (req, res) => {
    const user = req.user
    const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173'
    const state = req.query.state || 'login'

    // APPLY MODE — don't create session, redirect with prefill params
    if (user._applyMode || state === 'apply') {
      const params = new URLSearchParams({
        nom: user.nom || '',
        prenom: user.prenom || '',
        email: user.email || '',
        google: '1',
      })
      return res.redirect(`${frontendURL}/apply?${params.toString()}`)
    }

    // LOGIN MODE — generate JWT and redirect based on role
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    if (user.role === 'admin') {
      return res.redirect(`${frontendURL}/admin?token=${token}`)
    } else if (user.role === 'membre') {
      return res.redirect(`${frontendURL}/profile?token=${token}`)
    } else {
      return res.redirect(`${frontendURL}/visitor?token=${token}`)
    }
  }
)

// public routes — no token needed
// NOTE: /register removed — public sign-up is disabled.
// New users apply via POST /api/public/apply, admin approves, account is created automatically.
router.post('/login', ctrl.login)

// protected routes — token required
router.get('/me', verifyToken, ctrl.getMe)
router.post('/logout', verifyToken, ctrl.logout)

export default router
