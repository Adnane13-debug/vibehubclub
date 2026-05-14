import mysql  from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

// FIX: use a connection pool instead of a single connection
// A pool handles dropped connections automatically and supports real traffic
const pool = mysql.createPool({
  host:             process.env.DB_HOST,
  port:             process.env.DB_PORT,
  user:             process.env.DB_USER,
  password:         process.env.DB_PASSWORD,
  database:         process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit:  10  // max 10 simultaneous connections
})

pool.getConnection((err, connection) => {
  if (err) {
    console.log('DB connection failed:', err)
  } else {
    console.log('MySQL connected ✅')
    connection.release()
  }
})

// .promise() lets you use async/await instead of callbacks
export default pool.promise()