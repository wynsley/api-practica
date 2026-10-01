# API Práctica: Usuarios y Proyectos

API REST con Node.js, Express, Prisma y PostgreSQL para gestionar usuarios y proyectos. Los usuarios se relacionan con los proyectos en una relación N:M, con un rol (`LEADER` o `WORKER`).

## Características

- Almacenamiento persistente en PostgreSQL con Prisma
- Contraseñas hasheadas con bcrypt
- CORS configurado para `http://localhost:5173`
- Código modularizado (controller, service, routes y fields por módulo)
- Paginación en los GET
- Manejo centralizado de errores
- Datos de ejemplo (seed) para probar los endpoints

## Requisitos previos

- Node.js 20 o superior
- pnpm (`npm i -g pnpm`)
- PostgreSQL instalado y corriendo (en WSL: `sudo service postgresql start`)

## Instalación

**1. Clonar e instalar dependencias**

```bash
git clone <url-del-repositorio>
cd api-practica
pnpm install
```

**2. Configurar variables de entorno**

```bash
cp .env.example .env
```

Edita el `.env` con tus datos:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/db-practica"
CORS_ORIGIN=http://localhost:5173
PORT=3000
NODE_ENV=development
```

**3. Generar el cliente de Prisma**

```bash
pnpm generate
```

**4. Crear las tablas**

```bash
pnpm migrate --name init
```

Si el repositorio incluye `prisma/migrations`, aplica las migraciones existentes. Si no, crea la migración inicial a partir de `prisma/schema.prisma`. Si la base ya tiene tablas de otra versión, acepta el reset cuando Prisma lo pida.

**5. Cargar datos de ejemplo**

```bash
pnpm seed
```

Crea 30 usuarios, 30 proyectos y sus asignaciones de líder y trabajadores. **Todos los usuarios tienen la contraseña `Password123`.**

**6. Levantar el servidor**

```bash
pnpm dev
```

El servidor queda en `http://localhost:3000`.

## Scripts

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Levanta el servidor con nodemon |
| `pnpm start` | Levanta el servidor con node |
| `pnpm generate` | Genera el cliente de Prisma |
| `pnpm migrate --name <nombre>` | Crea y aplica una migración |
| `pnpm seed` | Borra los datos y carga los de ejemplo |
| `pnpm db:reset` | Borra la base y reaplica las migraciones |

## Estructura del proyecto

```
prisma/
  schema.prisma
src/
  config/        # instancia única de Prisma
  middlewares/   # manejo de errores
  modules/
    user/        # controller, service, routes, fields
    project/     # controller, service, routes, fields
  utils/         # utilidades (hash de contraseñas)
  app.js
  seed.js
```

## Modelo de datos

- **User**: `idUser`, `fullname`, `email` (único), `phone`, `nickname`, `passwordHash`
- **Project**: `idProject`, `name`, `category`, `startDate`, `endDate`, `state` (`TODO`, `DOING`, `DONE`)
- **UserProject** (tabla intermedia N:M): `idUser`, `idProject`, `role` (`LEADER`, `WORKER`), `assignedAt`

Los ids son `String` generados con `cuid()`.

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/users` | Lista usuarios con paginación |
| POST | `/users` | Registra un usuario |
| GET | `/users/:id` | Usuario con sus proyectos asignados |
| GET | `/projects` | Lista proyectos con líder y trabajadores |
| POST | `/projects` | Crea un proyecto con su líder |
| POST | `/projects/:id/users` | Agrega un trabajador al proyecto |

### Parámetros de los GET

| Parámetro | Descripción | Por defecto |
|---|---|---|
| `page` | Número de página | `1` |
| `limit` | Resultados por página (máximo 100) | `10` |
| `search` | Texto a buscar | |
| `sortBy` | Campo por el que ordenar | `fullname` (users) / `createdAt` (projects) |
| `order` | `asc` o `desc` | `asc` (users) / `desc` (projects) |
| `state` | Filtra proyectos por estado (solo `/projects`) | |
| `category` | Filtra proyectos por categoría (solo `/projects`) | |

### Ejemplos de body

**POST `/users`**

```json
{
  "fullname": "María Torres",
  "email": "maria@example.com",
  "phone": "987654321",
  "nickname": "mtorres",
  "password": "Password123"
}
```

**POST `/projects`**

```json
{
  "name": "Mi proyecto",
  "category": "Desarrollo Web",
  "startDate": "2026-10-01",
  "endDate": "2026-12-31",
  "state": "TODO",
  "idLeader": "<id de un usuario existente>"
}
```

Usa fechas en formato `AAAA-MM-DD`. `endDate` es opcional.

**POST `/projects/:id/users`**

El `:id` de la URL es el **id del proyecto**.

```json
{
  "idUser": "<id del usuario a agregar como trabajador>"
}
```

## Códigos de respuesta

| Código | Significado |
|---|---|
| 200 / 201 | Operación correcta |
| 400 | Datos inválidos o faltantes |
| 404 | Registro no encontrado |
| 409 | Ya está registrado (por ejemplo, email repetido) |
| 500 | Error interno del servidor |

## Problemas frecuentes

| Problema | Solución |
|---|---|
| `@prisma/client did not initialize yet` | Ejecuta `pnpm generate` |
| `Environment variable not found: DATABASE_URL` | Crea el `.env` a partir de `.env.example` |
| No conecta a la base | Revisa que Postgres esté corriendo y que las credenciales sean correctas |
| `The column ... does not exist` | Falta aplicar la migración: `pnpm migrate --name init` |
| Quieres empezar de cero | `pnpm db:reset` y luego `pnpm seed` |