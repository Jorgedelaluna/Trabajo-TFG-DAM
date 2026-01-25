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
@Table(name = "wods")
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

    @JsonIgnore
    @OneToMany(mappedBy = "wod", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WodEjercicio> ejercicios;

    @JsonIgnore
    @OneToMany(mappedBy = "wod", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Resultado> resultados;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "coach_id")
    private Coach coach;
}
