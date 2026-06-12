package com.parcial.arquisoft.service;

import com.parcial.arquisoft.dto.request.CreateProyectoRequest;
import com.parcial.arquisoft.dto.response.EmpleadoProyectosResponse;
import com.parcial.arquisoft.dto.response.ProyectoCreadoResponse;
import com.parcial.arquisoft.dto.response.ProyectoDetalleResponse;

public interface ProyectoService {

    EmpleadoProyectosResponse consultarProyectosPorCedula(String cedula);

    ProyectoDetalleResponse consultarProyectoPorId(Long id);

    ProyectoCreadoResponse crearProyecto(CreateProyectoRequest request);
}
