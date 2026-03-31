CREATE DATABASE crossfit_manager;
USE crossfit_manager;

-- Tabla Usuario

CREATE TABLE usuario (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  rol VARCHAR(50) NOT NULL DEFAULT 'USER',
  estado_cuota VARCHAR(50) NOT NULL DEFAULT 'INACTIVA',
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

-- Tabla Actividad

CREATE TABLE actividad (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT
);

-- Tabla Clase

CREATE TABLE clase (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  actividad_id BIGINT NOT NULL,
  descripcion TEXT,
  fecha_hora DATETIME NOT NULL,
  aforo_maximo INT NOT NULL,
  coach_id BIGINT NOT NULL,
  CONSTRAINT fk_clase_actividad FOREIGN KEY (actividad_id) REFERENCES actividad(id),
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
    
-- Tabla Horarios_Clase (patrón semanal)

CREATE TABLE horario_clase (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  dia_semana VARCHAR(20) NOT NULL,                         -- LUNES, MARTES, etc.
  hora TIME NOT NULL,                                      -- 09:00, 10:00, etc.
  tipo ENUM('NORMAL', 'ESPECIAL', 'CERRADO') NOT NULL,     -- NORMAL, ESPECIAL, CERRADO.
  notas TEXT,
  actividad_id BIGINT NULL,
  coach_id BIGINT NULL,
  CONSTRAINT fk_horario_clase_actividad FOREIGN KEY (actividad_id) REFERENCES actividad(id),
  CONSTRAINT fk_horario_clase_coach FOREIGN KEY (coach_id) REFERENCES coach(id)
);


-----------------------------------
-- DATOS REALES PARA LOS INSERTS
-----------------------------------
-- Lista de Usuarios
INSERT INTO usuario (id, nombre, email, password_hash, rol, estado_cuota, fecha_alta ) VALUES
(1, 'Admin', 'admin@crossfitmanager.com', '$2a$12$4Tz/gyKZS6.D1FoiEpPPS.is5nB0Ljf4mQ42mPtR25e0RDSlMp/Li', 'ADMIN', 'ACTIVA', NOW()), -- id 1 Admin (Prueba1234)
(2, 'Koke', 'koke@crossfitmanager.com', '$2a$12$otnDjybLTavRAdj./GYbHOj8pI2O4nhloFzQcznyZe7dnGCZs2Ihy', 'COACH', 'ACTIVA', NOW()),  -- id 2 Coach (Prueba1234)
(3, 'Jorge', 'jorge@unir.com', '$2a$12$n83T1OSuG2VxRjBzbbHTh.zUMEYIVhCltzahipK12P5DdTFbPTzh.', 'USER', 'ACTIVA', NOW()); -- id 3 User (Prueba1234)
(4, 'Rober', 'rober@unir.com', '$2a$12$b9Tv.9NQcC1m1NFwOb.O9ORPEwloGToWaaWRQvs2O0t1rQV34oyli', 'USER', 'ACTIVA', NOW()); -- id 4 User (Prueba1234)
(5, 'David', 'david@unir.com', '$2a$12$PbkWsDdAzDwJg/5nRRWyyucAcCbnSRA0nSv24gnnPe8OjKXt8lDRu', 'USER', 'ACTIVA', NOW()); -- id 5 User (Prueba1234)


-- Listado de Coachs
INSERT INTO coach (nombre, email, telefono, descripcion, certificaciones) VALUES
('Pepon', 'pepon@crossfitmanager.com', '600000000', 'Coach de CrossFit', 'CF-L1'),  -- id 1 Pepon
('Koke', 'koke@crossfitmanager.com', '600000001', 'Coach de CrossFit', 'CF-L1'),    -- id 2 Koke
('Alex', 'alex@crossfitmanager.com', '600000002', 'Coach de CrossFit', 'CF-L1');    -- id 3 Alex


-- Listado de Actividades
INSERT INTO actividad (nombre, descripcion) VALUES
('CrossFit', NULL),                 -- id 1 CrossFit
('Halterofilia', NULL),             -- id 2 Halterofilia
('Endurance', NULL),                -- id 3 Endurance
('Meditación & Mobility', NULL),    -- id 4 Meditación & Mobility
('Open Box', NULL),                 -- id 5 Open Box
('Gymnastics', NULL);               -- id 6 Gymnastics


-- Horario Lunes
INSERT INTO horario_clase (dia_semana, hora, tipo, actividad_id, coach_id) VALUES
('LUNES', '09:00', 'NORMAL', 1, 2),  -- CrossFit con Koke
('LUNES', '10:00', 'NORMAL', 2, 2),  -- Halterofilia con Koke
('LUNES', '11:00', 'NORMAL', 3, 2),  -- Endurance con Koke
('LUNES', '12:00', 'NORMAL', 4, 2),  -- Meditación & Mobility con Koke
('LUNES', '13:00', 'NORMAL', 5, 2),  -- Open Box con Koke
('LUNES', '14:00', 'NORMAL', 6, 1),  -- Gymnastics con Pepon
('LUNES', '15:00', 'NORMAL', 1, 1),  -- CrossFit con Pepon
('LUNES', '16:00', 'NORMAL', 3, 2),  -- Endurance con Koke
('LUNES', '17:00', 'NORMAL', 2, 3),  -- Halterofilia con Alex
('LUNES', '18:00', 'NORMAL', 1, 3),  -- CrossFit con Alex
('LUNES', '19:00', 'NORMAL', 6, 3),  -- Gymnastics con Alex
('LUNES', '20:00', 'NORMAL', 5, 3),  -- Open Box con Alex
('LUNES', '21:00', 'NORMAL', 1, 3);  -- CrossFit con Alex

-- Horario Martes
INSERT INTO horario_clase (dia_semana, hora, tipo, actividad_id, coach_id) VALUES
('MARTES', '09:00', 'NORMAL', 1, 2),  -- CrossFit con Koke
('MARTES', '10:00', 'NORMAL', 2, 2),  -- Halterofilia con Koke
('MARTES', '11:00', 'NORMAL', 3, 2),  -- Endurance con Koke
('MARTES', '12:00', 'NORMAL', 4, 2),  -- Meditación & Mobility con Koke
('MARTES', '13:00', 'NORMAL', 5, 2),  -- Open Box con Koke
('MARTES', '14:00', 'NORMAL', 6, 1),  -- Gymnastics con Pepon
('MARTES', '15:00', 'NORMAL', 1, 1),  -- CrossFit con Pepon
('MARTES', '16:00', 'NORMAL', 3, 2),  -- Endurance con Koke
('MARTES', '17:00', 'NORMAL', 2, 3),  -- Halterofilia con Alex
('MARTES', '18:00', 'NORMAL', 1, 3),  -- CrossFit con Alex
('MARTES', '19:00', 'NORMAL', 6, 3),  -- Gymnastics con Alex
('MARTES', '20:00', 'NORMAL', 5, 3),  -- Open Box con Alex
('MARTES', '21:00', 'NORMAL', 1, 3);  -- CrossFit con Alex

-- Horario Miércoles
INSERT INTO horario_clase (dia_semana, hora, tipo, actividad_id, coach_id) VALUES
('MIERCOLES', '09:00', 'NORMAL', 1, 2),  -- CrossFit con Koke
('MIERCOLES', '10:00', 'NORMAL', 2, 2),  -- Halterofilia con Koke
('MIERCOLES', '11:00', 'NORMAL', 3, 2),  -- Endurance con Koke
('MIERCOLES', '12:00', 'NORMAL', 4, 2),  -- Meditación & Mobility con Koke
('MIERCOLES', '13:00', 'NORMAL', 5, 2),  -- Open Box con Koke
('MIERCOLES', '14:00', 'NORMAL', 6, 1),  -- Gymnastics con Pepon
('MIERCOLES', '15:00', 'NORMAL', 1, 1),  -- CrossFit con Pepon
('MIERCOLES', '16:00', 'NORMAL', 3, 2),  -- Endurance con Koke
('MIERCOLES', '17:00', 'NORMAL', 2, 3),  -- Halterofilia con Alex
('MIERCOLES', '18:00', 'NORMAL', 1, 3),  -- CrossFit con Alex
('MIERCOLES', '19:00', 'NORMAL', 6, 3),  -- Gymnastics con Alex
('MIERCOLES', '20:00', 'NORMAL', 5, 3),  -- Open Box con Alex
('MIERCOLES', '21:00', 'NORMAL', 1, 3);  -- CrossFit con Alex

-- Horario Jueves
INSERT INTO horario_clase (dia_semana, hora, tipo, actividad_id, coach_id) VALUES
('JUEVES', '09:00', 'NORMAL', 1, 2),  -- CrossFit con Koke
('JUEVES', '10:00', 'NORMAL', 2, 2),  -- Halterofilia con Koke
('JUEVES', '11:00', 'NORMAL', 3, 2),  -- Endurance con Koke
('JUEVES', '12:00', 'NORMAL', 4, 2),  -- Meditación & Mobility con Koke
('JUEVES', '13:00', 'NORMAL', 5, 2),  -- Open Box con Koke
('JUEVES', '14:00', 'NORMAL', 6, 1),  -- Gymnastics con Pepon
('JUEVES', '15:00', 'NORMAL', 1, 1),  -- CrossFit con Pepon
('JUEVES', '16:00', 'NORMAL', 3, 2),  -- Endurance con Koke
('JUEVES', '17:00', 'NORMAL', 2, 3),  -- Halterofilia con Alex
('JUEVES', '18:00', 'NORMAL', 1, 3),  -- CrossFit con Alex
('JUEVES', '19:00', 'NORMAL', 6, 3),  -- Gymnastics con Alex
('JUEVES', '20:00', 'NORMAL', 5, 3),  -- Open Box con Alex
('JUEVES', '21:00', 'NORMAL', 1, 3);  -- CrossFit con Alex

-- Horario Viernes
INSERT INTO horario_clase (dia_semana, hora, tipo, actividad_id, coach_id) VALUES
('VIERNES', '09:00', 'NORMAL', 1, 2),  -- CrossFit con Koke
('VIERNES', '10:00', 'NORMAL', 2, 2),  -- Halterofilia con Koke
('VIERNES', '11:00', 'NORMAL', 3, 2),  -- Endurance con Koke
('VIERNES', '12:00', 'NORMAL', 4, 2),  -- Meditación & Mobility con Koke
('VIERNES', '13:00', 'NORMAL', 5, 2),  -- Open Box con Koke
('VIERNES', '14:00', 'NORMAL', 6, 1),  -- Gymnastics con Pepon
('VIERNES', '15:00', 'NORMAL', 1, 1),  -- CrossFit con Pepon
('VIERNES', '16:00', 'NORMAL', 3, 2),  -- Endurance con Koke
('VIERNES', '17:00', 'NORMAL', 2, 3),  -- Halterofilia con Alex
('VIERNES', '18:00', 'NORMAL', 1, 3),  -- CrossFit con Alex
('VIERNES', '19:00', 'NORMAL', 6, 3),  -- Gymnastics con Alex
('VIERNES', '20:00', 'NORMAL', 5, 3),  -- Open Box con Alex
('VIERNES', '21:00', 'NORMAL', 1, 3);  -- CrossFit con Alex

-- Horario Sábado
INSERT INTO horario_clase (dia_semana, hora, tipo, actividad_id, coach_id) VALUES
('SABADO', '10:00', 'ESPECIAL', 1, 3), -- CrossFit con Alex
('SABADO', '11:00', 'ESPECIAL', 6, 3), -- Gymnastics con Alex
('SABADO', '12:00', 'ESPECIAL', 5, 3), -- Open Box con Alex
('SABADO', '13:00', 'ESPECIAL', 1, 3); -- CrossFit con Alex

-- Domingo cerrado
INSERT INTO horario_clase (dia_semana, hora, tipo, notas, actividad_id, coach_id) VALUES
('DOMINGO', '00:00', 'CERRADO', 'Día de descanso', NULL, NULL);

