

import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

// we create the connection using our .env values
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

// we test if the connection works
db.connect((err) => {
  if (err) {
    console.log('DB connection failed:', err)
  } else {
    console.log('MySQL connected ✅')
  }
})

export default db