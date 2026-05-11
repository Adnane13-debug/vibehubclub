import db from './config/db.js'

const query = "ALTER TABLE utilisateurs MODIFY COLUMN role VARCHAR(20) NOT NULL DEFAULT 'visiteur';";

db.query(query, (err, result) => {
  if (err) {
    console.error('Error executing query:', err);
  } else {
    console.log('Query executed successfully:', result);
  }
  process.exit();
});
