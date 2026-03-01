-- ============================================
-- V6: Añadir contraseñas iniciales a usuarios existentes
-- ============================================

UPDATE usuarios
SET password_hash = '$2a$10$J8c3sV10qF1.3gW8p2PZ2e5m7nZcI5yS1gG0mA2yqVx7Pp2c0u8qK'
WHERE email IN ('roberto@example.com', 'laura@example.com');

UPDATE usuarios
SET password_hash = '$2a$10$k7m0Bf3n7y0mAqN7c5xWqO1v2vXh9vE1hG9bQwQ2b3oZbq4xj0W7i'
WHERE email = 'admin@example.com';