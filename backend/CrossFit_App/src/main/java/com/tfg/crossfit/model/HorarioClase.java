package com.tfg.crossfit.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.*;

@Entity
@Table(name = "horario_clase")
public class HorarioClase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dia_semana")
    private String diaSemana; // LUNES, MARTES, etc.

    private String hora;      // 09:00, 10:00, etc.

    @ManyToOne
    @JoinColumn(name = "actividad_id")
    private Actividad actividad; // CrossFit, Halterofilia, etc.

    private String tipo;      // NORMAL, ESPECIAL, CERRADO.

    @ManyToOne
    @JoinColumn(name = "coach_id")
    private Coach coach;     // Pepon, Koke, Alex.

    private String notas;

    public HorarioClase() {}

    public HorarioClase(String diaSemana, String hora, Actividad actividad, String tipo, Coach coach, String notas) {
        this.diaSemana = diaSemana;
        this.hora = hora;
        this.actividad = actividad;
        this.tipo = tipo;
        this.coach = coach;
        this.notas = notas;
    }

    // Getters y setters

    public Long getId() { return id; }

    public String getDiaSemana() { return diaSemana; }
    public void setDiaSemana(String diaSemana) { this.diaSemana = diaSemana; }

    public String getHora() { return hora; }
    public void setHora(String hora) { this.hora = hora; }

    public Actividad getActividad() { return actividad; }
    public void setActividad(Actividad actividad) { this.actividad = actividad; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public Coach getCoach() { return coach; }
    public void setCoach(Coach coach) { this.coach = coach; }

    public String getNotas() { return notas; }
    public void setNotas(String notas) { this.notas = notas; }

}