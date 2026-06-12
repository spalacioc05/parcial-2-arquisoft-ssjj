package com.parcial.arquisoft.service;

import com.parcial.arquisoft.dto.request.CreateEmpleadoAsignadoRequest;
import com.parcial.arquisoft.dto.request.CreateProyectoRequest;
import com.parcial.arquisoft.dto.response.EmpleadoAsignadoResponse;
import com.parcial.arquisoft.dto.response.EmpleadoProyectosResponse;
import com.parcial.arquisoft.dto.response.EmpleadoResumenResponse;
import com.parcial.arquisoft.dto.response.ProyectoAsignadoResponse;
import com.parcial.arquisoft.dto.response.ProyectoCreadoResponse;
import com.parcial.arquisoft.dto.response.ProyectoDetalleResponse;
import com.parcial.arquisoft.entity.Empleado;
import com.parcial.arquisoft.entity.EmpleadoProyecto;
import com.parcial.arquisoft.entity.Proyecto;
import com.parcial.arquisoft.exception.BadRequestException;
import com.parcial.arquisoft.exception.ConflictException;
import com.parcial.arquisoft.exception.ResourceNotFoundException;
import com.parcial.arquisoft.repository.EmpleadoRepository;
import com.parcial.arquisoft.repository.ProyectoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProyectoServiceImpl implements ProyectoService {

    private final EmpleadoRepository empleadoRepository;
    private final ProyectoRepository proyectoRepository;

    public ProyectoServiceImpl(EmpleadoRepository empleadoRepository, ProyectoRepository proyectoRepository) {
        this.empleadoRepository = empleadoRepository;
        this.proyectoRepository = proyectoRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public EmpleadoProyectosResponse consultarProyectosPorCedula(String cedula) {
        if (cedula == null || cedula.isBlank()) {
            throw new BadRequestException("La cedula del empleado es obligatoria");
        }

        Empleado empleado = empleadoRepository.findByCedula(cedula.trim())
                .orElseThrow(() -> new ResourceNotFoundException("No existe un empleado con la cedula " + cedula));

        List<ProyectoAsignadoResponse> proyectos = empleado.getAsignaciones().stream()
                .map(this::toProyectoAsignadoResponse)
                .toList();

        EmpleadoProyectosResponse response = new EmpleadoProyectosResponse();
        response.setEmpleado(toEmpleadoResumenResponse(empleado));
        response.setCantidadProyectos(proyectos.size());
        response.setProyectos(proyectos);
        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public ProyectoDetalleResponse consultarProyectoPorId(Long id) {
        Proyecto proyecto = proyectoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe un proyecto con id " + id));
        return toProyectoDetalleResponse(proyecto);
    }

    @Override
    @Transactional
    public ProyectoCreadoResponse crearProyecto(CreateProyectoRequest request) {
        validarSolicitudCreacion(request);

        if (proyectoRepository.existsByCodigo(request.getCodigo().trim())) {
            throw new ConflictException("Ya existe un proyecto con el codigo " + request.getCodigo());
        }

        Proyecto proyecto = new Proyecto();
        proyecto.setCodigo(request.getCodigo().trim());
        proyecto.setNombre(request.getNombre().trim());
        proyecto.setDescripcion(trimOrNull(request.getDescripcion()));
        proyecto.setFechaInicio(request.getFechaInicio());
        proyecto.setFechaFin(request.getFechaFin());
        proyecto.setEstado(request.getEstado());
        proyecto.setPresupuesto(request.getPresupuesto());

        Set<String> cedulasProcesadas = new HashSet<>();
        for (CreateEmpleadoAsignadoRequest empleadoRequest : request.getEmpleados()) {
            String cedula = empleadoRequest.getCedula().trim();
            if (!cedulasProcesadas.add(cedula)) {
                throw new BadRequestException("No se puede repetir la cedula " + cedula + " en el mismo proyecto");
            }

            Empleado empleado = empleadoRepository.findByCedula(cedula)
                    .map(existing -> actualizarDatosBasicos(existing, empleadoRequest))
                    .orElseGet(() -> crearEmpleado(empleadoRequest));
            empleado = empleadoRepository.save(empleado);

            EmpleadoProyecto asignacion = new EmpleadoProyecto();
            asignacion.setEmpleado(empleado);
            asignacion.setProyecto(proyecto);
            asignacion.setRolEnProyecto(empleadoRequest.getRolEnProyecto().trim());
            asignacion.setFechaAsignacion(
                    empleadoRequest.getFechaAsignacion() == null ? LocalDate.now() : empleadoRequest.getFechaAsignacion()
            );
            proyecto.getAsignaciones().add(asignacion);
            empleado.getAsignaciones().add(asignacion);
        }

        Proyecto guardado = proyectoRepository.save(proyecto);
        return toProyectoCreadoResponse(guardado);
    }

    private void validarSolicitudCreacion(CreateProyectoRequest request) {
        if (request.getFechaFin() != null && request.getFechaFin().isBefore(request.getFechaInicio())) {
            throw new BadRequestException("La fecha fin no puede ser menor que la fecha de inicio");
        }
        if (request.getEmpleados() == null || request.getEmpleados().isEmpty()) {
            throw new BadRequestException("La lista de empleados no puede estar vacia");
        }
    }

    private Empleado crearEmpleado(CreateEmpleadoAsignadoRequest request) {
        Empleado empleado = new Empleado();
        empleado.setCedula(request.getCedula().trim());
        return actualizarDatosBasicos(empleado, request);
    }

    private Empleado actualizarDatosBasicos(Empleado empleado, CreateEmpleadoAsignadoRequest request) {
        empleado.setNombre(request.getNombre().trim());
        empleado.setApellido(request.getApellido().trim());
        empleado.setCorreo(request.getCorreo().trim());
        empleado.setCargo(request.getCargo().trim());
        empleado.setArea(request.getArea().trim());
        empleado.setActivo(true);
        return empleado;
    }

    private EmpleadoResumenResponse toEmpleadoResumenResponse(Empleado empleado) {
        return new EmpleadoResumenResponse(
                empleado.getCedula(),
                empleado.getNombre() + " " + empleado.getApellido(),
                empleado.getCorreo(),
                empleado.getCargo(),
                empleado.getArea()
        );
    }

    private ProyectoAsignadoResponse toProyectoAsignadoResponse(EmpleadoProyecto asignacion) {
        Proyecto proyecto = asignacion.getProyecto();
        ProyectoAsignadoResponse response = new ProyectoAsignadoResponse();
        response.setId(proyecto.getId());
        response.setCodigo(proyecto.getCodigo());
        response.setNombre(proyecto.getNombre());
        response.setDescripcion(proyecto.getDescripcion());
        response.setFechaInicio(proyecto.getFechaInicio());
        response.setFechaFin(proyecto.getFechaFin());
        response.setEstado(proyecto.getEstado());
        response.setPresupuesto(proyecto.getPresupuesto());
        response.setRolEnProyecto(asignacion.getRolEnProyecto());
        response.setFechaAsignacion(asignacion.getFechaAsignacion());
        return response;
    }

    private ProyectoDetalleResponse toProyectoDetalleResponse(Proyecto proyecto) {
        ProyectoDetalleResponse response = new ProyectoDetalleResponse();
        response.setId(proyecto.getId());
        response.setCodigo(proyecto.getCodigo());
        response.setNombre(proyecto.getNombre());
        response.setDescripcion(proyecto.getDescripcion());
        response.setFechaInicio(proyecto.getFechaInicio());
        response.setFechaFin(proyecto.getFechaFin());
        response.setEstado(proyecto.getEstado());
        response.setPresupuesto(proyecto.getPresupuesto());
        response.setEmpleados(proyecto.getAsignaciones().stream()
                .map(this::toEmpleadoAsignadoResponse)
                .toList());
        return response;
    }

    private EmpleadoAsignadoResponse toEmpleadoAsignadoResponse(EmpleadoProyecto asignacion) {
        Empleado empleado = asignacion.getEmpleado();
        EmpleadoAsignadoResponse response = new EmpleadoAsignadoResponse();
        response.setCedula(empleado.getCedula());
        response.setNombreCompleto(empleado.getNombre() + " " + empleado.getApellido());
        response.setCorreo(empleado.getCorreo());
        response.setCargo(empleado.getCargo());
        response.setArea(empleado.getArea());
        response.setRolEnProyecto(asignacion.getRolEnProyecto());
        response.setFechaAsignacion(asignacion.getFechaAsignacion());
        return response;
    }

    private ProyectoCreadoResponse toProyectoCreadoResponse(Proyecto proyecto) {
        ProyectoCreadoResponse response = new ProyectoCreadoResponse();
        response.setId(proyecto.getId());
        response.setCodigo(proyecto.getCodigo());
        response.setNombre(proyecto.getNombre());
        response.setEstado(proyecto.getEstado());
        response.setEmpleadosAsignados(proyecto.getAsignaciones().size());
        response.setEmpleados(proyecto.getAsignaciones().stream()
                .map(EmpleadoProyecto::getEmpleado)
                .map(this::toEmpleadoResumenResponse)
                .toList());
        return response;
    }

    private String trimOrNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
