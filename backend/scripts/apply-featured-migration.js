/**
 * Adds evenements.featured if missing and flags the latest published event.
 * Run: node scripts/apply-featured-migration.js
 */
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
  if (cols.length === 0) {
    await pool.query(
      'ALTER TABLE evenements ADD COLUMN featured TINYINT(1) NOT NULL DEFAULT 0 AFTER statut'
    )
    console.log('Added column evenements.featured')
  } else {
    console.log('Column evenements.featured already exists')
  }

  await pool.query('UPDATE evenements SET featured = 0')
  const [result] = await pool.query(
    `UPDATE evenements SET featured = 1
     WHERE statut IN ('publie', 'publié')
     ORDER BY date_debut DESC
     LIMIT 1`
  )
  console.log('Featured latest published event, rows affected:', result.affectedRows)

  const [featured] = await pool.query(
    "SELECT id, titre, statut, featured FROM evenements WHERE featured = 1"
  )
  console.log('Current featured:', featured)
} catch (err) {
  console.error('Migration failed:', err.message)
  process.exitCode = 1
}

await pool.end()
