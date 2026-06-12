# Gestion de Proyectos Empresariales - Frontend

Frontend del Parcial 2 de Arquitectura de Software. Consume una API REST en Spring Boot que gestiona proyectos y empleados.

## Instalacion

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Abre `http://localhost:3000`.

## Compilar

```bash
npm run build
```

El build para Vercel debe generar:

```text
dist/index.html
dist/assets/
```

## Preview local

```bash
npm run preview
```

Abre `http://localhost:3000`.

## Variables de entorno

Para Vercel:

```env
VITE_API_URL=https://parcial-2-arquisoft-ssjj.onrender.com
VITE_API_ACCEPT=application/vnd.parcial.v1+json
```

Si no se definen, el codigo usa `http://localhost:8080` como fallback para desarrollo local.

## Endpoints consumidos

- `GET /api/health`
- `GET /api/proyectos?cedula={cedula}`
- `POST /api/proyectos`
- `GET /api/proyectos/{id}`
- `GET /swagger-ui/index.html`

Todas las peticiones principales envian:

```http
Accept: application/vnd.parcial.v1+json
```

Las peticiones `POST` tambien envian:

```http
Content-Type: application/json
```

## Vercel

Configuracion recomendada:

- Root Directory: `front-end`
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

El archivo `vercel.json` incluye el rewrite de SPA hacia `/index.html`.

Alternativa si Vercel no lee la configuracion con Root Directory:

- Root Directory: vacio
- Build Command: `cd front-end && npm install && npm run build`
- Output Directory: `front-end/dist`
- Install Command: `echo install handled in buildCommand`

La alternativa usa el `vercel.json` de la raiz del repositorio.
