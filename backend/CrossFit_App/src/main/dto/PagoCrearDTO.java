package com.tfg.crossfit.dto;

import com.tfg.crossfit.model.TipoPago;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class PagoCrearDTO {

    @NotNull(message = "El usuario es obligatorio")
    private Long usuarioId;

    @NotNull(message = "El importe es obligatorio")
    @Positive(message = "El importe debe ser mayor que cero")
    private Double importe;

    @NotNull(message = "El tipo de pago es obligatorio")
    private TipoPago tipo;

    @NotBlank(message = "El método de pago es obligatorio")
    private String metodo;

    private String notas; // opcional
}

