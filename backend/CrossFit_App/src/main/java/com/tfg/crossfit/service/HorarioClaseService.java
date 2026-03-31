package com.tfg.crossfit.service;


import com.tfg.crossfit.model.HorarioClase;
import com.tfg.crossfit.repository.HorarioClaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HorarioClaseService {

    @Autowired
    private HorarioClaseRepository repo;

    public List<HorarioClase> findAll() {
        return repo.findAll();
    }

    public List<HorarioClase> findByDia(String dia) {
        return repo.findByDiaSemana(dia);
    }

    public HorarioClase save(HorarioClase h) {
        return repo.save(h);
    }
}
