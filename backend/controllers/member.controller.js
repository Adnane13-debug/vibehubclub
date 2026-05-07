// member controller
// all functions here are for logged in members only

import db from '../config/db.js'

// GET DASHBOARD
// returns profile + events + notifications summary

export const getDashboard = (req, res) => {
  const userId = req.user.id

  // get member profile
  db.query(
    'SELECT id, nom, prenom, email, role, statut, photo, created_at FROM utilisateurs WHERE id = ?',
    [userId],
    (err, userResult) => {
      if (err) return res.status(500).json({ message: 'Server error' })

      // get joined events count
      db.query(
        'SELECT COUNT(*) AS total FROM participations WHERE utilisateur_id = ?',
        [userId],
        (err, eventsResult) => {
          if (err) return res.status(500).json({ message: 'Server error' })

          // get unread notifications count
          db.query(
            'SELECT COUNT(*) AS total FROM notifications WHERE utilisateur_id = ? AND lu = 0',
            [userId],
            (err, notifResult) => {
              if (err) return res.status(500).json({ message: 'Server error' })

              res.json({
                user:                 userResult[0],
                totalEvents:          eventsResult[0].total,
                unreadNotifications:  notifResult[0].total
              })
            }
          )
        }
      )
    }
  )
}

// GET PROFILE

export const getProfile = (req, res) => {
  db.query(
    'SELECT id, nom, prenom, email, role, statut, photo, created_at FROM utilisateurs WHERE id = ?',
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      res.json(results[0])
    }
  )
}

// UPDATE PROFILE

export const updateProfile = (req, res) => {
  const { nom, prenom, photo } = req.body

  db.query(
    'UPDATE utilisateurs SET nom = ?, prenom = ?, photo = ? WHERE id = ?',
    [nom, prenom, photo || null, req.user.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      res.json({ message: 'Profile updated' })
    }
  )
}

// GET MY EVENTS
// returns all events the member joined

export const getEvents = (req, res) => {
  db.query(
    `SELECT e.* FROM evenements e
     JOIN participations p ON e.id = p.evenement_id
     WHERE p.utilisateur_id = ?
     ORDER BY e.date_debut DESC`,
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      res.json(results)
    }
  )
}

// JOIN EVENT

export const joinEvent = (req, res) => {
  const { eventId } = req.params

  // check if event exists and is published
  db.query(
    "SELECT * FROM evenements WHERE id = ? AND statut = 'publie'",
    [eventId],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' })

      if (results.length === 0) {
        return res.status(404).json({ message: 'Event not found or not published' })
      }

      // join the event
      db.query(
        'INSERT INTO participations (utilisateur_id, evenement_id) VALUES (?, ?)',
        [req.user.id, eventId],
        (err, result) => {
          if (err) {
            // already joined
            if (err.code === 'ER_DUP_ENTRY') {
              return res.status(400).json({ message: 'Already joined this event' })
            }
            return res.status(500).json({ message: 'Server error' })
          }
          res.status(201).json({ message: 'Joined event successfully' })
        }
      )
    }
  )
}

// CANCEL EVENT

export const cancelEvent = (req, res) => {
  const { eventId } = req.params

  db.query(
    'DELETE FROM participations WHERE utilisateur_id = ? AND evenement_id = ?',
    [req.user.id, eventId],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Server error' })

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Participation not found' })
      }

      res.json({ message: 'Participation cancelled' })
    }
  )
}

// GET MY NOTIFICATIONS

export const getNotifications = (req, res) => {
  db.query(
    'SELECT * FROM notifications WHERE utilisateur_id = ? ORDER BY created_at DESC',
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      res.json(results)
    }
  )
}

// MARK NOTIFICATION AS READ

export const markAsRead = (req, res) => {
  const { id } = req.params

  db.query(
    'UPDATE notifications SET lu = 1 WHERE id = ? AND utilisateur_id = ?',
    [id, req.user.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      res.json({ message: 'Notification marked as read' })
    }
  )
}

// SAVE MBTI RESULT
// called after member completes the external test

export const saveMbtiResult = (req, res) => {
  const { extraversion, agreeableness, conscientiousness, neuroticism, openness } = req.body

  if (!extraversion || !agreeableness || !conscientiousness || !neuroticism || !openness) {
    return res.status(400).json({ message: 'All scores are required' })
  }

  // check if result already exists
  db.query(
    'SELECT * FROM resultats_test WHERE utilisateur_id = ?',
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' })

      if (results.length > 0) {
        // update existing result
        db.query(
          'UPDATE resultats_test SET extraversion = ?, agreeableness = ?, conscientiousness = ?, neuroticism = ?, openness = ? WHERE utilisateur_id = ?',
          [extraversion, agreeableness, conscientiousness, neuroticism, openness, req.user.id],
          (err, result) => {
            if (err) return res.status(500).json({ message: 'Server error' })
            res.json({ message: 'Test result updated' })
          }
        )
      } else {
        // insert new result
        db.query(
          'INSERT INTO resultats_test (utilisateur_id, extraversion, agreeableness, conscientiousness, neuroticism, openness) VALUES (?, ?, ?, ?, ?, ?)',
          [req.user.id, extraversion, agreeableness, conscientiousness, neuroticism, openness],
          (err, result) => {
            if (err) return res.status(500).json({ message: 'Server error' })
            res.status(201).json({ message: 'Test result saved' })
          }
        )
      }
    }
  )
}

// GET MY MBTI RESULT

export const getMbtiResult = (req, res) => {
  db.query(
    'SELECT * FROM resultats_test WHERE utilisateur_id = ?',
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' })

      if (results.length === 0) {
        return res.json(null)
      }

      res.json(results[0])
    }
  )
}