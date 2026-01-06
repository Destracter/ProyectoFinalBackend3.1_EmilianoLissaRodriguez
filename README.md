# Proyecto Final - Backend (Mascotas) — Emiliano Lissa Rodriguez

Imagen de Docker: https://hub.docker.com/r/destrac/veterinaria

Requisitos:
- Node 18+, npm
- Docker (opcional para producción)

Inicio rapido (desarrollo)

1. Instalar dependencias:

powershell
npm ci


2. Ejecutar en modo desarrollo (ts-node):

powershell
npm run dev


Armado y ejecución (producción)

1. Compila TypeScript:

powershell
npm run build


2. Ejecutar la versión compilada:

powershell
npm run start:prod


Tests

powershell
npm test


Docker (imagen)

Construir imagen localmente:

powershell
docker build -t destrac/veterinaria:latest .


Subir a Docker Hub:

powershell
docker push destrac/veterinaria:latest


Ejecutar la imagen (host -> container):

powershell
docker run -p 8080:8080 --env PORT=8080 destrac/veterinaria:latest


Dev container

Se incluye `Dockerfile.dev` para ejecutar la app directamente desde `src` con `ts-node` (útil para desarrollo dentro de un contenedor):

powershell
docker build -f Dockerfile.dev -t destrac/veterinaria:dev .
docker run -p 9090:8080 destrac/veterinaria:dev


API y documentación

- Swagger UI: `http://localhost:8080/api/docs` (o cambia el puerto si mapeo otro)
- Endpoints principales:
	- `POST /api/sessions/register`
	- `POST /api/sessions/login` (devuelve `token` en este proyecto de ejemplo)
	- `GET|POST|PUT|DELETE /api/adoptions`

Notas extras:

- La imagen de producción usa el directorio `dist/` compilado y ejecuta `node dist/main.js`.
- El proyecto incluye tests (la suite local actual pasa: `20 passing`).
- Se agregó logging con Winston y documentación Swagger para `users`.

`.gitignore` recomendado

Ignora `node_modules`, artefactos del armado y archivos locales:

node_modules/
dist/
.env
*.log
backup_js.zip
.vscode/
.idea/
.DS_Store
coverage/
npm-debug.log


Contacto:

Imagen Docker Hub: https://hub.docker.com/r/destrac/veterinaria
