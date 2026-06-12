package com.parcial.arquisoft.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;

public class EmpleadoAsignadoResponse extends EmpleadoResumenResponse {

    private String rolEnProyecto;
    private LocalDate fechaAsignacion;

    @JsonProperty("_links")
    private Map<String, HateoasLinkResponse> links = new LinkedHashMap<>();

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
