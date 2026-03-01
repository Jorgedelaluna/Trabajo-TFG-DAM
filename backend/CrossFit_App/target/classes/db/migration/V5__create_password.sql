-- ============================================
-- V5: Añadir columna password a la tabla usuario
-- ============================================
SET @col_exists := (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'usuarios'
    AND COLUMN_NAME = 'password_hash'
);

SET @sql := IF(
  @col_exists = 0,
  'ALTER TABLE usuarios ADD COLUMN password_hash VARCHAR(255) NOT NULL DEFAULT '''' AFTER email',
  'SELECT 1'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
