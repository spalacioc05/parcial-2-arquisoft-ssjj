package com.parcial.arquisoft.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.parcial.arquisoft.entity.EstadoProyecto;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class ProyectoCreadoResponse {

    private Long id;
    private String codigo;
    private String nombre;
    private EstadoProyecto estado;
    private int empleadosAsignados;
    private List<EmpleadoResumenResponse> empleados = new ArrayList<>();

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

    public EstadoProyecto getEstado() {
        return estado;
    }

    public void setEstado(EstadoProyecto estado) {
        this.estado = estado;
    }

    public int getEmpleadosAsignados() {
        return empleadosAsignados;
    }

    public void setEmpleadosAsignados(int empleadosAsignados) {
        this.empleadosAsignados = empleadosAsignados;
    }

    public List<EmpleadoResumenResponse> getEmpleados() {
        return empleados;
    }

    public void setEmpleados(List<EmpleadoResumenResponse> empleados) {
        this.empleados = empleados;
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
