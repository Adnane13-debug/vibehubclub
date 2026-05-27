/**
 * Creates admin_feed_reads table if missing.
 * Run: node scripts/apply-admin-feed-reads-migration.js
 */
import dotenv from 'dotenv'
import mysql from 'mysql2/promise'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

dotenv.config()

const __dirname = dirname(fileURLToPath(import.meta.url))

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
})

try {
  const sql = readFileSync(
    join(__dirname, '../migrations/002_admin_feed_reads.sql'),
    'utf8'
  )
  await pool.query(sql)
  console.log('admin_feed_reads migration applied')
} catch (err) {
  console.error('Migration failed:', err.message)
  process.exitCode = 1
}

await pool.end()
