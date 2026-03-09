// admin controller
// all functions here are admin only

import db from '../config/db.js'

// GET DASHBOARD STATS
// returns counts for members, events, participations

export const getStats = (req, res) => {
  const stats = {}

  // count members
  db.query(
    "SELECT COUNT(*) AS total FROM utilisateurs WHERE role = 'membre'",
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      stats.totalMembers = result[0].total

      // count events
      db.query(
        'SELECT COUNT(*) AS total FROM evenements',
        (err, result) => {
          if (err) return res.status(500).json({ message: 'Server error' })
          stats.totalEvents = result[0].total

          // count participations
          db.query(
            'SELECT COUNT(*) AS total FROM participations',
            (err, result) => {
              if (err) return res.status(500).json({ message: 'Server error' })
              stats.totalParticipations = result[0].total

              res.json(stats)
            }
          )
        }
      )
    }
  )
}

// GET ALL MEMBERS

export const getMembers = (req, res) => {
  db.query(
    "SELECT id, nom, prenom, email, role, statut, created_at FROM utilisateurs WHERE role = 'membre'",
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      res.json(results)
    }
  )
}

// GET ONE MEMBER

export const getMember = (req, res) => {
  const { id } = req.params

  db.query(
    'SELECT id, nom, prenom, email, role, statut, created_at FROM utilisateurs WHERE id = ?',
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' })

      if (results.length === 0) {
        return res.status(404).json({ message: 'Member not found' })
      }

      res.json(results[0])
    }
  )
}

// UPDATE MEMBER STATUS
// activate or deactivate a member

export const updateMemberStatus = (req, res) => {
  const { id } = req.params
  const { statut } = req.body

  if (!statut) {
    return res.status(400).json({ message: 'Status is required' })
  }

  db.query(
    'UPDATE utilisateurs SET statut = ? WHERE id = ?',
    [statut, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      res.json({ message: 'Member status updated' })
    }
  )
}

// GET ALL EVENTS (admin)
// returns all events including drafts

export const getEvents = (req, res) => {
  db.query(
    'SELECT * FROM evenements ORDER BY created_at DESC',
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      res.json(results)
    }
  )
}

// CREATE EVENT

export const createEvent = (req, res) => {
  const { titre, description, date_debut, lieu, categorie, image } = req.body

  if (!titre || !description || !date_debut || !lieu || !categorie) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  db.query(
    'INSERT INTO evenements (titre, description, date_debut, lieu, categorie, image, cree_par) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [titre, description, date_debut, lieu, categorie, image || null, req.user.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      res.status(201).json({ message: 'Event created', id: result.insertId })
    }
  )
}

// UPDATE EVENT

export const updateEvent = (req, res) => {
  const { id } = req.params
  const { titre, description, date_debut, lieu, categorie, image } = req.body

  db.query(
    'UPDATE evenements SET titre = ?, description = ?, date_debut = ?, lieu = ?, categorie = ?, image = ? WHERE id = ?',
    [titre, description, date_debut, lieu, categorie, image || null, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      res.json({ message: 'Event updated' })
    }
  )
}

// DELETE EVENT

export const deleteEvent = (req, res) => {
  const { id } = req.params

  db.query(
    'DELETE FROM evenements WHERE id = ?',
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      res.json({ message: 'Event deleted' })
    }
  )
}

// UPDATE EVENT STATUS
// publie or brouillon

export const updateEventStatus = (req, res) => {
  const { id } = req.params
  const { statut } = req.body

  db.query(
    'UPDATE evenements SET statut = ? WHERE id = ?',
    [statut, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      res.json({ message: 'Event status updated' })
    }
  )
}

// GET ALL ANNOUNCEMENTS

export const getAnnouncements = (req, res) => {
  db.query(
    'SELECT * FROM annonces ORDER BY created_at DESC',
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      res.json(results)
    }
  )
}

// CREATE ANNOUNCEMENT

export const createAnnouncement = (req, res) => {
  const { titre, contenu } = req.body

  if (!titre || !contenu) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  db.query(
    'INSERT INTO annonces (titre, contenu, admin_id) VALUES (?, ?, ?)',
    [titre, contenu, req.user.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      res.status(201).json({ message: 'Announcement created', id: result.insertId })
    }
  )
}

// UPDATE ANNOUNCEMENT

export const updateAnnouncement = (req, res) => {
  const { id } = req.params
  const { titre, contenu } = req.body

  db.query(
    'UPDATE annonces SET titre = ?, contenu = ? WHERE id = ?',
    [titre, contenu, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      res.json({ message: 'Announcement updated' })
    }
  )
}

// DELETE ANNOUNCEMENT

export const deleteAnnouncement = (req, res) => {
  const { id } = req.params

  db.query(
    'DELETE FROM annonces WHERE id = ?',
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      res.json({ message: 'Announcement deleted' })
    }
  )
}

// UPDATE ANNOUNCEMENT STATUS
// visible or hidden

export const updateAnnouncementStatus = (req, res) => {
  const { id } = req.params
  const { visible } = req.body

  db.query(
    'UPDATE annonces SET visible = ? WHERE id = ?',
    [visible, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      res.json({ message: 'Announcement status updated' })
    }
  )
}

// GET ALL NOTIFICATIONS

export const getNotifications = (req, res) => {
  db.query(
    'SELECT * FROM notifications ORDER BY created_at DESC',
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      res.json(results)
    }
  )
}

// SEND NOTIFICATION
// send to a specific member

export const sendNotification = (req, res) => {
  const { utilisateur_id, message } = req.body

  if (!utilisateur_id || !message) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  db.query(
    'INSERT INTO notifications (utilisateur_id, message) VALUES (?, ?)',
    [utilisateur_id, message],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      res.status(201).json({ message: 'Notification sent' })
    }
  )
}

// NOTIFY INACTIVE MEMBERS
// sends notification to all inactive members

export const notifyInactiveMembers = (req, res) => {
  const { message } = req.body

  if (!message) {
    return res.status(400).json({ message: 'Message is required' })
  }

  // find all inactive members
  db.query(
    "SELECT id FROM utilisateurs WHERE statut = 'inactif' AND role = 'membre'",
    (err, members) => {
      if (err) return res.status(500).json({ message: 'Server error' })

      if (members.length === 0) {
        return res.json({ message: 'No inactive members found' })
      }

      // send notification to each one
      const values = members.map(m => [m.id, message])

      db.query(
        'INSERT INTO notifications (utilisateur_id, message) VALUES ?',
        [values],
        (err, result) => {
          if (err) return res.status(500).json({ message: 'Server error' })
          res.json({ message: `Notifications sent to ${members.length} inactive members` })
        }
      )
    }
  )
}

// GET ALL TEST RESULTS

export const getAllTestResults = (req, res) => {
  db.query(
    `SELECT r.*, u.nom, u.prenom, u.email 
     FROM resultats_test r
     JOIN utilisateurs u ON r.utilisateur_id = u.id
     ORDER BY r.created_at DESC`,
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      res.json(results)
    }
  )
}

// GET ONE USER TEST RESULT

export const getUserTestResult = (req, res) => {
  const { userId } = req.params

  db.query(
    'SELECT * FROM resultats_test WHERE utilisateur_id = ?',
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' })

      if (results.length === 0) {
        return res.status(404).json({ message: 'No test result found' })
      }

      res.json(results[0])
    }
  )
}