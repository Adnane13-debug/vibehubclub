import db from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

// REGISTER
// creates a new account

export const register = async (req, res) => {

  // get data from request body
  const { nom, prenom, email, mot_de_passe } = req.body

  // check if all fields are filled
  if (!nom || !prenom || !email || !mot_de_passe) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  try {
    // hash the password before saving
    const hash = await bcrypt.hash(mot_de_passe, 10)

    // save user in database
    db.query(
      'INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role) VALUES (?, ?, ?, ?, ?)',
      [nom, prenom, email, hash, 'visiteur'],
      (err, result) => {
        if (err) {
          // if email already exists
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Email already used' })
          }
          return res.status(500).json({ message: 'Server error' })
        }
        // success
        res.status(201).json({ message: 'Account created successfully' })
      }
    )
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// LOGIN
// checks email and password
// returns a token if correct

export const login = (req, res) => {

  const { email, mot_de_passe } = req.body

  // check if fields are filled
  if (!email || !mot_de_passe) {
    return res.status(400).json({ message: 'Email and password required' })
  }

  // find user by email
  db.query(
    'SELECT * FROM utilisateurs WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' })

      // if no user found
      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' })
      }

      const user = results[0]

      // if account is disabled
      if (user.statut === 'inactif') {
        return res.status(403).json({ message: 'Account is disabled' })
      }

      // check if password is correct
      const match = await bcrypt.compare(mot_de_passe, user.mot_de_passe)
      if (!match) {
        return res.status(401).json({ message: 'Wrong password' })
      }

      // create a token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      )

      // send token + user info
      res.json({
        token,
        user: {
          id: user.id,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          role: user.role
        }
      })
    }
  )
}

// GET ME
// returns logged in user info
// needs a valid token

export const getMe = (req, res) => {

  // req.user.id comes from the token
  db.query(
    'SELECT id, nom, prenom, email, role, statut, photo, created_at FROM utilisateurs WHERE id = ?',
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' })

      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' })
      }

      // send user info
      res.json(results[0])
    }
  )
}

// LOGOUT
// just tell frontend to delete
// the token on their side

export const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' })
}