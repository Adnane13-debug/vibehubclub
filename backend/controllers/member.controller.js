// member controller — all functions here are for logged in members only

import db from '../config/db.js'

// GET DASHBOARD
export const getDashboard = async (req, res) => {
  const userId = req.user.id
  try {
    const [[user]]          = await db.query(
      'SELECT id, nom, prenom, email, role, statut, photo, created_at FROM utilisateurs WHERE id = ?',
      [userId]
    )
    const [[eventsRow]]     = await db.query(
      'SELECT COUNT(*) AS total FROM participations WHERE utilisateur_id = ?',
      [userId]
    )
    const [[notifRow]]      = await db.query(
      'SELECT COUNT(*) AS total FROM notifications WHERE utilisateur_id = ? AND lu = 0',
      [userId]
    )

    res.json({
      user,
      totalEvents:         eventsRow.total,
      unreadNotifications: notifRow.total
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    const [results] = await db.query(
      'SELECT id, nom, prenom, email, role, statut, photo, created_at FROM utilisateurs WHERE id = ?',
      [req.user.id]
    )
    res.json(results[0])
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  const { nom, prenom, photo } = req.body

  // FIX: input length limits
  if (nom && nom.length > 100) return res.status(400).json({ message: 'Name is too long' })
  if (prenom && prenom.length > 100) return res.status(400).json({ message: 'First name is too long' })

  try {
    await db.query(
      'UPDATE utilisateurs SET nom = ?, prenom = ?, photo = ? WHERE id = ?',
      [nom, prenom, photo || null, req.user.id]
    )
    res.json({ message: 'Profile updated' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// GET MY EVENTS
export const getEvents = async (req, res) => {
  try {
    const [results] = await db.query(
      `SELECT e.* FROM evenements e
       JOIN participations p ON e.id = p.evenement_id
       WHERE p.utilisateur_id = ?
       ORDER BY e.date_debut DESC`,
      [req.user.id]
    )
    res.json(results)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// JOIN EVENT
export const joinEvent = async (req, res) => {
  const { eventId } = req.params
  try {
    const [events] = await db.query(
      "SELECT * FROM evenements WHERE id = ? AND statut = 'publie'",
      [eventId]
    )

    if (events.length === 0) {
      return res.status(404).json({ message: 'Event not found or not published' })
    }

    await db.query(
      'INSERT INTO participations (utilisateur_id, evenement_id) VALUES (?, ?)',
      [req.user.id, eventId]
    )

    res.status(201).json({ message: 'Joined event successfully' })
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Already joined this event' })
    }
    res.status(500).json({ message: 'Server error' })
  }
}

// CANCEL EVENT
export const cancelEvent = async (req, res) => {
  const { eventId } = req.params
  try {
    const [result] = await db.query(
      'DELETE FROM participations WHERE utilisateur_id = ? AND evenement_id = ?',
      [req.user.id, eventId]
    )
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Participation not found' })
    }
    res.json({ message: 'Participation cancelled' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// GET MY NOTIFICATIONS
export const getNotifications = async (req, res) => {
  try {
    const [results] = await db.query(
      'SELECT * FROM notifications WHERE utilisateur_id = ? ORDER BY created_at DESC',
      [req.user.id]
    )
    res.json(results)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// MARK NOTIFICATION AS READ
export const markAsRead = async (req, res) => {
  const { id } = req.params
  try {
    await db.query(
      'UPDATE notifications SET lu = 1 WHERE id = ? AND utilisateur_id = ?',
      [id, req.user.id]
    )
    res.json({ message: 'Notification marked as read' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// SAVE MBTI RESULT
export const saveMbtiResult = async (req, res) => {
  const { type } = req.body

  if (!type) return res.status(400).json({ message: 'Type is required' })

  // FIX: only accept valid MBTI types (16 known types)
  const validTypes = [
    'INTJ','INTP','ENTJ','ENTP',
    'INFJ','INFP','ENFJ','ENFP',
    'ISTJ','ISFJ','ESTJ','ESFJ',
    'ISTP','ISFP','ESTP','ESFP'
  ]
  if (!validTypes.includes(type.toUpperCase())) {
    return res.status(400).json({ message: 'Invalid MBTI type' })
  }

  try {
    const [results] = await db.query(
      'SELECT * FROM resultats_test WHERE utilisateur_id = ?',
      [req.user.id]
    )

    if (results.length > 0) {
      await db.query(
        'UPDATE resultats_test SET type = ? WHERE utilisateur_id = ?',
        [type.toUpperCase(), req.user.id]
      )
    } else {
      await db.query(
        'INSERT INTO resultats_test (utilisateur_id, type, extraversion, agreeableness, conscientiousness, neuroticism, openness) VALUES (?, ?, 0, 0, 0, 0, 0)',
        [req.user.id, type.toUpperCase()]
      )
    }

    res.json({ message: 'MBTI result saved', type: type.toUpperCase() })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// GET MY MBTI RESULT
export const getMbtiResult = async (req, res) => {
  try {
    const [results] = await db.query(
      'SELECT * FROM resultats_test WHERE utilisateur_id = ?',
      [req.user.id]
    )
    if (results.length === 0) return res.json(null)
    res.json(results[0])
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}