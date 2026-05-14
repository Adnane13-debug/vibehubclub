// admin controller — all functions here are admin only

import db from '../config/db.js'

// GET DASHBOARD STATS
export const getStats = async (req, res) => {
  try {
    const [[membersRow]]        = await db.query("SELECT COUNT(*) AS total FROM utilisateurs WHERE role = 'membre'")
    const [[eventsRow]]         = await db.query('SELECT COUNT(*) AS total FROM evenements')
    const [[participationsRow]] = await db.query('SELECT COUNT(*) AS total FROM participations')

    res.json({
      totalMembers:       membersRow.total,
      totalEvents:        eventsRow.total,
      totalParticipations: participationsRow.total
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// GET ALL MEMBERS
export const getMembers = async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT id, nom, prenom, email, role, statut, created_at FROM utilisateurs WHERE role = 'membre'"
    )
    res.json(results)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// GET ONE MEMBER
export const getMember = async (req, res) => {
  const { id } = req.params
  try {
    const [results] = await db.query(
      'SELECT id, nom, prenom, email, role, statut, created_at FROM utilisateurs WHERE id = ?',
      [id]
    )
    if (results.length === 0) return res.status(404).json({ message: 'Member not found' })
    res.json(results[0])
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// UPDATE MEMBER STATUS
export const updateMemberStatus = async (req, res) => {
  const { id } = req.params
  const { statut } = req.body

  // FIX: only allow known status values — reject anything else
  const allowed = ['actif', 'inactif']
  if (!statut || !allowed.includes(statut)) {
    return res.status(400).json({ message: 'Invalid status. Allowed: actif, inactif' })
  }

  try {
    await db.query('UPDATE utilisateurs SET statut = ? WHERE id = ?', [statut, id])
    res.json({ message: 'Member status updated' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// GET ALL EVENTS
export const getEvents = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM evenements ORDER BY created_at DESC')
    res.json(results)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// CREATE EVENT
export const createEvent = async (req, res) => {
  const { titre, description, date_debut, lieu, categorie, image } = req.body

  if (!titre || !description || !date_debut || !lieu || !categorie) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // FIX: input length limits
  if (titre.length > 200 || description.length > 5000 || lieu.length > 300) {
    return res.status(400).json({ message: 'One or more fields are too long' })
  }

  try {
    const [result] = await db.query(
      'INSERT INTO evenements (titre, description, date_debut, lieu, categorie, image, cree_par) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [titre, description, date_debut, lieu, categorie, image || null, req.user.id]
    )
    res.status(201).json({ message: 'Event created', id: result.insertId })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// UPDATE EVENT
export const updateEvent = async (req, res) => {
  const { id } = req.params
  const { titre, description, date_debut, lieu, categorie, image } = req.body

  if (titre && titre.length > 200) {
    return res.status(400).json({ message: 'Title is too long' })
  }

  try {
    await db.query(
      'UPDATE evenements SET titre = ?, description = ?, date_debut = ?, lieu = ?, categorie = ?, image = ? WHERE id = ?',
      [titre, description, date_debut, lieu, categorie, image || null, id]
    )
    res.json({ message: 'Event updated' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// DELETE EVENT
export const deleteEvent = async (req, res) => {
  const { id } = req.params
  try {
    await db.query('DELETE FROM evenements WHERE id = ?', [id])
    res.json({ message: 'Event deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// UPDATE EVENT STATUS
export const updateEventStatus = async (req, res) => {
  const { id } = req.params
  const { statut } = req.body

  // FIX: validate event status values
  const allowed = ['publie', 'brouillon']
  if (!statut || !allowed.includes(statut)) {
    return res.status(400).json({ message: 'Invalid status. Allowed: publie, brouillon' })
  }

  try {
    await db.query('UPDATE evenements SET statut = ? WHERE id = ?', [statut, id])
    res.json({ message: 'Event status updated' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// GET ALL ANNOUNCEMENTS
export const getAnnouncements = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM annonces ORDER BY created_at DESC')
    res.json(results)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// CREATE ANNOUNCEMENT
export const createAnnouncement = async (req, res) => {
  const { titre, contenu } = req.body

  if (!titre || !contenu) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // FIX: input length limits
  if (titre.length > 200 || contenu.length > 5000) {
    return res.status(400).json({ message: 'Title or content is too long' })
  }

  try {
    const [result] = await db.query(
      'INSERT INTO annonces (titre, contenu, admin_id) VALUES (?, ?, ?)',
      [titre, contenu, req.user.id]
    )
    res.status(201).json({ message: 'Announcement created', id: result.insertId })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// UPDATE ANNOUNCEMENT
export const updateAnnouncement = async (req, res) => {
  const { id } = req.params
  const { titre, contenu } = req.body

  if (titre && titre.length > 200) return res.status(400).json({ message: 'Title is too long' })
  if (contenu && contenu.length > 5000) return res.status(400).json({ message: 'Content is too long' })

  try {
    await db.query(
      'UPDATE annonces SET titre = ?, contenu = ? WHERE id = ?',
      [titre, contenu, id]
    )
    res.json({ message: 'Announcement updated' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// DELETE ANNOUNCEMENT
export const deleteAnnouncement = async (req, res) => {
  const { id } = req.params
  try {
    await db.query('DELETE FROM annonces WHERE id = ?', [id])
    res.json({ message: 'Announcement deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// UPDATE ANNOUNCEMENT STATUS
export const updateAnnouncementStatus = async (req, res) => {
  const { id } = req.params
  const { visible } = req.body

  // FIX: visible must be 0 or 1
  if (visible === undefined || ![0, 1].includes(Number(visible))) {
    return res.status(400).json({ message: 'visible must be 0 or 1' })
  }

  try {
    await db.query('UPDATE annonces SET visible = ? WHERE id = ?', [visible, id])
    res.json({ message: 'Announcement status updated' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// GET ALL NOTIFICATIONS
export const getNotifications = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM notifications ORDER BY created_at DESC')
    res.json(results)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// SEND NOTIFICATION
export const sendNotification = async (req, res) => {
  const { utilisateur_id, message } = req.body

  if (!utilisateur_id || !message) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // FIX: input length limit
  if (message.length > 1000) {
    return res.status(400).json({ message: 'Message is too long (max 1000 characters)' })
  }

  try {
    await db.query(
      'INSERT INTO notifications (utilisateur_id, message) VALUES (?, ?)',
      [utilisateur_id, message]
    )
    res.status(201).json({ message: 'Notification sent' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// NOTIFY INACTIVE MEMBERS
export const notifyInactiveMembers = async (req, res) => {
  const { message } = req.body

  if (!message) return res.status(400).json({ message: 'Message is required' })
  if (message.length > 1000) return res.status(400).json({ message: 'Message is too long' })

  try {
    const [members] = await db.query(
      "SELECT id FROM utilisateurs WHERE statut = 'inactif' AND role = 'membre'"
    )

    if (members.length === 0) return res.json({ message: 'No inactive members found' })

    const values = members.map(m => [m.id, message])
    await db.query('INSERT INTO notifications (utilisateur_id, message) VALUES ?', [values])

    res.json({ message: `Notifications sent to ${members.length} inactive members` })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// GET ALL TEST RESULTS
export const getAllTestResults = async (req, res) => {
  try {
    const [results] = await db.query(
      `SELECT r.*, u.nom, u.prenom, u.email
       FROM resultats_test r
       JOIN utilisateurs u ON r.utilisateur_id = u.id
       ORDER BY r.created_at DESC`
    )
    res.json(results)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// GET ONE USER TEST RESULT
export const getUserTestResult = async (req, res) => {
  const { userId } = req.params
  try {
    const [results] = await db.query(
      'SELECT * FROM resultats_test WHERE utilisateur_id = ?',
      [userId]
    )
    if (results.length === 0) return res.status(404).json({ message: 'No test result found' })
    res.json(results[0])
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// GET ALL CONTACTS
export const getContacts = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM contacts ORDER BY created_at DESC')
    res.json(results)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}