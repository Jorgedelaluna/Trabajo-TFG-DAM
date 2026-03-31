package com.tfg.crossfit.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "actividad")
public class Actividad implements Serializable {

    private static final long serialVersionUID = 1L;

    // Identificador (Id) de la actividad
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nombre de la actividad (CrossFit, Halterofilia, etc.)
    @Column(nullable = false)
    private String nombre;

    // Descripción opcional
    private String descripcion;

    // Clases asociadas a esta actividad
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "actividad")
    private List<Clase> clases;
}
