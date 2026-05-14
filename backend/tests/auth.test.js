// tests/auth.test.js
// Covers: register, login, /me, logout

import request from 'supertest'
import app     from '../server.js'

// ─────────────────────────────────────────────
// POST /api/auth/register
// ─────────────────────────────────────────────
describe('POST /api/auth/register', () => {

  it('returns 400 when required fields are missing', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'noname@test.com' })
    expect(res.status).toBe(400)
    expect(res.body.message).toBeDefined()
  })

  it('returns 400 when a field is too long', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        nom:          'A'.repeat(150),
        prenom:       'Test',
        email:        'toolong@test.com',
        mot_de_passe: 'Password123'
      })
    expect(res.status).toBe(400)
  })

})

// ─────────────────────────────────────────────
// POST /api/auth/login
// ─────────────────────────────────────────────
describe('POST /api/auth/login', () => {

  it('returns 400 when body is empty', async () => {
    const res = await request(app).post('/api/auth/login').send({})
    expect(res.status).toBe(400)
  })

  it('returns 401 with a wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: process.env.TEST_ADMIN_EMAIL, mot_de_passe: 'wrongpassword' })
    expect(res.status).toBe(401)
    // SECURITY: must be generic — cannot say "wrong password"
    expect(res.body.message).toBe('Invalid email or password')
  })

  it('returns 401 with an unknown email — same message as wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'ghost@nowhere.com', mot_de_passe: 'whatever' })
    expect(res.status).toBe(401)
    // SECURITY: identical message prevents user enumeration
    expect(res.body.message).toBe('Invalid email or password')
  })

  it('returns a token and user object on valid login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email:        process.env.TEST_ADMIN_EMAIL,
        mot_de_passe: process.env.TEST_ADMIN_PASSWORD
      })
    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()
    expect(res.body.user).toBeDefined()
    expect(res.body.user.email).toBe(process.env.TEST_ADMIN_EMAIL)
    // SECURITY: password must never be in the response
    expect(res.body.user.mot_de_passe).toBeUndefined()
  })

})

// ─────────────────────────────────────────────
// GET /api/auth/me
// ─────────────────────────────────────────────
describe('GET /api/auth/me', () => {

  it('returns 401 with no token', async () => {
    const res = await request(app).get('/api/auth/me')
    expect(res.status).toBe(401)
  })

  it('returns 403 with a fake token', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer this.is.totally.fake')
    expect(res.status).toBe(403)
  })

  it('returns user data with a valid token — no password field', async () => {
    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: process.env.TEST_ADMIN_EMAIL, mot_de_passe: process.env.TEST_ADMIN_PASSWORD })

    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${login.body.token}`)

    expect(res.status).toBe(200)
    expect(res.body.email).toBe(process.env.TEST_ADMIN_EMAIL)
    expect(res.body.mot_de_passe).toBeUndefined()
  })

})

// ─────────────────────────────────────────────
// POST /api/auth/logout
// ─────────────────────────────────────────────
describe('POST /api/auth/logout', () => {

  it('returns 401 with no token', async () => {
    const res = await request(app).post('/api/auth/logout')
    expect(res.status).toBe(401)
  })

  it('returns 200 with a valid token', async () => {
    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: process.env.TEST_ADMIN_EMAIL, mot_de_passe: process.env.TEST_ADMIN_PASSWORD })

    const res = await request(app)
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${login.body.token}`)

    expect(res.status).toBe(200)
  })

})