package com.tfg.crossfit.dto;

import com.tfg.crossfit.model.TipoPago;
import lombok.Data;

@Data
public class PagoCrearDTO {
    private Long usuarioId;
    private Double importe;
    private TipoPago tipo;
    private String metodo;
    private String notas;
}
