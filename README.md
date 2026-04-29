# Analytics Dashboard

Dashboard en React + TypeScript para mostrar actividad de programacion usando datos de la API de Devcamp.

## Requisitos

- Node.js instalado
- npm instalado
- Un token valido para la API

Este proyecto usa Webpack 4, por eso los scripts ya incluyen `NODE_OPTIONS=--openssl-legacy-provider` para funcionar con versiones modernas de Node.

## Instalacion

Clona el repositorio y entra en la carpeta:

```bash
git clone <url-del-repositorio>
cd analytics-dashboard
```

Instala las dependencias:

```bash
npm install
```

En PowerShell, si `npm` da un error de permisos con `npm.ps1`, usa:

```powershell
npm.cmd install
```

## Variables locales

El proyecto necesita variables de entorno para conectarse a la API. No subas el token a GitHub.

Copia el archivo de ejemplo:

```bash
cp .env.example .env.local
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Edita `.env.local` con tus datos reales:

```env
APP_API_TOKEN=tu-token-real
APP_NAME=Tu Nombre
APP_ENDPOINT=https://devcamp.com/api/metrics/code_editor_grouped_by_day
```

Notas:

- `APP_API_TOKEN` es secreto y no debe subirse.
- `APP_NAME` puede ser publico, pero esta en `.env.local` para que puedas cambiarlo sin tocar el codigo.
- `APP_ENDPOINT` normalmente no es secreto; es solo la URL de la API.
- `.env.local` esta en `.gitignore`, asi que Git no lo deberia subir.

## Arrancar en desarrollo

```bash
npm start
```

En PowerShell:

```powershell
npm.cmd start
```

Abre:

```text
http://localhost:3000
```

Si el puerto `3000` esta ocupado, cierra el otro servidor o cambia el puerto en `env.js`.

## Crear build de produccion

```bash
npm run build
```

En PowerShell:

```powershell
npm.cmd run build
```

La build se genera en `dist/`. Esa carpeta esta ignorada por Git.

## Antes de subir a GitHub

Comprueba que no estas subiendo secretos:

```bash
git status --short --ignored
```

`.env.local` debe aparecer como ignorado, no como archivo pendiente de commit.

Tambien puedes buscar el token en el proyecto:

```bash
rg "APP_API_TOKEN|tu-token-real" -g "!node_modules" -g "!dist"
```

Solo deberia aparecer en `.env.local`.

## Problemas comunes

### `npm.ps1 cannot be loaded`

PowerShell puede bloquear scripts. Usa `npm.cmd`:

```powershell
npm.cmd start
```

### `EADDRINUSE: address already in use :::3000`

Ya hay algo usando el puerto `3000`. Cierra el proceso anterior o cambia el puerto en `env.js`.

### Pantalla en blanco despues de cambiar Webpack

Para el servidor y vuelve a arrancarlo:

```powershell
npm.cmd start
```

Despues haz una recarga fuerte en el navegador con `Ctrl + F5`.

## Seguridad

Este proyecto es una app frontend. Aunque el token no este en GitHub, si se usa desde el navegador puede llegar a verse en el bundle o en las peticiones de red cuando la app esta desplegada.

Para ocultar el token de verdad en produccion, lo correcto seria crear un backend o proxy que guarde el token en el servidor y que el frontend llame a ese backend.
