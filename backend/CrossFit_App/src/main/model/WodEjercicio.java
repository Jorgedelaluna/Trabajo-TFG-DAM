package com.tfg.crossfit.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "wod_ejercicios")
public class WodEjercicio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(name = "wod_id", nullable = false)
    private Wod wod;

    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(name = "ejercicio_id", nullable = false)
    private Ejercicio ejercicio;

    private Integer repeticiones;

    private Double peso;

    private Integer orden;
}
