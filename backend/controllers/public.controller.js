// public controller
// no authentication needed here

import db from '../config/db.js'

// GET ALL EVENTS — returns only published events
export const getEvents = async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT * FROM evenements WHERE statut = 'publie' ORDER BY date_debut DESC"
    )
    res.json(results)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// GET ONE EVENT — returns one event by id
export const getEventDetail = async (req, res) => {
  const { id } = req.params
  try {
    const [results] = await db.query(
      "SELECT * FROM evenements WHERE id = ? AND statut = 'publie'",
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