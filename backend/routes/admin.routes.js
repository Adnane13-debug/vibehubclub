// admin routes — token + admin role required

import express from 'express'
import * as ctrl from '../controllers/admin.controller.js'
import verifyToken from '../middleware/auth.js'
import checkRole from '../middleware/roles.js'

const router = express.Router()

// shortcut — every admin route needs these 2
const admin = [verifyToken, checkRole('admin')]

// dashboard
router.get('/dashboard/stats',                admin, ctrl.getStats)

// members
router.get('/members',                        admin, ctrl.getMembers)
router.get('/members/:id',                    admin, ctrl.getMember)
router.patch('/members/:id/status',           admin, ctrl.updateMemberStatus)

// events
router.get('/events',                         admin, ctrl.getEvents)
router.post('/events',                        admin, ctrl.createEvent)
router.put('/events/:id',                     admin, ctrl.updateEvent)
router.delete('/events/:id',                  admin, ctrl.deleteEvent)
router.patch('/events/:id/status',            admin, ctrl.updateEventStatus)

// announcements
router.get('/announcements',                  admin, ctrl.getAnnouncements)
router.post('/announcements',                 admin, ctrl.createAnnouncement)
router.put('/announcements/:id',              admin, ctrl.updateAnnouncement)
router.delete('/announcements/:id',           admin, ctrl.deleteAnnouncement)
router.patch('/announcements/:id/status',     admin, ctrl.updateAnnouncementStatus)

// notifications
router.get('/notifications',                  admin, ctrl.getNotifications)
router.post('/notifications',                 admin, ctrl.sendNotification)
router.post('/notifications/inactive-members',admin, ctrl.notifyInactiveMembers)

// test results
router.get('/tests/results',                  admin, ctrl.getAllTestResults)
router.get('/tests/results/:userId',          admin, ctrl.getUserTestResult)

export default router