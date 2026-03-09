// this is the main file that starts the server

import express   from 'express'
import cors      from 'cors'
import dotenv    from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import publicRoutes from './routes/public.routes.js'

dotenv.config()

const app = express()

// allow frontend to talk to backend
app.use(cors())

// allow app to read JSON data
app.use(express.json())

// test route
app.get('/', (req, res) => {
  res.json({ message: 'Vibe Hub API works ✅' })
})

// auth routes
app.use('/api/auth', authRoutes)

//public routes
app.use('/api/public', publicRoutes)

// start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT} ✅`)
})