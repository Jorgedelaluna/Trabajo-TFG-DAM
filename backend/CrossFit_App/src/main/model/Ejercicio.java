package com.tfg.crossfit.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ejercicios")
public class Ejercicio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    private String descripcion;

    private String tipo; // fuerza, gimnástico, cardio, etc.

    @JsonIgnore
    @OneToMany(mappedBy = "ejercicio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WodEjercicio> wodEjercicios;

    @JsonIgnore
    @OneToMany(mappedBy = "ejercicio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PrUsuario> prs;
}
