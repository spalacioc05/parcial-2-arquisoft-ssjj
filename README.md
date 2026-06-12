# Parcial 2 - Arquitectura de Software - Proyectos y Empleados

Solucion fullstack para consultar los proyectos asignados a un empleado por cedula y registrar proyectos empresariales junto con sus empleados. La entrega integra frontend React/Vite, backend Spring Boot, PostgreSQL en Supabase, HATEOAS, Swagger/OpenAPI, versionamiento por `Accept Header`, Docker y coleccion Postman.

## Integrantes

- Santiago Palacio Cardenas
- Sarai Restrepo Rodriguez
- Juan Pablo Herrera Jaramillo
- Jimena Munoz Gomez

## Enunciado resumido

El servicio RESTful debe exponer un `GET` para consultar proyectos asignados a un empleado por cedula y un `POST` para ingresar proyectos con empleados. Las respuestas deben ser JSON, usar codigos HTTP correctos, HATEOAS, Swagger/OpenAPI, versionamiento por `Accept Header`, PostgreSQL en Supabase y contenedores Docker.

## Tecnologias

- Frontend: React 19, Vite, TypeScript, Tailwind CSS, componentes shadcn/ui, TanStack Router.
- Backend: Java 17+, Spring Boot 3, Spring Web, Spring Data JPA, Validation, HATEOAS, Springdoc OpenAPI.
- Base de datos: PostgreSQL en Supabase.
- Pruebas: JUnit 5 y MockMvc.
- DevOps local: Docker y Docker Compose.

## Arquitectura general

El navegador o Postman consumen el backend Spring Boot mediante endpoints REST bajo `/api`. El frontend se configura con `VITE_API_URL` y `VITE_API_ACCEPT`. El backend aplica arquitectura por capas: controladores, servicios, repositorios, DTOs, entidades y manejo global de errores. La persistencia usa Supabase PostgreSQL.

## Requisitos cumplidos

- Servicio RESTful con `GET /api/proyectos?cedula={cedula}`.
- Servicio `POST /api/proyectos` para crear proyectos con empleados.
- Respuestas JSON.
- Versionamiento por `Accept: application/vnd.parcial.v1+json`.
- HATEOAS visible mediante `_links`.
- Codigos HTTP 200, 201, 400, 404, 409 y 500.
- Documentacion Swagger/OpenAPI.
- Dockerfile de backend y Docker Compose.
- PostgreSQL en Supabase mediante variables de entorno.
- Frontend integrado al backend.
- Coleccion Postman con pruebas.
- Scripts SQL de esquema y datos semilla.

## Estructura

```text
parcial-2-arquisoft-ssjj/
├── front-end/
├── backend/
├── db/
│   ├── schema.sql
│   └── seed.sql
├── docs/
│   ├── arquitectura.md
│   └── evidencias.md
├── postman/
│   └── parcial-2-arquisoft.postman_collection.json
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

## Base de datos

1. Abrir el SQL editor de Supabase.
2. Ejecutar `db/schema.sql`.
3. Ejecutar `db/seed.sql`.

La aplicacion no levanta PostgreSQL local; usa Supabase.

## Variables de entorno

Copiar `.env.example` a `.env` si se desea ejecutar con variables locales.

```env
SERVER_PORT=8080
SPRING_DATASOURCE_URL=jdbc:postgresql://aws-1-us-west-2.pooler.supabase.com:5432/postgres?sslmode=require
SPRING_DATASOURCE_USERNAME=postgres.nwghyyacoflihtacamip
SPRING_DATASOURCE_PASSWORD=parcial-2-arquisoft-ssjj
VITE_API_URL=http://localhost:8080
VITE_API_ACCEPT=application/vnd.parcial.v1+json
```

## Ejecutar backend local

```bash
cd backend
mvn clean package
mvn spring-boot:run
```

## Ejecutar frontend local

```bash
cd front-end
npm install
npm run dev
```

El frontend queda disponible en `http://localhost:3000` y consume el backend en `http://localhost:8080`.

## Ejecutar con Docker

```bash
docker compose up --build
```

Puertos esperados:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`
- Swagger: `http://localhost:8080/swagger-ui/index.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## Endpoints principales

### Health check

```http
GET /api/health
```

### Consultar proyectos por cedula

```http
GET /api/proyectos?cedula=1001234567
Accept: application/vnd.parcial.v1+json
```

### Consultar proyecto por id

```http
GET /api/proyectos/1
Accept: application/vnd.parcial.v1+json
```

### Crear proyecto con empleados

```http
POST /api/proyectos
Accept: application/vnd.parcial.v1+json
Content-Type: application/json
```

```json
{
  "codigo": "PRY-004",
  "nombre": "Sistema de Gestion Documental",
  "descripcion": "Sistema para administrar documentos internos de la empresa.",
  "fechaInicio": "2026-06-15",
  "fechaFin": "2026-09-30",
  "estado": "ACTIVO",
  "presupuesto": 12000000,
  "empleados": [
    {
      "cedula": "1001234567",
      "nombre": "Santiago",
      "apellido": "Palacio",
      "correo": "santiago.palacio@empresa.com",
      "cargo": "Desarrollador Backend",
      "area": "Tecnologia",
      "rolEnProyecto": "Desarrollador Principal",
      "fechaAsignacion": "2026-06-15"
    }
  ]
}
```

## HATEOAS

Las respuestas principales incluyen `_links` para descubrir recursos relacionados. Por ejemplo, una consulta por cedula devuelve enlaces `self`, `crear-proyecto`, `swagger` y cada proyecto incluye su enlace `self`.

## Versionamiento por Accept Header

La version de la API no se expresa en la URL. Los endpoints principales producen `application/vnd.parcial.v1+json` y el cliente debe enviar:

```http
Accept: application/vnd.parcial.v1+json
```

## Codigos HTTP

- `200 OK`: consultas exitosas.
- `201 Created`: proyecto creado; incluye header `Location`.
- `400 Bad Request`: cedula faltante, body invalido o validaciones fallidas.
- `404 Not Found`: empleado o proyecto inexistente.
- `409 Conflict`: codigo de proyecto duplicado o conflicto de datos.
- `500 Internal Server Error`: error inesperado.

## Postman

Importar `postman/parcial-2-arquisoft.postman_collection.json`. La coleccion incluye health check, consulta exitosa, consulta sin cedula, empleado inexistente, creacion de proyecto y proyecto duplicado.

## Verificacion final

Ejecutar estos comandos antes de entregar evidencias:

```bash
cd backend
mvn test
mvn clean package
```

```bash
cd front-end
npm install
npm run build
npm run dev
```

```bash
docker compose up --build
```

## Repositorio

https://github.com/spalacioc05/parcial-2-arquisoft-ssjj
