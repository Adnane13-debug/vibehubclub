// public controller
// no authentication needed here

import db from '../config/db.js'

const PUBLISHED_WHERE = "e.statut IN ('publie', 'publié')"

const participationSubquery = `
  (SELECT COUNT(*) FROM participations p WHERE p.evenement_id = e.id) AS participation_count
`

async function listPublishedEvents({ featuredOnly = false, limit = null } = {}) {
  let sql = `
    SELECT e.*, ${participationSubquery}
    FROM evenements e
    WHERE ${PUBLISHED_WHERE}
  `

  if (featuredOnly) {
    sql += ' AND e.featured = 1'
  }

  sql += ' ORDER BY e.date_debut DESC'

  if (limit) {
    sql += ` LIMIT ${Number(limit)}`
  }

  const [results] = await db.query(sql)
  return results
}

// GET ALL EVENTS — returns only published events
// Query: ?featured=1 — returns at most one featured published event (with participation count)
export const getEvents = async (req, res) => {
  const wantsFeatured = req.query.featured === '1' || req.query.featured === 'true'

  try {
    let results = await listPublishedEvents({ featuredOnly: wantsFeatured, limit: wantsFeatured ? 1 : null })

    if (wantsFeatured && results.length === 0) {
      results = await listPublishedEvents({ limit: 1 })
    }

    res.json(wantsFeatured ? results.slice(0, 1) : results)
  } catch (err) {
    if (err.code === 'ER_BAD_FIELD_ERROR' && String(err.message).includes('featured')) {
      try {
        let results = await listPublishedEvents({ limit: wantsFeatured ? 1 : null })
        res.json(wantsFeatured ? results.slice(0, 1) : results)
        return
      } catch (fallbackErr) {
        console.error('getEvents fallback error:', fallbackErr)
      }
    }
    console.error('getEvents error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

// GET ONE EVENT — returns one event by id
export const getEventDetail = async (req, res) => {
  const { id } = req.params
  try {
    const [results] = await db.query(
      `SELECT * FROM evenements WHERE id = ? AND ${PUBLISHED_WHERE.replace('e.', '')}`,
      [id]
    )
    if (results.length === 0) {
      return res.status(404).json({ message: 'Event not found' })
    }
    res.json(results[0])
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// GET ANNOUNCEMENTS — returns only visible announcements
export const getAnnouncements = async (req, res) => {
  try {
    const [results] = await db.query(
      'SELECT * FROM annonces WHERE visible = 1 ORDER BY created_at DESC'
    )
    res.json(results)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// SEND CONTACT MESSAGE — saves name, email, message
export const sendContact = async (req, res) => {
  const { nom, email, message } = req.body

  if (!nom || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // FIX: input length limits — prevents database abuse and spam
  if (nom.length > 100) {
    return res.status(400).json({ message: 'Name is too long (max 100 characters)' })
  }
  if (email.length > 255) {
    return res.status(400).json({ message: 'Email is too long' })
  }
  if (message.length > 2000) {
    return res.status(400).json({ message: 'Message is too long (max 2000 characters)' })
  }

  // FIX: basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' })
  }

  try {
    await db.query(
      'INSERT INTO contacts (nom, email, message) VALUES (?, ?, ?)',
      [nom, email, message]
    )
    res.json({ message: 'Message sent successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// APPLY FOR MEMBERSHIP — public, no auth needed
export const applyForMembership = async (req, res) => {
  const { nom, prenom, email, message } = req.body

  // validate required fields
  if (!nom || !prenom || !email) {
    return res.status(400).json({ message: 'Nom, prénom, and email are required' })
  }

  // length limits
  if (nom.length > 100) return res.status(400).json({ message: 'Nom is too long (max 100)' })
  if (prenom.length > 100) return res.status(400).json({ message: 'Prénom is too long (max 100)' })
  if (email.length > 255) return res.status(400).json({ message: 'Email is too long' })
  if (message && message.length > 1000) return res.status(400).json({ message: 'Message is too long (max 1000)' })

  // email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' })
  }

  try {
    // check if email already exists in utilisateurs
    const [existingUsers] = await db.query(
      'SELECT id FROM utilisateurs WHERE email = ?',
      [email]
    )
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    // check if a pending or accepted request already exists
    const [existingRequests] = await db.query(
      "SELECT id FROM demandes_adhesion WHERE email = ? AND statut IN ('en_attente', 'acceptee')",
      [email]
    )
    if (existingRequests.length > 0) {
      return res.status(400).json({ message: 'Request already submitted' })
    }

    // insert the application
    await db.query(
      'INSERT INTO demandes_adhesion (nom, prenom, email, message) VALUES (?, ?, ?, ?)',
      [nom, prenom, email, message || null]
    )

    res.status(201).json({ message: 'Application submitted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}