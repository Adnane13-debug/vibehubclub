// tests/admin.test.js
// Covers: all admin routes — auth guards, role guards, and validation

import request from 'supertest'
import app     from '../server.js'

// ─── shared helpers ───────────────────────────────────────────────────────
let adminToken
let memberToken

// Log in once before all tests in this file run
beforeAll(async () => {
  const adminLogin = await request(app)
    .post('/api/auth/login')
    .send({ email: process.env.TEST_ADMIN_EMAIL, mot_de_passe: process.env.TEST_ADMIN_PASSWORD })
  adminToken = adminLogin.body.token

  const memberLogin = await request(app)
    .post('/api/auth/login')
    .send({ email: process.env.TEST_MEMBER_EMAIL, mot_de_passe: process.env.TEST_MEMBER_PASSWORD })
  memberToken = memberLogin.body.token
})

// ─── helper to test every protected admin route quickly ───────────────────
const expectBlocked = async (method, url) => {
  // no token → 401
  const noToken = await request(app)[method](url)
  expect(noToken.status).toBe(401)

  // member token → 403 (wrong role)
  const wrongRole = await request(app)[method](url)
    .set('Authorization', `Bearer ${memberToken}`)
  expect(wrongRole.status).toBe(403)
}

// ─────────────────────────────────────────────
// Auth + role guards — every admin route
// ─────────────────────────────────────────────
describe('Admin routes — auth and role guards', () => {

  it('blocks /dashboard/stats without token or wrong role', async () => {
    await expectBlocked('get', '/api/admin/dashboard/stats')
  })

  it('blocks /members without token or wrong role', async () => {
    await expectBlocked('get', '/api/admin/members')
  })

  it('blocks /events without token or wrong role', async () => {
    await expectBlocked('get', '/api/admin/events')
  })

  it('blocks /announcements without token or wrong role', async () => {
    await expectBlocked('get', '/api/admin/announcements')
  })

  it('blocks /notifications without token or wrong role', async () => {
    await expectBlocked('get', '/api/admin/notifications')
  })

  it('blocks /contacts without token or wrong role', async () => {
    await expectBlocked('get', '/api/admin/contacts')
  })

})

// ─────────────────────────────────────────────
// Dashboard
// ─────────────────────────────────────────────
describe('GET /api/admin/dashboard/stats', () => {

  it('returns stats object for admin', async () => {
    const res = await request(app)
      .get('/api/admin/dashboard/stats')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(res.status).toBe(200)
    expect(res.body.totalMembers).toBeDefined()
    expect(res.body.totalEvents).toBeDefined()
    expect(res.body.totalParticipations).toBeDefined()
  })

})

// ─────────────────────────────────────────────
// Members
// ─────────────────────────────────────────────
describe('GET /api/admin/members', () => {

  it('returns an array of members', async () => {
    const res = await request(app)
      .get('/api/admin/members')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('does not expose passwords in the member list', async () => {
    const res = await request(app)
      .get('/api/admin/members')
      .set('Authorization', `Bearer ${adminToken}`)
    res.body.forEach(member => {
      expect(member.mot_de_passe).toBeUndefined()
    })
  })

})

describe('PATCH /api/admin/members/:id/status', () => {

  it('returns 400 for an invalid status value', async () => {
    const res = await request(app)
      .patch('/api/admin/members/1/status')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ statut: 'hacked' })  // not in ['actif', 'inactif']
    expect(res.status).toBe(400)
  })

  it('accepts valid status values: actif and inactif', async () => {
    // We just check it doesn't return 400 — 404 is fine if the member doesn't exist
    const actif = await request(app)
      .patch('/api/admin/members/1/status')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ statut: 'actif' })
    expect([200, 404]).toContain(actif.status)

    const inactif = await request(app)
      .patch('/api/admin/members/1/status')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ statut: 'inactif' })
    expect([200, 404]).toContain(inactif.status)
  })

})

// ─────────────────────────────────────────────
// Events
// ─────────────────────────────────────────────
describe('POST /api/admin/events', () => {

  it('returns 400 when required fields are missing', async () => {
    const res = await request(app)
      .post('/api/admin/events')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ titre: 'Only title, no other fields' })
    expect(res.status).toBe(400)
  })

  it('returns 400 when title is too long', async () => {
    const res = await request(app)
      .post('/api/admin/events')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        titre:       'A'.repeat(250),
        description: 'Test',
        date_debut:  '2025-12-01',
        lieu:        'Casablanca',
        categorie:   'sport'
      })
    expect(res.status).toBe(400)
  })

  it('creates an event with valid data', async () => {
    const res = await request(app)
      .post('/api/admin/events')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        titre:       'Test Event',
        description: 'Created by automated test',
        date_debut:  '2025-12-01',
        lieu:        'Casablanca',
        categorie:   'sport'
      })
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
  })

})

describe('PATCH /api/admin/events/:id/status', () => {

  it('returns 400 for an invalid event status', async () => {
    const res = await request(app)
      .patch('/api/admin/events/1/status')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ statut: 'invisible' })
    expect(res.status).toBe(400)
  })

})

// ─────────────────────────────────────────────
// Announcements
// ─────────────────────────────────────────────
describe('POST /api/admin/announcements', () => {

  it('returns 400 when fields are missing', async () => {
    const res = await request(app)
      .post('/api/admin/announcements')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ titre: 'No content' })
    expect(res.status).toBe(400)
  })

  it('returns 400 when content is too long', async () => {
    const res = await request(app)
      .post('/api/admin/announcements')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ titre: 'Test', contenu: 'A'.repeat(5001) })
    expect(res.status).toBe(400)
  })

  it('creates an announcement with valid data', async () => {
    const res = await request(app)
      .post('/api/admin/announcements')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ titre: 'Test Announcement', contenu: 'Created by automated test' })
    expect(res.status).toBe(201)
  })

})

// ─────────────────────────────────────────────
// Notifications
// ─────────────────────────────────────────────
describe('POST /api/admin/notifications', () => {

  it('returns 400 when message is missing', async () => {
    const res = await request(app)
      .post('/api/admin/notifications')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ utilisateur_id: 1 })
    expect(res.status).toBe(400)
  })

  it('returns 400 when message is too long', async () => {
    const res = await request(app)
      .post('/api/admin/notifications')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ utilisateur_id: 1, message: 'A'.repeat(1001) })
    expect(res.status).toBe(400)
  })

})