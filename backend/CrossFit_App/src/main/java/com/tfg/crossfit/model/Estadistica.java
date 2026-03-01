package com.tfg.crossfit.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

import java.io.Serializable;

/**
 * Entidad que representa las estadísticas acumuladas de un usuario dentro del
 * sistema. Incluye información sobre clases realizadas, cancelaciones, pagos
 * efectuados, total abonado y fechas relevantes para el seguimiento de
 * actividad.
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "estadistica")
public class Estadistica implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "clases_reservadas", nullable = false)
    private Integer clasesReservadas = 0;

    @Column(name = "clases_asistidas", nullable = false)
    private Integer clasesAsistidas = 0;

    @Column(name = "pagos_realizados", nullable = false)
    private Integer pagosRealizados = 0;

    @Column(name = "total_pagado", nullable = false)
    private Double totalPagado = 0.0;

    @Column(name = "clases_canceladas")
    private Integer clasesCanceladas = 0;

    @Column(name = "ultima_clase")
    private Instant ultimaClase;

    @Column(name = "ultimo_pago")
    private Instant ultimoPago;

    @Column(name = "actualizado_en")
    private Instant actualizadoEn;

    @PrePersist
    void onCreate() {
        if (actualizadoEn == null) {
            actualizadoEn = Instant.now();
        }
    }

    @PreUpdate
    void onUpdate() {
        actualizadoEn = Instant.now();
    }

}
