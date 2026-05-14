// tests/member.test.js
// Covers: all member routes — auth guards, role guards, and validation

import request from 'supertest'
import app     from '../server.js'

// ─── shared helpers ───────────────────────────────────────────────────────
let memberToken
let adminToken

beforeAll(async () => {
  const memberLogin = await request(app)
    .post('/api/auth/login')
    .send({ email: process.env.TEST_MEMBER_EMAIL, mot_de_passe: process.env.TEST_MEMBER_PASSWORD })
  memberToken = memberLogin.body.token

  const adminLogin = await request(app)
    .post('/api/auth/login')
    .send({ email: process.env.TEST_ADMIN_EMAIL, mot_de_passe: process.env.TEST_ADMIN_PASSWORD })
  adminToken = adminLogin.body.token
})

// ─── helper to test every protected member route quickly ──────────────────
const expectBlocked = async (method, url) => {
  // no token → 401
  const noToken = await request(app)[method](url)
  expect(noToken.status).toBe(401)

  // admin token → 403 (wrong role — admin is not membre)
  const wrongRole = await request(app)[method](url)
    .set('Authorization', `Bearer ${adminToken}`)
  expect(wrongRole.status).toBe(403)
}

// ─────────────────────────────────────────────
// Auth + role guards — every member route
// ─────────────────────────────────────────────
describe('Member routes — auth and role guards', () => {

  it('blocks /dashboard without token or wrong role', async () => {
    await expectBlocked('get', '/api/member/dashboard')
  })

  it('blocks /profile without token or wrong role', async () => {
    await expectBlocked('get', '/api/member/profile')
  })

  it('blocks /events without token or wrong role', async () => {
    await expectBlocked('get', '/api/member/events')
  })

  it('blocks /notifications without token or wrong role', async () => {
    await expectBlocked('get', '/api/member/notifications')
  })

  it('blocks /mbti/results without token or wrong role', async () => {
    await expectBlocked('get', '/api/member/mbti/results')
  })

})

// ─────────────────────────────────────────────
// Dashboard
// ─────────────────────────────────────────────
describe('GET /api/member/dashboard', () => {

  it('returns dashboard data for a valid member', async () => {
    const res = await request(app)
      .get('/api/member/dashboard')
      .set('Authorization', `Bearer ${memberToken}`)
    expect(res.status).toBe(200)
    expect(res.body.user).toBeDefined()
    expect(res.body.totalEvents).toBeDefined()
    expect(res.body.unreadNotifications).toBeDefined()
    // SECURITY: no password in dashboard response
    expect(res.body.user.mot_de_passe).toBeUndefined()
  })

})

// ─────────────────────────────────────────────
// Profile
// ─────────────────────────────────────────────
describe('GET /api/member/profile', () => {

  it('returns profile without password field', async () => {
    const res = await request(app)
      .get('/api/member/profile')
      .set('Authorization', `Bearer ${memberToken}`)
    expect(res.status).toBe(200)
    expect(res.body.email).toBeDefined()
    expect(res.body.mot_de_passe).toBeUndefined()
  })

})

describe('PUT /api/member/profile', () => {

  it('returns 400 when name is too long', async () => {
    const res = await request(app)
      .put('/api/member/profile')
      .set('Authorization', `Bearer ${memberToken}`)
      .send({ nom: 'A'.repeat(150), prenom: 'Test' })
    expect(res.status).toBe(400)
  })

  it('updates profile with valid data', async () => {
    const res = await request(app)
      .put('/api/member/profile')
      .set('Authorization', `Bearer ${memberToken}`)
      .send({ nom: 'Updated', prenom: 'Name' })
    expect(res.status).toBe(200)
  })

})

// ─────────────────────────────────────────────
// Events
// ─────────────────────────────────────────────
describe('GET /api/member/events', () => {

  it('returns an array of events', async () => {
    const res = await request(app)
      .get('/api/member/events')
      .set('Authorization', `Bearer ${memberToken}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

})

describe('POST /api/member/events/:eventId/join', () => {

  it('returns 404 when event does not exist', async () => {
    const res = await request(app)
      .post('/api/member/events/999999/join')
      .set('Authorization', `Bearer ${memberToken}`)
    expect(res.status).toBe(404)
  })

})

// ─────────────────────────────────────────────
// MBTI
// ─────────────────────────────────────────────
describe('POST /api/member/mbti/results', () => {

  it('returns 400 when type is missing', async () => {
    const res = await request(app)
      .post('/api/member/mbti/results')
      .set('Authorization', `Bearer ${memberToken}`)
      .send({})
    expect(res.status).toBe(400)
  })

  it('returns 400 for an invalid MBTI type', async () => {
    const res = await request(app)
      .post('/api/member/mbti/results')
      .set('Authorization', `Bearer ${memberToken}`)
      .send({ type: 'XXXX' })
    expect(res.status).toBe(400)
  })

  it('accepts all 16 valid MBTI types', async () => {
    const types = ['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP',
                   'ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP']
    for (const type of types) {
      const res = await request(app)
        .post('/api/member/mbti/results')
        .set('Authorization', `Bearer ${memberToken}`)
        .send({ type })
      expect(res.status).toBe(200)
    }
  })

})

describe('GET /api/member/mbti/results', () => {

  it('returns the saved MBTI result or null', async () => {
    const res = await request(app)
      .get('/api/member/mbti/results')
      .set('Authorization', `Bearer ${memberToken}`)
    expect(res.status).toBe(200)
    // result is either an object or null
    expect(res.body === null || typeof res.body === 'object').toBe(true)
  })

})

// ─────────────────────────────────────────────
// Notifications
// ─────────────────────────────────────────────
describe('GET /api/member/notifications', () => {

  it('returns an array of notifications', async () => {
    const res = await request(app)
      .get('/api/member/notifications')
      .set('Authorization', `Bearer ${memberToken}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

})
