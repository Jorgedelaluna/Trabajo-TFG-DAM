package com.tfg.crossfit.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "resultado")
public class Resultado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(name = "wod_id", nullable = false)
    private Wod wod;

    @Column(name = "tipo", nullable = false)
    private String tipoResultado; // tiempo, reps, rounds, peso

    @Column(nullable = false)
    private Double valor; // segundos, kg, reps, etc.

    @Column(name = "tiempo_final")
    private Double tiempoFinal; // tiempo total en segundos (For Time)

    @Column(name = "rondas")
    private Integer rondas; // rondas completadas (AMRAP)

    @Column(name = "peso_usado")
    private Double pesoUsado; // peso utilizado

    @Column(name = "fecha_registro", nullable = false)
    private LocalDateTime fechaRegistro;

    @PrePersist
    public void prePersist() {
        this.fechaRegistro = LocalDateTime.now();
    }
}
