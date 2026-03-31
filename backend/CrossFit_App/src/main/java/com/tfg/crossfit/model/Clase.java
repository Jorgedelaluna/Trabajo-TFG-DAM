package com.tfg.crossfit.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "clase")
public class Clase implements Serializable {

    private static final long serialVersionUID = 1L;

    // Identificador (Id) de la clase
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Actividad a la que pertenece esta clase (CrossFit, Halterofilia, etc)
    // Relación con Actividad
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "actividad_id", nullable = false)
    private Actividad actividad;

    // Descripción opcional de la sesión concreta
    private String descripcion;

    // Fecha y hora en la que se imparte la clase
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Column(name = "fecha_hora", nullable = false)
    private LocalDateTime fechaHora;

    // Número máximo de plazas disponibles
    @Column(name = "aforo_maximo", nullable = false)
    private Integer aforoMaximo;

    // Coach que imparte la clase
    // Relacción con coach
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "coach_id", nullable = false)
    private Coach coach;

    // Inscripciones asociadas a esta clase
    @JsonIgnore
    @OneToMany(mappedBy = "clase")
    private List<Inscripcion> inscripciones;

    // Si no se establece fecha, se asigna la actual
    @PrePersist
    public void prePersist() {
        if (fechaHora == null) {
            fechaHora = LocalDateTime.now();
        }
    }
}
