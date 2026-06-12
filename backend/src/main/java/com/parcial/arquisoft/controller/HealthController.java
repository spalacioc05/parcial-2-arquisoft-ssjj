package com.parcial.arquisoft.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HealthController {

    @Operation(summary = "Verifica el estado del backend")
    @GetMapping(value = "/api/health", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> health() {
        return Map.of(
                "status", "UP",
                "service", "parcial-2-arquisoft-ssjj"
        );
    }
}
