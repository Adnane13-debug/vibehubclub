// this file defines the auth URLs

import express      from 'express'
import * as ctrl    from '../controllers/auth.controller.js'
import verifyToken  from '../middleware/auth.js'

const router = express.Router()

// public routes — no token needed
// NOTE: /register removed — public sign-up is disabled.
// New users apply via POST /api/public/apply, admin approves, account is created automatically.
router.post('/login',    ctrl.login)

// protected routes — token required
router.get ('/me',     verifyToken, ctrl.getMe)
router.post('/logout', verifyToken, ctrl.logout)

export default router