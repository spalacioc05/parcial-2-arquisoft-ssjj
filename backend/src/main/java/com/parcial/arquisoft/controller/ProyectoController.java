package com.parcial.arquisoft.controller;

import com.parcial.arquisoft.config.ApiMediaTypes;
import com.parcial.arquisoft.dto.request.CreateProyectoRequest;
import com.parcial.arquisoft.dto.response.EmpleadoAsignadoResponse;
import com.parcial.arquisoft.dto.response.EmpleadoProyectosResponse;
import com.parcial.arquisoft.dto.response.ProyectoAsignadoResponse;
import com.parcial.arquisoft.dto.response.ProyectoCreadoResponse;
import com.parcial.arquisoft.dto.response.ProyectoDetalleResponse;
import com.parcial.arquisoft.service.ProyectoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
public class ProyectoController {

    private final ProyectoService proyectoService;

    public ProyectoController(ProyectoService proyectoService) {
        this.proyectoService = proyectoService;
    }

    @Operation(
            summary = "Consulta los proyectos asignados a un empleado por cedula",
            description = "Requiere Accept: application/vnd.parcial.v1+json"
    )
    @Parameter(name = "Accept", in = ParameterIn.HEADER, required = true, example = ApiMediaTypes.API_V1)
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Consulta exitosa"),
            @ApiResponse(responseCode = "400", description = "Cedula faltante"),
            @ApiResponse(responseCode = "404", description = "Empleado no encontrado")
    })
    @GetMapping(value = "/api/proyectos", produces = ApiMediaTypes.API_V1)
    public ResponseEntity<EmpleadoProyectosResponse> consultarProyectosPorCedula(
            @RequestParam(value = "cedula", required = false) String cedula
    ) {
        EmpleadoProyectosResponse response = proyectoService.consultarProyectosPorCedula(cedula);
        agregarLinksEmpleadoProyectos(response, cedula);
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Consulta un proyecto por id",
            description = "Requiere Accept: application/vnd.parcial.v1+json"
    )
    @Parameter(name = "Accept", in = ParameterIn.HEADER, required = true, example = ApiMediaTypes.API_V1)
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Proyecto encontrado"),
            @ApiResponse(responseCode = "404", description = "Proyecto no encontrado")
    })
    @GetMapping(value = "/api/proyectos/{id}", produces = ApiMediaTypes.API_V1)
    public ResponseEntity<ProyectoDetalleResponse> consultarProyectoPorId(@PathVariable Long id) {
        ProyectoDetalleResponse response = proyectoService.consultarProyectoPorId(id);
        agregarLinksProyectoDetalle(response);
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Crea un proyecto con sus empleados asignados",
            description = "Requiere Accept: application/vnd.parcial.v1+json y Content-Type: application/json"
    )
    @Parameter(name = "Accept", in = ParameterIn.HEADER, required = true, example = ApiMediaTypes.API_V1)
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Proyecto creado"),
            @ApiResponse(responseCode = "400", description = "Solicitud invalida"),
            @ApiResponse(responseCode = "409", description = "Codigo duplicado o conflicto de datos")
    })
    @PostMapping(
            value = "/api/proyectos",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = ApiMediaTypes.API_V1
    )
    public ResponseEntity<ProyectoCreadoResponse> crearProyecto(@Valid @RequestBody CreateProyectoRequest request) {
        ProyectoCreadoResponse response = proyectoService.crearProyecto(request);
        agregarLinksProyectoCreado(response);
        URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/proyectos/{id}")
                .buildAndExpand(response.getId())
                .toUri();
        return ResponseEntity.status(HttpStatus.CREATED)
                .header(HttpHeaders.LOCATION, location.toString())
                .body(response);
    }

    private void agregarLinksEmpleadoProyectos(EmpleadoProyectosResponse response, String cedula) {
        response.addLink("self", href(linkTo(methodOn(ProyectoController.class).consultarProyectosPorCedula(cedula)).toUri()));
        response.addLink("crear-proyecto", href(linkTo(methodOn(ProyectoController.class).crearProyecto(null)).toUri()));
        response.addLink("swagger", swaggerHref());
        for (ProyectoAsignadoResponse proyecto : response.getProyectos()) {
            proyecto.addLink("self", href(linkTo(methodOn(ProyectoController.class).consultarProyectoPorId(proyecto.getId())).toUri()));
        }
    }

    private void agregarLinksProyectoDetalle(ProyectoDetalleResponse response) {
        response.addLink("self", href(linkTo(methodOn(ProyectoController.class).consultarProyectoPorId(response.getId())).toUri()));
        response.addLink("crear-proyecto", href(linkTo(methodOn(ProyectoController.class).crearProyecto(null)).toUri()));
        response.addLink("swagger", swaggerHref());
        for (EmpleadoAsignadoResponse empleado : response.getEmpleados()) {
            empleado.addLink("proyectos-del-empleado", href(linkTo(methodOn(ProyectoController.class)
                    .consultarProyectosPorCedula(empleado.getCedula())).toUri()));
        }
    }

    private void agregarLinksProyectoCreado(ProyectoCreadoResponse response) {
        response.addLink("self", href(linkTo(methodOn(ProyectoController.class).consultarProyectoPorId(response.getId())).toUri()));
        response.addLink("crear-proyecto", href(linkTo(methodOn(ProyectoController.class).crearProyecto(null)).toUri()));
        response.addLink("swagger", swaggerHref());
    }

    private String swaggerHref() {
        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/swagger-ui/index.html")
                .build()
                .toUriString();
    }

    private String href(URI uri) {
        return uri.toString();
    }
}
