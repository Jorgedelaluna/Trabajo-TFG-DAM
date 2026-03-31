package com.tfg.crossfit.controller;


import com.tfg.crossfit.model.HorarioClase;
import com.tfg.crossfit.service.HorarioClaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/horarios")
@CrossOrigin(origins = "*")
public class HorarioClaseController {

    @Autowired
    private HorarioClaseService service;

    @GetMapping
    public List<HorarioClase> getAll() {
        return service.findAll();
    }

    @GetMapping("/{dia}")
    public List<HorarioClase> getByDia(@PathVariable String dia) {
        return service.findByDia(dia.toUpperCase());
    }

    @PostMapping
    public HorarioClase create(@RequestBody HorarioClase horario) {
        return service.save(horario);
    }
}
