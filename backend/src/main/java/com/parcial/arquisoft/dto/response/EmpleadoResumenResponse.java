package com.parcial.arquisoft.dto.response;

public class EmpleadoResumenResponse {

    private String cedula;
    private String nombreCompleto;
    private String correo;
    private String cargo;
    private String area;

    public EmpleadoResumenResponse() {
    }

    public EmpleadoResumenResponse(String cedula, String nombreCompleto, String correo, String cargo, String area) {
        this.cedula = cedula;
        this.nombreCompleto = nombreCompleto;
        this.correo = correo;
        this.cargo = cargo;
        this.area = area;
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }
}
