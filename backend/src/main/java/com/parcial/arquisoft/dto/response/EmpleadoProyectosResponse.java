package com.parcial.arquisoft.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class EmpleadoProyectosResponse {

    private EmpleadoResumenResponse empleado;
    private int cantidadProyectos;
    private List<ProyectoAsignadoResponse> proyectos = new ArrayList<>();

    @JsonProperty("_links")
    private Map<String, HateoasLinkResponse> links = new LinkedHashMap<>();

    public EmpleadoResumenResponse getEmpleado() {
        return empleado;
    }

    public void setEmpleado(EmpleadoResumenResponse empleado) {
        this.empleado = empleado;
    }

    public int getCantidadProyectos() {
        return cantidadProyectos;
    }

    public void setCantidadProyectos(int cantidadProyectos) {
        this.cantidadProyectos = cantidadProyectos;
    }

    public List<ProyectoAsignadoResponse> getProyectos() {
        return proyectos;
    }

    public void setProyectos(List<ProyectoAsignadoResponse> proyectos) {
        this.proyectos = proyectos;
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
