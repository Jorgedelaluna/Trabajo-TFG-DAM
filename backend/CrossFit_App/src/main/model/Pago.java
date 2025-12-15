package com.tfg.crossfit.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.io.Serializable;

@Data
@Entity
@Table(name = "pagos")
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    private LocalDateTime fechaPago = LocalDateTime.now();

    private Double importe;

    @Enumerated(EnumType.STRING)
    private TipoPago tipo;

    private String metodo; // "simulado", "stripe_test", etc.

    private String notas;
}
