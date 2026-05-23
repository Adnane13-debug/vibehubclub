-- Run on vibehub_db (MySQL)
-- Adds featured flag for homepage / events page spotlight

USE vibehub_db;

ALTER TABLE evenements
  ADD COLUMN featured TINYINT(1) NOT NULL DEFAULT 0 AFTER statut;

-- Optional: mark one published event as featured (adjust id if needed)
-- UPDATE evenements SET featured = 1 WHERE id = 1 AND statut = 'publie';
