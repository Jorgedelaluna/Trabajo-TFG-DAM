-- ============================================
-- V1: CREAR TABLAS (ESQUEMA PROYECTO FINAL)
-- ============================================

-- ============================================
-- TABLA: usuarios
-- (Entidad: com.tfg.crossfit.model.Usuario)
-- ============================================
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    estado_cuota ENUM('AL_DIA', 'PENDIENTE', 'IMPAGADO') NOT NULL DEFAULT 'PENDIENTE',
    fecha_alta TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLA: coaches
-- (Entidad: com.tfg.crossfit.model.Coach)
-- ============================================
CREATE TABLE IF NOT EXISTS coaches (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLA: clases
-- (Entidad: com.tfg.crossfit.model.Clase)
-- ============================================
CREATE TABLE IF NOT EXISTS clases (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_hora TIMESTAMP NOT NULL,
    aforo_maximo INT NOT NULL,
    coach_id BIGINT NOT NULL,
    INDEX idx_clases_coach_id (coach_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLA: inscripciones
-- (Entidad: com.tfg.crossfit.model.Inscripcion)
-- ============================================
CREATE TABLE IF NOT EXISTS inscripciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    clase_id BIGINT NOT NULL,
    estado ENUM('CONFIRMADA', 'CANCELADA', 'LISTA_ESPERA') NOT NULL DEFAULT 'CONFIRMADA',
    fecha_inscripcion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_inscripciones_usuario_id (usuario_id),
    INDEX idx_inscripciones_clase_id (clase_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLA: pagos
-- (Entidad: com.tfg.crossfit.model.Pago)
-- ============================================
CREATE TABLE IF NOT EXISTS pagos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    cantidad DOUBLE NOT NULL,
    fecha_pago TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tipo_pago ENUM('MENSUALIDAD', 'BONO', 'CLASE_SUELTA') NOT NULL,
    INDEX idx_pagos_usuario_id (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLA: estadisticas
-- (Tu entidad FINAL: com.tfg.crossfit.model.Estadistica)
-- ============================================
CREATE TABLE IF NOT EXISTS estadisticas (
    id_estadistica BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    clases_reservadas INT NOT NULL DEFAULT 0,
    clases_asistidas INT NOT NULL DEFAULT 0,
    pagos_realizados INT NOT NULL DEFAULT 0,
    total_pagado DOUBLE NOT NULL DEFAULT 0.0,
    UNIQUE KEY uq_estadisticas_usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
