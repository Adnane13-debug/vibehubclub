// member routes — token + membre role required

import express from 'express'
import * as ctrl from '../controllers/member.controller.js'
import verifyToken from '../middleware/auth.js'
import checkRole from '../middleware/roles.js'

const router = express.Router()

// shortcut — every member route needs these 2
const member = [verifyToken, checkRole('membre')]
const memberOrVisiteur = [verifyToken, checkRole('membre', 'visiteur')]

// dashboard
router.get('/dashboard',                    member, ctrl.getDashboard)

// profile
router.get('/profile',                      member, ctrl.getProfile)
router.put('/profile',                      member, ctrl.updateProfile)

// events
router.get('/events',                       memberOrVisiteur, ctrl.getEvents)
router.post('/events/:eventId/join',        memberOrVisiteur, ctrl.joinEvent)
router.delete('/events/:eventId/cancel',    memberOrVisiteur, ctrl.cancelEvent)

// notifications
router.get('/notifications',                member, ctrl.getNotifications)
router.patch('/notifications/:id/read',     member, ctrl.markAsRead)

// mbti results
router.post('/mbti/results',                member, ctrl.saveMbtiResult)
router.get('/mbti/results',                 member, ctrl.getMbtiResult)

export default router