-- Add created_at to participations for admin feed (72h window)
ALTER TABLE participations
  ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
