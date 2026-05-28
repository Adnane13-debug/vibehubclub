import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import db from './db.js'
import dotenv from 'dotenv'
dotenv.config()

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value
      const nom = profile.name.familyName || ''
      const prenom = profile.name.givenName || ''

      const [rows] = await db.query(
        'SELECT * FROM utilisateurs WHERE email = ?',
        [email]
      )

      if (rows.length > 0) {
        return done(null, rows[0])
      }

      // Only auto-create user if mode is NOT 'apply'
      // For apply mode, we don't create — just pass profile data
      if (req.query.state && req.query.state.startsWith('apply')) {
        return done(null, { _applyMode: true, nom, prenom, email })
      }

      // Auto-create for login mode (new Google user becomes visiteur)
      await db.query(
        'INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role) VALUES (?, ?, ?, ?, ?)',
        [nom, prenom, email, null, 'visiteur']
      )
      const [newRows] = await db.query('SELECT * FROM utilisateurs WHERE email = ?', [email])
      return done(null, newRows[0])
    } catch (err) {
      return done(err, null)
    }
  }
))

export default passport
