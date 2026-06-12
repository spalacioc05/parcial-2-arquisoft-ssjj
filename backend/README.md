# Backend - Parcial 2 Arquitectura de Software

API RESTful en Spring Boot para gestionar proyectos y empleados.

## Requisitos

- Java 17 o superior.
- Maven 3.9+.
- Acceso a Supabase PostgreSQL.

## Ejecucion local

```bash
cd backend
set SPRING_DATASOURCE_URL=jdbc:postgresql://aws-1-us-west-2.pooler.supabase.com:5432/postgres?sslmode=require
set SPRING_DATASOURCE_USERNAME=postgres.nwghyyacoflihtacamip
set SPRING_DATASOURCE_PASSWORD=parcial-2-arquisoft-ssjj
mvn spring-boot:run
```

En PowerShell:

```powershell
$env:SPRING_DATASOURCE_URL="jdbc:postgresql://aws-1-us-west-2.pooler.supabase.com:5432/postgres?sslmode=require"
$env:SPRING_DATASOURCE_USERNAME="postgres.nwghyyacoflihtacamip"
$env:SPRING_DATASOURCE_PASSWORD="parcial-2-arquisoft-ssjj"
mvn spring-boot:run
```

## Pruebas

```bash
mvn test
```

## URLs

- Health: `http://localhost:8080/api/health`
- Swagger: `http://localhost:8080/swagger-ui/index.html`
- OpenAPI: `http://localhost:8080/v3/api-docs`

## Media type versionado

Los endpoints principales requieren:

```http
Accept: application/vnd.parcial.v1+json
```
