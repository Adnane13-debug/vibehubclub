-- Tracks which admin bell feed items each admin has dismissed/read

USE vibehub_db;

CREATE TABLE IF NOT EXISTS admin_feed_reads (
  admin_id   INT          NOT NULL,
  item_id    VARCHAR(64)  NOT NULL,
  read_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (admin_id, item_id),
  CONSTRAINT fk_admin_feed_reads_admin
    FOREIGN KEY (admin_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
);
