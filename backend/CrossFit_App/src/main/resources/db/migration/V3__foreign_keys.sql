-- ============================================
-- V3: AÑADIR CLAVES FORÁNEAS (PROYECTO FINAL)
-- ============================================

-- clases.coach_id → coaches.id
ALTER TABLE clases
ADD CONSTRAINT fk_clases_coach
    FOREIGN KEY (coach_id) REFERENCES coaches(id);

-- inscripciones.usuario_id → usuarios.id
-- inscripciones.clase_id → clases.id
ALTER TABLE inscripciones
ADD CONSTRAINT fk_inscripciones_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
ADD CONSTRAINT fk_inscripciones_clase
    FOREIGN KEY (clase_id) REFERENCES clases(id);

-- pagos.usuario_id → usuarios.id
ALTER TABLE pagos
ADD CONSTRAINT fk_pagos_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id);

-- estadisticas.usuario_id → usuarios.id
ALTER TABLE estadisticas
ADD CONSTRAINT fk_estadisticas_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id);
