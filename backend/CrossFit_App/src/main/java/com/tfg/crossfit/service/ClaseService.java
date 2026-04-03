package com.tfg.crossfit.service;

import com.tfg.crossfit.dto.ClaseDTO;
import com.tfg.crossfit.model.Clase;

import java.util.List;

public interface ClaseService {

	ClaseDTO crearClase(ClaseDTO claseDTO);

	List<ClaseDTO> listarClases();

	ClaseDTO obtenerClase(Long id);

	void eliminarClase(Long id);

	ClaseDTO actualizarClase(Long id, ClaseDTO claseDTO);

	Clase obtenerEntidad(Long id);

	void generarClasesDesdeHorario();
}