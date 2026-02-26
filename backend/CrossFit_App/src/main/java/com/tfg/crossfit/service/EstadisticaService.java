package com.tfg.crossfit.service;

import com.tfg.crossfit.model.Estadistica;
import com.tfg.crossfit.model.Usuario;
import com.tfg.crossfit.repository.EstadisticaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class EstadisticaService {

    private final EstadisticaRepository estadisticaRepository;

    // -- Obtener o crear estadísticas del usuario
    private Estadistica getOrCreate(Usuario usuario) {
        return estadisticaRepository.findByUsuario_Id(usuario.getId())
                .orElseGet(() -> {
                    Estadistica nueva = new Estadistica();
                    nueva.setUsuario(usuario);
                    return estadisticaRepository.save(nueva);
                });
    }

    // -- Cuando el usuario reserva una clase
    public void incrementarReservas(Usuario usuario) {
        Estadistica est = getOrCreate(usuario);
        est.setClasesReservadas(est.getClasesReservadas() + 1);
        estadisticaRepository.save(est);
    }

    // -- Cuando el usuario asiste a una clase
    public void incrementarAsistencias(Usuario usuario) {
        Estadistica est = getOrCreate(usuario);
        est.setClasesAsistidas(est.getClasesAsistidas() + 1);
        est.setUltimaClase(Instant.now());
        estadisticaRepository.save(est);
    }

    // -- Cuando el usuario cancela una clase
    public void incrementarCancelaciones(Usuario usuario) {
        Estadistica est = getOrCreate(usuario);
        est.setClasesCanceladas(est.getClasesCanceladas() + 1);
        estadisticaRepository.save(est);
    }

    // -- Cuando el usuario realiza un pago
    public void registrarPago(Usuario usuario, Double importe) {
        Estadistica est = getOrCreate(usuario);
        est.setPagosRealizados(est.getPagosRealizados() + 1);
        est.setTotalPagado(est.getTotalPagado() + importe);
        est.setUltimoPago(Instant.now());
        estadisticaRepository.save(est);
    }
}
