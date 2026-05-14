import db     from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt    from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

// REGISTER
export const register = async (req, res) => {
  const { nom, prenom, email, mot_de_passe } = req.body

  if (!nom || !prenom || !email || !mot_de_passe) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // FIX: basic input length limits
  if (nom.length > 100 || prenom.length > 100 || email.length > 255 || mot_de_passe.length > 128) {
    return res.status(400).json({ message: 'One or more fields are too long' })
  }

  try {
    const hash = await bcrypt.hash(mot_de_passe, 10)

    await db.query(
      'INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role) VALUES (?, ?, ?, ?, ?)',
      [nom, prenom, email, hash, 'visiteur']
    )

    res.status(201).json({ message: 'Account created successfully' })

  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email already used' })
    }
    res.status(500).json({ message: 'Server error' })
  }
}

// LOGIN
export const login = async (req, res) => {
  const { email, mot_de_passe } = req.body

  if (!email || !mot_de_passe) {
    return res.status(400).json({ message: 'Email and password required' })
  }

  try {
    const [results] = await db.query(
      'SELECT * FROM utilisateurs WHERE email = ?',
      [email]
    )

    // FIX: same message whether the email doesn't exist OR the password is wrong
    // This prevents attackers from knowing which emails are registered
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const user = results[0]

    if (user.statut === 'inactif') {
      return res.status(403).json({ message: 'Account is disabled' })
    }

    const match = await bcrypt.compare(mot_de_passe, user.mot_de_passe)
    if (!match) {
      // FIX: same generic message as above
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // FIX: token expires in 24h instead of 7 days
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({
      token,
      user: {
        id:     user.id,
        nom:    user.nom,
        prenom: user.prenom,
        email:  user.email,
        role:   user.role
      }
    })

  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// GET ME
export const getMe = async (req, res) => {
  try {
    const [results] = await db.query(
      'SELECT id, nom, prenom, email, role, statut, photo, created_at FROM utilisateurs WHERE id = ?',
      [req.user.id]
    )

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(results[0])
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// LOGOUT — frontend deletes the token on their side
export const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' })
}