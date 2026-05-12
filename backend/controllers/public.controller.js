// public controller
// no authentication needed here

import db from '../config/db.js'

// GET ALL EVENTS
// returns only published events

export const getEvents = (req, res) => {
  db.query(
    "SELECT * FROM evenements WHERE statut = 'publie' ORDER BY date_debut DESC",
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      res.json(results)
    }
  )
}

// GET ONE EVENT
// returns one event by id

export const getEventDetail = (req, res) => {
  const { id } = req.params

  db.query(
    'SELECT * FROM evenements WHERE id = ?',
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' })

      if (results.length === 0) {
        return res.status(404).json({ message: 'Event not found' })
      }

      res.json(results[0])
    }
  )
}

// GET ANNOUNCEMENTS
// returns only visible announcements

export const getAnnouncements = (req, res) => {
  db.query(
    "SELECT * FROM annonces WHERE visible = 1 ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      res.json(results)
    }
  )
}

// SEND CONTACT MESSAGE
// saves name, email, message

export const sendContact = async (req, res) => {
  const { nom, email, message } = req.body
  if (!nom || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  try {
    await db.promise().query(
      'INSERT INTO contacts (nom, email, message) VALUES (?, ?, ?)',
      [nom, email, message]
    )
    res.json({ message: 'Message sent successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}