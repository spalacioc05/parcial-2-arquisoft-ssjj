package com.parcial.arquisoft.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.parcial.arquisoft.entity.EstadoProyecto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;

public class ProyectoAsignadoResponse {

    private Long id;
    private String codigo;
    private String nombre;
    private String descripcion;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private EstadoProyecto estado;
    private BigDecimal presupuesto;
    private String rolEnProyecto;
    private LocalDate fechaAsignacion;

    @JsonProperty("_links")
    private Map<String, HateoasLinkResponse> links = new LinkedHashMap<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getRolEnProyecto() {
        return rolEnProyecto;
    }

    public void setRolEnProyecto(String rolEnProyecto) {
        this.rolEnProyecto = rolEnProyecto;
    }

    public LocalDate getFechaAsignacion() {
        return fechaAsignacion;
    }

    public void setFechaAsignacion(LocalDate fechaAsignacion) {
        this.fechaAsignacion = fechaAsignacion;
    }

    public Map<String, HateoasLinkResponse> getLinks() {
        return links;
    }

    public void setLinks(Map<String, HateoasLinkResponse> links) {
        this.links = links;
    }

    public void addLink(String rel, String href) {
        this.links.put(rel, new HateoasLinkResponse(href));
    }
}
