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
router.patch('/events/:id/featured',          admin, ctrl.setEventFeatured)

// announcements
router.get('/announcements',                  admin, ctrl.getAnnouncements)
router.post('/announcements',                 admin, ctrl.createAnnouncement)
router.put('/announcements/:id',              admin, ctrl.updateAnnouncement)
router.delete('/announcements/:id',           admin, ctrl.deleteAnnouncement)
router.patch('/announcements/:id/status',     admin, ctrl.updateAnnouncementStatus)

// notifications
router.get('/notifications/admin-feed',       admin, ctrl.getAdminFeed)
router.get('/notifications',                  admin, ctrl.getNotifications)
router.post('/notifications',                 admin, ctrl.sendNotification)
router.post('/notifications/inactive-members',admin, ctrl.notifyInactiveMembers)

// test results
router.get('/tests/results',                  admin, ctrl.getAllTestResults)
router.get('/tests/results/:userId',          admin, ctrl.getUserTestResult)

// contacts
router.get('/contacts',                       admin, ctrl.getContacts)

// membership requests
router.get('/membership-requests',            admin, ctrl.getMembershipRequests)
router.patch('/membership-requests/:id/accept', admin, ctrl.acceptMembershipRequest)
router.patch('/membership-requests/:id/reject', admin, ctrl.rejectMembershipRequest)

// export
router.get('/export/members',                 admin, ctrl.exportMembers)
router.get('/export/events',                  admin, ctrl.exportEvents)
router.get('/export/contacts',                admin, ctrl.exportContacts)

// import
router.post('/import/events',                 admin, ctrl.importEvents)

export default router