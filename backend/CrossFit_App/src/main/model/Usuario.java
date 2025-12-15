package com.tfg.crossfit.model;

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
@Table(name = "usuarios")
public class Usuario implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rol rol = Rol.USER;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_cuota", nullable = false)
    private EstadoCuota estadoCuota = EstadoCuota.INACTIVA;

    @Column(name = "fecha_alta", nullable = false)
    private LocalDateTime fechaAlta;

    @PrePersist
    public void prePersist() {
        this.fechaAlta = LocalDateTime.now();
    }
}

public enum Rol { USER, ADMIN }
public enum EstadoCuota { ACTIVA, INACTIVA }



