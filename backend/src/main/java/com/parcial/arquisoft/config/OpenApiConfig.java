package com.parcial.arquisoft.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI parcialOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("Parcial 2 - Arquitectura de Software - API de Proyectos y Empleados")
                        .description("""
                                Servicio RESTful desarrollado en Spring Boot con HATEOAS,
                                versionamiento por Accept Header, PostgreSQL en Supabase y Docker.
                                Los endpoints principales requieren el header:
                                Accept: application/vnd.parcial.v1+json
                                """)
                        .version("1.0.0"));
    }
}
