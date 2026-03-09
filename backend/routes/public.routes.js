// public routes — no token needed
// anyone can access these

import express from 'express'
import * as ctrl from '../controllers/public.controller.js'

const router = express.Router()

router.get('/events',          ctrl.getEvents)
router.get('/events/:id',      ctrl.getEventDetail)
router.get('/announcements',   ctrl.getAnnouncements)
router.post('/contact',        ctrl.sendContact)

export default router