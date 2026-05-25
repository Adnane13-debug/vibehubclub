// admin controller — all functions here are admin only

import db from '../config/db.js'
import bcrypt from 'bcrypt'
import { sendWelcomeEmail } from '../services/email.service.js'
import { uploadToCloudinary } from '../middleware/upload.js'

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
      "INSERT INTO evenements (titre, description, date_debut, lieu, categorie, image, statut, cree_par) VALUES (?, ?, ?, ?, ?, ?, 'en_attente', ?)",
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

// SET EVENT FEATURED (only one featured event at a time)
export const setEventFeatured = async (req, res) => {
  const { id } = req.params
  const { featured } = req.body

  if (featured === undefined) {
    return res.status(400).json({ message: 'featured (boolean) is required' })
  }

  const isFeatured = featured === true || featured === 1 || featured === '1'

  try {
    const [rows] = await db.query('SELECT id FROM evenements WHERE id = ?', [id])
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' })
    }

    if (isFeatured) {
      await db.query('UPDATE evenements SET featured = 0')
      await db.query('UPDATE evenements SET featured = 1 WHERE id = ?', [id])
    } else {
      await db.query('UPDATE evenements SET featured = 0 WHERE id = ?', [id])
    }

    res.json({ message: isFeatured ? 'Event marked as featured' : 'Event unfeatured' })
  } catch (err) {
    console.error('setEventFeatured error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

// UPDATE EVENT STATUS
export const updateEventStatus = async (req, res) => {
  const { id } = req.params
  const { statut } = req.body

  // FIX: validate event status values
  const allowed = ['publie', 'brouillon', 'archive', 'en_attente']
  if (!statut || !allowed.includes(statut)) {
    return res.status(400).json({ message: 'Invalid status. Allowed: publie, brouillon, archive, en_attente' })
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

// GET ADMIN NOTIFICATION FEED (bell dropdown)
export const getAdminFeed = async (req, res) => {
  try {
    const feed = []

    const [requests] = await db.query(
      `SELECT id, nom, prenom, created_at
       FROM demandes_adhesion
       WHERE statut = 'en_attente'
       ORDER BY created_at DESC`
    )

    for (const r of requests) {
      feed.push({
        id: `req-${r.id}`,
        type: 'membership_request',
        icon: 'person_add',
        iconBg: 'bg-emerald-100 text-emerald-600',
        title: r.prenom,
        desc: `${r.prenom} ${r.nom} a demandé à rejoindre le club`,
        created_at: r.created_at,
        lu: false,
        action: 'members',
      })
    }

    const [unreadContacts] = await db.query(
      'SELECT nom, created_at FROM contacts WHERE lu = 0 ORDER BY created_at DESC'
    )

    if (unreadContacts.length > 0) {
      const first = unreadContacts[0]
      const count = unreadContacts.length
      let desc
      if (count === 1) {
        desc = `${first.nom} a envoyé un message`
      } else if (count === 2) {
        desc = `${first.nom} et ${unreadContacts[1].nom} ont envoyé des messages`
      } else {
        desc = `${first.nom} et ${count - 1} autres ont envoyé des messages`
      }

      feed.push({
        id: 'contacts-feed',
        type: 'unread_contact',
        icon: 'mail',
        iconBg: 'bg-violet-100 text-violet-600',
        title: first.nom.split(' ')[0] || first.nom,
        desc,
        created_at: first.created_at,
        lu: false,
        action: 'overview',
      })
    }

    const [recentAnns] = await db.query(
      `SELECT id, titre, created_at FROM annonces
       WHERE created_at >= DATE_SUB(NOW(), INTERVAL 72 HOUR)
       ORDER BY created_at DESC`
    )

    for (const a of recentAnns) {
      feed.push({
        id: `ann-${a.id}`,
        type: 'announcement',
        icon: 'campaign',
        iconBg: 'bg-amber-100 text-amber-700',
        title: a.titre,
        desc: `Nouvelle annonce publiée : ${a.titre}`,
        created_at: a.created_at,
        lu: false,
        action: 'announcements',
      })
    }

    let parts = []
    try {
      ;[parts] = await db.query(
        `SELECT p.evenement_id, p.created_at, u.prenom, e.titre AS event_titre
         FROM participations p
         JOIN utilisateurs u ON p.utilisateur_id = u.id
         JOIN evenements e ON p.evenement_id = e.id
         WHERE p.created_at >= DATE_SUB(NOW(), INTERVAL 72 HOUR)
         ORDER BY p.created_at DESC`
      )
    } catch (partErr) {
      if (partErr.code !== 'ER_BAD_FIELD_ERROR') throw partErr
      ;[parts] = await db.query(
        `SELECT p.evenement_id, NOW() AS created_at, u.prenom, e.titre AS event_titre
         FROM participations p
         JOIN utilisateurs u ON p.utilisateur_id = u.id
         JOIN evenements e ON p.evenement_id = e.id
         ORDER BY p.evenement_id DESC`
      )
    }

    const byEvent = new Map()
    for (const p of parts) {
      if (!byEvent.has(p.evenement_id)) byEvent.set(p.evenement_id, [])
      byEvent.get(p.evenement_id).push(p)
    }

    for (const [eventId, group] of byEvent) {
      const first = group[0]
      const count = group.length
      const eventTitle = first.event_titre
      let desc
      if (count === 1) {
        desc = `${first.prenom} a rejoint ${eventTitle}`
      } else if (count === 2) {
        desc = `${first.prenom} et ${group[1].prenom} ont rejoint ${eventTitle}`
      } else {
        desc = `${first.prenom} et ${count - 1} autres ont rejoint ${eventTitle}`
      }

      const latestAt = group.reduce((max, row) => {
        const t = new Date(row.created_at).getTime()
        return t > max ? t : max
      }, 0)

      feed.push({
        id: `part-${eventId}`,
        type: 'participation',
        icon: 'group_add',
        iconBg: 'bg-sky-100 text-sky-600',
        title: first.prenom,
        desc,
        created_at: new Date(latestAt).toISOString(),
        lu: false,
        action: 'events',
      })
    }

    feed.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    res.json(feed)
  } catch (err) {
    console.error('getAdminFeed error:', err)
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

// ═══════════════════════════════════════════════
//  MEMBERSHIP REQUESTS
// ═══════════════════════════════════════════════

// GET ALL MEMBERSHIP REQUESTS
export const getMembershipRequests = async (req, res) => {
  try {
    const { statut } = req.query
    let query = 'SELECT * FROM demandes_adhesion'
    const params = []

    if (statut) {
      query += ' WHERE statut = ?'
      params.push(statut)
    }

    query += ' ORDER BY created_at DESC'
    const [results] = await db.query(query, params)
    res.json(results)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// ACCEPT MEMBERSHIP REQUEST
export const acceptMembershipRequest = async (req, res) => {
  const { id } = req.params

  try {
    const [rows] = await db.query('SELECT * FROM demandes_adhesion WHERE id = ?', [id])

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Request not found' })
    }

    const request = rows[0]

    if (request.statut !== 'en_attente') {
      return res.status(400).json({ message: 'Request already processed' })
    }

    // generate a random temp password
    const tempPassword = Math.random().toString(36).slice(-10)
    const hash = await bcrypt.hash(tempPassword, 10)

    // create user account
    await db.query(
      "INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role, statut) VALUES (?, ?, ?, ?, 'membre', 'actif')",
      [request.nom, request.prenom, request.email, hash]
    )

    // update request status
    await db.query(
      "UPDATE demandes_adhesion SET statut = 'acceptee' WHERE id = ?",
      [id]
    )

    // Send welcome email — non-blocking (failure won't crash the response)
    try {
      await sendWelcomeEmail(request.email, request.prenom, tempPassword)
    } catch (mailErr) {
      console.error('📧 Email sending failed (non-blocking):', mailErr.message)
    }

    res.json({ message: 'Request accepted and email sent', tempPassword })
  } catch (err) {
    console.error('acceptMembershipRequest error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

// REJECT MEMBERSHIP REQUEST
export const rejectMembershipRequest = async (req, res) => {
  const { id } = req.params

  try {
    const [rows] = await db.query('SELECT * FROM demandes_adhesion WHERE id = ?', [id])

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Request not found' })
    }

    if (rows[0].statut !== 'en_attente') {
      return res.status(400).json({ message: 'Request already processed' })
    }

    await db.query(
      "UPDATE demandes_adhesion SET statut = 'rejetee' WHERE id = ?",
      [id]
    )

    res.json({ message: 'Request rejected' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// EXPORT MEMBERS
export const exportMembers = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, nom, prenom, email, role, statut FROM utilisateurs WHERE role = 'membre' ORDER BY id DESC"
    )
    res.json(rows)
  } catch (err) {
    console.error('exportMembers error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

// EXPORT EVENTS (schema has no date_fin — use date_debut only)
export const exportEvents = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, titre, categorie, lieu, date_debut, statut, description, created_at FROM evenements ORDER BY date_debut DESC'
    )
    res.json(rows)
  } catch (err) {
    console.error('exportEvents error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

// EXPORT CONTACTS
export const exportContacts = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, nom, email, sujet, message, created_at FROM contacts ORDER BY created_at DESC'
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

const toMysqlDate = (value) => {
  if (value == null || value === '') return null

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10)
  }

  const text = String(value).trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text

  const fr = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (fr) {
    const day = fr[1].padStart(2, '0')
    const month = fr[2].padStart(2, '0')
    return `${fr[3]}-${month}-${day}`
  }

  const parsed = new Date(text)
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10)
  }

  return null
}

const normalizeEventText = (value) => String(value || '').trim().toLowerCase()

const eventsMatch = (existing, titre, description) =>
  normalizeEventText(existing.titre) === normalizeEventText(titre) &&
  normalizeEventText(existing.description) === normalizeEventText(description)

// IMPORT EVENTS (bulk insert as archived)
export const importEvents = async (req, res) => {
  const { events } = req.body

  if (!Array.isArray(events) || events.length === 0) {
    return res.status(400).json({ message: 'events array is required and must not be empty' })
  }

  if (events.length > 500) {
    return res.status(400).json({ message: 'Maximum 500 rows per import' })
  }

  let inserted = 0
  let skipped = 0
  const skippedTitles = []

  try {
    for (const row of events) {
      const titre = String(row.titre || '').trim()
      const date_debut = toMysqlDate(row.date_debut)
      if (!titre || !date_debut) continue

      const categorie   = String(row.categorie || 'culture').trim() || 'culture'
      const lieu        = String(row.lieu || '').trim()
      const description = String(row.description || '').trim() || 'Imported event'

      const excelId = row.id != null && row.id !== '' ? Number(row.id) : null

      if (excelId && Number.isInteger(excelId) && excelId > 0) {
        const [existingRows] = await db.query(
          'SELECT id, titre, description FROM evenements WHERE id = ?',
          [excelId]
        )

        if (existingRows.length > 0) {
          const existing = existingRows[0]
          if (eventsMatch(existing, titre, description)) {
            skipped++
            skippedTitles.push(titre)
            continue
          }
          // Same Excel ID but different title/description → insert with a new auto ID
        }
      }

      await db.query(
        "INSERT INTO evenements (titre, categorie, lieu, date_debut, description, statut, cree_par) VALUES (?, ?, ?, ?, ?, 'archive', ?)",
        [titre.slice(0, 200), categorie, lieu, date_debut, description, req.user.id]
      )
      inserted++
    }

    if (inserted === 0 && skipped === 0) {
      return res.status(400).json({
        message: 'No valid rows imported. Each row needs Name/Title and a valid Start Date.',
        inserted: 0,
        skipped: 0,
      })
    }

    let message = ''
    if (inserted > 0) message += `${inserted} event(s) imported as archived. `
    if (skipped > 0) message += `${skipped} event(s) already exist (same ID, name and description).`

    res.status(inserted > 0 ? 201 : 200).json({
      message: message.trim(),
      inserted,
      skipped,
      skippedTitles: skippedTitles.slice(0, 20),
    })
  } catch (err) {
    console.error('importEvents error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

// UPLOAD IMAGE TO CLOUDINARY
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }
    const result = await uploadToCloudinary(req.file.buffer)
    res.json({ url: result.secure_url })
  } catch (err) {
    res.status(500).json({ message: 'Upload failed' })
  }
}