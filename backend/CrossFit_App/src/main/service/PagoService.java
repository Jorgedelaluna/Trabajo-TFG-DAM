package com.tfg.crossfit.service;

import com.tfg.crossfit.model.Pago;
import com.tfg.crossfit.model.Usuario;
import com.tfg.crossfit.repository.PagoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PagoService {

    private final PagoRepository pagoRepository;

    public PagoService(PagoRepository pagoRepository) {
        this.pagoRepository = pagoRepository;
    }

    public Pago registrarPago(Pago pago) {
        return pagoRepository.save(pago);
    }

    public List<Pago> listarPagosPorUsuario(Usuario usuario) {
        return pagoRepository.findByUsuario(usuario);
    }

    public List<Pago> listarTodos() {
        return pagoRepository.findAll();
    }
}
