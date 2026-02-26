CREATE DATABASE crossfit_manager;
USE crossfit_manager;

-- Tabla Usuario

CREATE TABLE usuario (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  rol VARCHAR(50) NOT NULL,
  estado_cuota VARCHAR(50) NOT NULL,
  fecha_alta DATETIME NOT NULL
);

-- Tabla Coach

CREATE TABLE coach (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(120) UNIQUE,
  telefono VARCHAR(20),
  descripcion TEXT,
  certificaciones TEXT
);

-- Tabla Clase

CREATE TABLE clase (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  descripcion TEXT,
  fecha_hora DATETIME NOT NULL,
  aforo_maximo INT NOT NULL,
  coach_id BIGINT NOT NULL,
  CONSTRAINT fk_clase_coach FOREIGN KEY (coach_id) REFERENCES coach(id)
);

-- Tabla Inscripcion

CREATE TABLE inscripcion (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  usuario_id BIGINT NOT NULL,
  clase_id BIGINT NOT NULL,
  fecha_inscripcion DATETIME NOT NULL,
  estado VARCHAR(50) NOT NULL,
  CONSTRAINT fk_inscripcion_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  CONSTRAINT fk_inscripcion_clase FOREIGN KEY (clase_id) REFERENCES clase(id)
);

-- Tabla Pago

CREATE TABLE pago (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  usuario_id BIGINT NOT NULL,
  fecha_pago DATETIME NOT NULL,
  importe DOUBLE NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  metodo VARCHAR(50) NOT NULL,
  notas TEXT,
  CONSTRAINT fk_pago_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

-- Tabla Ejercicio

CREATE TABLE ejercicio (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  tipo VARCHAR(50)
);

-- Tabla Wod

CREATE TABLE wod (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  descripcion TEXT,
  fecha DATE NOT NULL,
  tipo VARCHAR(50),
  coach_id BIGINT NOT NULL,
  CONSTRAINT fk_wod_coach FOREIGN KEY (coach_id) REFERENCES coach(id)
);

-- Tabla Wod_Ejercicio

CREATE TABLE wod_ejercicio (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  wod_id BIGINT NOT NULL,
  ejercicio_id BIGINT NOT NULL,
  repeticiones INT,
  peso DOUBLE,
  orden INT,
  CONSTRAINT fk_wod_ejercicio_wod FOREIGN KEY (wod_id) REFERENCES wod(id),
  CONSTRAINT fk_wod_ejercicio_ejercicio FOREIGN KEY (ejercicio_id) REFERENCES ejercicio(id)
);

-- Tabla Resultado

CREATE TABLE resultado (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  usuario_id BIGINT NOT NULL,
  wod_id BIGINT NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  valor DOUBLE,
  tiempo_final DOUBLE,
  rondas INT,
  peso_usado DOUBLE,
  fecha_registro DATETIME NOT NULL,
  CONSTRAINT fk_resultado_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  CONSTRAINT fk_resultado_wod FOREIGN KEY (wod_id) REFERENCES wod(id)
);

-- Tabla Pr_Usuario

CREATE TABLE pr_usuario (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  usuario_id BIGINT NOT NULL,
  ejercicio_id BIGINT NOT NULL,
  valor DOUBLE NOT NULL,
  fecha DATE NOT NULL,
  CONSTRAINT fk_pr_usuario_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  CONSTRAINT fk_pr_usuario_ejercicio FOREIGN KEY (ejercicio_id) REFERENCES ejercicio(id)
);

-- Tabla Estadistica

CREATE TABLE estadistica (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL UNIQUE,
    clases_reservadas INT NOT NULL DEFAULT 0,
    clases_asistidas INT NOT NULL DEFAULT 0,
    clases_canceladas INT NOT NULL DEFAULT 0,
    pagos_realizados INT NOT NULL DEFAULT 0,
    total_pagado DOUBLE NOT NULL DEFAULT 0,
    ultima_clase DATETIME,
    ultimo_pago DATETIME,
    actualizado_en DATETIME,
    CONSTRAINT fk_estadistica_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id)
    );