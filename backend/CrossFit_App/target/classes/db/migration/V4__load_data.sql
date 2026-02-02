-- ============================================
-- password123
-- admin123
-- ============================================

-- ============================================
-- V4: CARGA DE DATOS DE PRUEBA (PROYECTO FINAL)
-- ============================================

-- Coaches
INSERT INTO coaches (nombre, email)
VALUES
('Laura Coach', 'laura.coach@example.com'),
('Roberto Coach', 'roberto.coach@example.com');

INSERT INTO usuarios (nombre, email, password_hash, rol, estado_cuota, fecha_alta)
VALUES
('Roberto', 'roberto@example.com', '$2a$10$J8c3sV10qF1.3gW8p2PZ2e5m7nZcI5yS1gG0mA2yqVx7Pp2c0u8qK', 'USER', 'AL_DIA', NOW()),
('Laura',   'laura@example.com',   '$2a$10$J8c3sV10qF1.3gW8p2PZ2e5m7nZcI5yS1gG0mA2yqVx7Pp2c0u8qK', 'USER', 'PENDIENTE', NOW()),
('Admin',   'admin@example.com',   '$2a$10$k7m0Bf3n7y0mAqN7c5xWqO1v2vXh9vE1hG9bQwQ2b3oZbq4xj0W7i', 'ADMIN', 'AL_DIA', NOW());

-- Clases
INSERT INTO clases (nombre, descripcion, fecha_hora, aforo_maximo, coach_id)
VALUES
('CrossFit - Alta Intensidad', 'Clase intensa de CrossFit', NOW(), 20, 1),
('Mobility', 'Movilidad y estiramientos', DATE_ADD(NOW(), INTERVAL 2 HOUR), 15, 2);

-- Inscripciones
INSERT INTO inscripciones (usuario_id, clase_id, estado, fecha_inscripcion)
VALUES
(1, 1, 'CONFIRMADA', NOW()),
(1, 2, 'LISTA_ESPERA', NOW()),
(2, 1, 'CANCELADA', NOW());

-- Pagos
INSERT INTO pagos (usuario_id, cantidad, fecha_pago, tipo_pago)
VALUES
(1, 25.00, NOW(), 'CLASE_SUELTA'),
(1, 40.00, NOW(), 'BONO');

-- Estadísticas (tu tabla FINAL)
INSERT INTO estadisticas (usuario_id, clases_reservadas, clases_asistidas, pagos_realizados, total_pagado)
VALUES
(1, 2, 1, 2, 65.00),
(2, 1, 0, 0, 0.00);


