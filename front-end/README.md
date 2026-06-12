# Gestión de Proyectos Empresariales — Frontend

Frontend del Parcial 2 de Arquitectura de Software. Consume una API REST en
Spring Boot que gestiona proyectos y empleados.

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Abre http://localhost:3000.

## Compilar

```bash
npm run build
```

## Variables de entorno

Crear un archivo `.env` (o `.env.local`) en la raíz:

```
VITE_API_URL=http://localhost:8080
VITE_API_ACCEPT=application/vnd.parcial.v1+json
```

Si no se definen, se usan esos mismos valores por defecto.

El puerto `3000` es solo para el frontend. La API del backend sigue en
`http://localhost:8080`.

## Endpoints consumidos

- `GET  /api/health` — verifica disponibilidad del backend.
- `GET  /api/proyectos?cedula={cedula}` — proyectos asignados a un empleado.
- `POST /api/proyectos` — crear proyecto con empleados.
- `GET  /swagger-ui/index.html` — documentación Swagger (enlace).

## Header Accept requerido

Todas las peticiones envían:

```
Accept: application/vnd.parcial.v1+json
```

Las peticiones `POST` además envían `Content-Type: application/json`.
El versionamiento se maneja por Accept Header (no por `/api/v1`).

## Probar con el backend

1. Levanta el backend Spring Boot en `http://localhost:8080`.
2. Ejecuta `npm run dev`.
3. En la sección **Documentación y utilidades** pulsa **Probar Health Check**.
4. En **Consultar proyectos** usa la cédula de prueba `1001234567`.
5. En **Crear nuevo proyecto** usa **Cargar ejemplo** para autocompletar.
