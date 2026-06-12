package com.parcial.arquisoft.dto.request;

import com.parcial.arquisoft.entity.EstadoProyecto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class CreateProyectoRequest {

    @NotBlank(message = "El codigo del proyecto es obligatorio")
    private String codigo;

    @NotBlank(message = "El nombre del proyecto es obligatorio")
    private String nombre;

    private String descripcion;

    @NotNull(message = "La fecha de inicio es obligatoria")
    private LocalDate fechaInicio;

    private LocalDate fechaFin;

    @NotNull(message = "El estado del proyecto es obligatorio")
    private EstadoProyecto estado;

    @NotNull(message = "El presupuesto es obligatorio")
    @DecimalMin(value = "0.00", message = "El presupuesto no puede ser negativo")
    private BigDecimal presupuesto;

    @Valid
    @NotEmpty(message = "La lista de empleados no puede estar vacia")
    private List<CreateEmpleadoAsignadoRequest> empleados = new ArrayList<>();

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public EstadoProyecto getEstado() {
        return estado;
    }

    public void setEstado(EstadoProyecto estado) {
        this.estado = estado;
    }

    public BigDecimal getPresupuesto() {
        return presupuesto;
    }

    public void setPresupuesto(BigDecimal presupuesto) {
        this.presupuesto = presupuesto;
    }

    public List<CreateEmpleadoAsignadoRequest> getEmpleados() {
        return empleados;
    }

    public void setEmpleados(List<CreateEmpleadoAsignadoRequest> empleados) {
        this.empleados = empleados;
    }
}
