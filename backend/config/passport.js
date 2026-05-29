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

      // Not registered — no DB insert; redirect to membership application with prefill
      return done(null, { _applyMode: true, nom, prenom, email })
    } catch (err) {
      return done(err, null)
    }
  }
))

export default passport
