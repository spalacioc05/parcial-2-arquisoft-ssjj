package com.parcial.arquisoft;

import com.parcial.arquisoft.config.ApiMediaTypes;
import com.parcial.arquisoft.controller.HealthController;
import com.parcial.arquisoft.controller.ProyectoController;
import com.parcial.arquisoft.dto.response.EmpleadoProyectosResponse;
import com.parcial.arquisoft.dto.response.EmpleadoResumenResponse;
import com.parcial.arquisoft.exception.BadRequestException;
import com.parcial.arquisoft.exception.ResourceNotFoundException;
import com.parcial.arquisoft.service.ProyectoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {ProyectoController.class, HealthController.class})
class ProyectoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProyectoService proyectoService;

    @Test
    void healthRespondeOk() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("UP")));
    }

    @Test
    void consultarProyectosSinCedulaRespondeBadRequest() throws Exception {
        when(proyectoService.consultarProyectosPorCedula(any()))
                .thenThrow(new BadRequestException("La cedula del empleado es obligatoria"));

        mockMvc.perform(get("/api/proyectos").accept(ApiMediaTypes.API_V1))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status", is(400)));
    }

    @Test
    void consultarProyectosConCedulaInexistenteRespondeNotFound() throws Exception {
        when(proyectoService.consultarProyectosPorCedula("999999999"))
                .thenThrow(new ResourceNotFoundException("No existe un empleado con la cedula 999999999"));

        mockMvc.perform(get("/api/proyectos")
                        .param("cedula", "999999999")
                        .accept(ApiMediaTypes.API_V1))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status", is(404)));
    }

    @Test
    void consultarProyectosProduceMediaTypeVersionado() throws Exception {
        EmpleadoProyectosResponse response = new EmpleadoProyectosResponse();
        response.setEmpleado(new EmpleadoResumenResponse(
                "1001234567",
                "Santiago Palacio",
                "santiago.palacio@empresa.com",
                "Desarrollador Backend",
                "Tecnologia"
        ));
        response.setCantidadProyectos(0);
        response.setProyectos(new ArrayList<>());
        when(proyectoService.consultarProyectosPorCedula("1001234567")).thenReturn(response);

        mockMvc.perform(get("/api/proyectos")
                        .param("cedula", "1001234567")
                        .accept(ApiMediaTypes.API_V1))
                .andExpect(status().isOk())
                .andExpect(content().contentType(ApiMediaTypes.API_V1));
    }
}
