package com.tfg.crossfit.service;

import com.tfg.crossfit.dto.InscripcionDTO;
import com.tfg.crossfit.model.Clase;
import com.tfg.crossfit.model.Inscripcion;
import com.tfg.crossfit.model.Usuario;

import java.util.List;

public interface InscripcionService {

    Inscripcion inscribir(Usuario usuario, Clase clase);

    Inscripcion inscribirPorIds(Long usuarioId, Long claseId);

    Inscripcion cancelarInscripcion(Long id);

    List<InscripcionDTO> listarPorUsuario(Usuario usuario);

    List<InscripcionDTO> listarPorClase(Clase clase);
}