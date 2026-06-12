package com.parcial.arquisoft.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public class CreateEmpleadoAsignadoRequest {

    @NotBlank(message = "La cedula del empleado es obligatoria")
    private String cedula;

    @NotBlank(message = "El nombre del empleado es obligatorio")
    private String nombre;

    @NotBlank(message = "El apellido del empleado es obligatorio")
    private String apellido;

    @NotBlank(message = "El correo del empleado es obligatorio")
    @Email(message = "El correo del empleado debe ser valido")
    private String correo;

    @NotBlank(message = "El cargo del empleado es obligatorio")
    private String cargo;

    @NotBlank(message = "El area del empleado es obligatoria")
    private String area;

    @NotBlank(message = "El rol en el proyecto es obligatorio")
    private String rolEnProyecto;

    private LocalDate fechaAsignacion;

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
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
}
