import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

dotenv.config()

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

try {
  const [cols] = await pool.query("SHOW COLUMNS FROM evenements LIKE 'featured'")
  console.log('featured column:', cols.length ? 'OK' : 'MISSING — run migrations/001_add_featured_to_evenements.sql')

  const [statuts] = await pool.query('SELECT DISTINCT statut FROM evenements')
  console.log('statut values:', statuts.map((r) => r.statut))

  const [rows] = await pool.query(
    "SELECT id, titre, statut, featured FROM evenements WHERE statut IN ('publie', 'publié') LIMIT 10"
  )
  console.log('published events:', rows)
} catch (err) {
  console.error(err.message)
}

await pool.end()
