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
@Table(name = "pagos")
public class Pago implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Column(name = "fecha_pago", nullable = false)
    private LocalDateTime fechaPago;

    @Column(nullable = false)
    private Double importe;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoPago tipo;

    @Column(nullable = false)
    private String metodo; // "simulado", "stripe_test", etc.

    private String notas;

    @PrePersist
    public void prePersist() {
        fechaPago = LocalDateTime.now();
    }
}
