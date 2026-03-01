package com.tfg.crossfit.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "wod")
public class Wod implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    private String descripcion;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(nullable = false)
    private String tipo; // AMRAP, EMOM, For Time, etc.

    @JsonIgnore
    @OneToMany(mappedBy = "wod", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WodEjercicio> ejercicios;

    @JsonIgnore
    @OneToMany(mappedBy = "wod", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Resultado> resultados;

    @ManyToOne
    @JoinColumn(name = "coach_id", nullable = false)
    private Coach coach;
}
