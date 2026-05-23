// tests/public.test.js
// Covers: events list, event detail, announcements, contact form
// No token needed for any of these

import request from 'supertest'
import app     from '../server.js'

// ─────────────────────────────────────────────
// GET /api/public/events
// ─────────────────────────────────────────────
describe('GET /api/public/events', () => {

  it('returns 200 and an array', async () => {
    const res = await request(app).get('/api/public/events')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('only returns published events', async () => {
    const res = await request(app).get('/api/public/events')
    // Every event in the response must have statut = 'publie'
    res.body.forEach(event => {
      expect(event.statut).toBe('publie')
    })
  })

  it('accepts featured=1 query param and returns an array', async () => {
    const res = await request(app).get('/api/public/events?featured=1')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    if (res.body.length > 0) {
      expect(res.body[0].featured).toBe(1)
      expect(res.body[0].statut).toBe('publie')
    }
  })

})

// ─────────────────────────────────────────────
// GET /api/public/events/:id
// ─────────────────────────────────────────────
describe('GET /api/public/events/:id', () => {

  it('returns 404 for an event that does not exist', async () => {
    const res = await request(app).get('/api/public/events/999999')
    expect(res.status).toBe(404)
  })

})

// ─────────────────────────────────────────────
// GET /api/public/announcements
// ─────────────────────────────────────────────
describe('GET /api/public/announcements', () => {

  it('returns 200 and an array', async () => {
    const res = await request(app).get('/api/public/announcements')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('only returns visible announcements', async () => {
    const res = await request(app).get('/api/public/announcements')
    res.body.forEach(a => {
      expect(a.visible).toBe(1)
    })
  })

})

// ─────────────────────────────────────────────
// POST /api/public/contact
// ─────────────────────────────────────────────
describe('POST /api/public/contact', () => {

  it('returns 400 when fields are missing', async () => {
    const res = await request(app)
      .post('/api/public/contact')
      .send({ nom: 'Test' })  // missing email and message
    expect(res.status).toBe(400)
  })

  it('returns 400 with an invalid email format', async () => {
    const res = await request(app)
      .post('/api/public/contact')
      .send({ nom: 'Test', email: 'not-an-email', message: 'Hello' })
    expect(res.status).toBe(400)
  })

  it('returns 400 when message is over 2000 characters', async () => {
    const res = await request(app)
      .post('/api/public/contact')
      .send({ nom: 'Test', email: 'test@test.com', message: 'A'.repeat(2001) })
    expect(res.status).toBe(400)
  })

  it('returns 200 with valid data', async () => {
    const res = await request(app)
      .post('/api/public/contact')
      .send({ nom: 'Test User', email: 'test@test.com', message: 'Hello from test' })
    expect(res.status).toBe(200)
  })

})