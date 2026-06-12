# Backend - Parcial 2 Arquitectura de Software

API RESTful en Spring Boot para gestionar proyectos y empleados.

## Requisitos

- Java 17 o superior.
- Maven 3.9+.
- Acceso a Supabase PostgreSQL.

## Ejecucion local

```bash
cd backend
set SPRING_DATASOURCE_URL=jdbc:postgresql://aws-1-us-west-2.pooler.supabase.com:5432/postgres?sslmode=require^&prepareThreshold=0
set SPRING_DATASOURCE_USERNAME=postgres.nwghyyacoflihtacamip
set SPRING_DATASOURCE_PASSWORD=parcial-2-arquisoft-ssjj
set SPRING_DATASOURCE_HIKARI_MAXIMUM_POOL_SIZE=2
set SPRING_DATASOURCE_HIKARI_MINIMUM_IDLE=0
mvn spring-boot:run
```

En PowerShell:

```powershell
$env:SPRING_DATASOURCE_URL="jdbc:postgresql://aws-1-us-west-2.pooler.supabase.com:5432/postgres?sslmode=require&prepareThreshold=0"
$env:SPRING_DATASOURCE_USERNAME="postgres.nwghyyacoflihtacamip"
$env:SPRING_DATASOURCE_PASSWORD="parcial-2-arquisoft-ssjj"
$env:SPRING_DATASOURCE_HIKARI_MAXIMUM_POOL_SIZE="2"
$env:SPRING_DATASOURCE_HIKARI_MINIMUM_IDLE="0"
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

## Render y Supabase

La aplicacion lee el puerto con `server.port=${PORT:${SERVER_PORT:8080}}`, por lo que Render puede inyectar `PORT` automaticamente. No defina `SERVER_PORT` en Render.

Variables recomendadas:

```env
SPRING_DATASOURCE_URL=jdbc:postgresql://aws-1-us-west-2.pooler.supabase.com:5432/postgres?sslmode=require&prepareThreshold=0
SPRING_DATASOURCE_USERNAME=postgres.nwghyyacoflihtacamip
SPRING_DATASOURCE_PASSWORD=parcial-2-arquisoft-ssjj
SPRING_DATASOURCE_HIKARI_MAXIMUM_POOL_SIZE=2
SPRING_DATASOURCE_HIKARI_MINIMUM_IDLE=0
SPRING_DATASOURCE_HIKARI_IDLE_TIMEOUT=10000
SPRING_DATASOURCE_HIKARI_MAX_LIFETIME=30000
SPRING_DATASOURCE_HIKARI_CONNECTION_TIMEOUT=30000
SPRING_DATASOURCE_HIKARI_VALIDATION_TIMEOUT=5000
FRONTEND_URL=https://parcial-2-arquisoft-ssjj.vercel.app
```
