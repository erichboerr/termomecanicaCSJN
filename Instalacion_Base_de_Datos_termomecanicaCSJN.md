# termomecanicaCSJN — Creación de la base de datos desde cero

Instructivo para crear la base de datos PostgreSQL, las tablas y los datos iniciales del backend, de modo que el sistema quede funcional.

Probado con: Ubuntu 24.04, PostgreSQL 16 y Node 22. El proyecto declara PostgreSQL 18 y Node 20+; el procedimiento es el mismo.

---

## 0. Qué se va a hacer (resumen)

| Paso | Qué hace | Cómo |
|---|---|---|
| 1 | Instalar Node, git y PostgreSQL | `apt` |
| 2 | Crear usuario y base de datos | `psql` |
| 3 | Instalar dependencias del backend | `npm install` |
| 4 | Crear `.env.production` | bloque copiable |
| 5 | Crear las 18 tablas | migraciones de Sequelize (`npm run db:migrate`) |
| 6 | Cargar los datos iniciales (seeds) | script de seeds |
| 7 | Verificar | consultas SQL |
| 8 | Levantar el sistema | PM2 |

> **Importante:** el camino oficial para crear las tablas son las **migraciones** (carpeta `backend/migrations`). **No** usar `DB_SYNC=true`: en `server.js` ese modo ejecuta `sync({ force: true })`, que **borra y recrea todas las tablas**.

---

## 1. Requisitos del servidor

```bash
sudo apt update
sudo apt install -y git curl postgresql postgresql-contrib build-essential

# Node.js 20 LTS (si ya hay Node 20 o superior instalado, saltear)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# PM2 (para dejar el backend corriendo)
sudo npm install -g pm2

# Verificar versiones
node -v && npm -v && psql --version
```

Comprobar que PostgreSQL está activo:

```bash
sudo systemctl enable --now postgresql
sudo -u postgres psql -c "SHOW ssl;"     # debe responder: on
```

> El backend en producción **exige conexión SSL** a la base (`config/database.js` usa `ssl: { require: true, rejectUnauthorized: false }`). En Ubuntu, PostgreSQL trae `ssl = on` con un certificado autofirmado por defecto, y con eso alcanza. Si `SHOW ssl;` responde `off`, hay que activarlo en `postgresql.conf`.

---

## 2. Crear usuario y base de datos

Editar **solo las tres primeras líneas** y pegar todo el bloque:

```bash
# ---- EDITAR ESTOS 3 VALORES ----
DB_NAME="sch_termodinamicacsjn"
DB_USER="usuario_app"
DB_PASS="CambiarEstaClave123"      # usar letras y números; evitar @ : / # ? % (rompen la URL de conexión)
# --------------------------------

sudo -u postgres psql <<SQL
CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASS}';
CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};
SQL

# Probar la conexión (pide la clave; salir con \q)
psql "postgres://${DB_USER}:${DB_PASS}@localhost:5432/${DB_NAME}" -c "SELECT current_database(), current_user;"
```

> Las variables `DB_NAME`, `DB_USER` y `DB_PASS` se usan también en los pasos 4 y 7. **Hay que seguir en la misma terminal**; si se cierra la sesión, volver a definirlas.

---

## 3. Obtener el proyecto e instalar dependencias

```bash
# Ubicación sugerida (la misma que usa ecosystem.config.cjs; ajustar si se usa otra)
cd /root
git clone <URL_DEL_REPOSITORIO> termomecanicaCSJN-postgeSQL
cd termomecanicaCSJN-postgeSQL/backend

npm install
```

> **No reutilizar la carpeta `node_modules` si el proyecto llegó dentro de un .zip.** Fue generada en Windows (los ejecutables `dotenv`, `sequelize-cli`, etc. son scripts de Windows y `bcrypt`/`sharp` son binarios nativos de otro sistema operativo). Si existe, borrarla y reinstalar:
>
> ```bash
> rm -rf node_modules && npm install
> ```

---

## 4. Crear el archivo `.env.production`

Se crea dentro de `backend/`. Este bloque lo genera completo usando las variables del paso 2 y crea un `JWT_SECRET` nuevo y aleatorio:

```bash
cd ~/termomecanicaCSJN-postgeSQL/backend   # ajustar si se clonó en otra ruta

# ---- EDITAR: dominio (o IP) con el que se va a acceder al sistema ----
SITE_URL="https://TU-DOMINIO.com"
# ----------------------------------------------------------------------

cat > .env.production <<ENV
NODE_ENV=production

DATABASE_URL=postgres://${DB_USER}:${DB_PASS}@localhost:5432/${DB_NAME}
DB_HOST=localhost
DB_PORT=5432
DB_NAME=${DB_NAME}
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASS}
DB_DIALECT=postgres
DB_SSL=true

BACKEND_URL=${SITE_URL}
FRONTEND_URL=${SITE_URL}

DB_SEED=false

JWT_SECRET=$(openssl rand -hex 64)

PORT=5050
ENV

chmod 600 .env.production
cat .env.production
```

Notas:

- `DB_SEED` queda en `false` a propósito. Los seeds se corren **una sola vez** en el paso 6 (ver advertencia).
- No existe `DB_SYNC` en este archivo, y así debe quedar.
- Si la contraseña de la base tiene caracteres especiales, en `DATABASE_URL` deben ir codificados (por ejemplo `@` → `%40`). Lo más simple es usar una clave sin símbolos.
- CORS en producción está fijado en `server.js` a `https://termomecanicacsjn.com` y `https://www.termomecanicacsjn.com`. **Si el sistema va a usar otro dominio, hay que cambiar esa lista en `server.js` (bloque `corsOptions`)** o el navegador bloqueará las llamadas a la API.

---

## 5. Crear las tablas (migraciones)

Desde la carpeta `backend/`:

```bash
npm run db:migrate
```

Debe terminar con 18 líneas `migrated` (de `a-create-Rol-table` a `p-create-chequeos_detalles`) y sin errores. Se crean estas tablas:

`roles`, `usuarios`, `locaciones`, `marcas`, `tipoEquipos`, `modelos`, `alimentaciones`, `capacidades`, `gas_refrigerantes`, `potencias`, `estados`, `equipos`, `equipos_instalados`, `reparaciones`, `observaciones_reparaciones`, `checklist_items`, `chequeos`, `chequeos_detalles` (más `SequelizeMeta`, que lleva el control de las migraciones).

Ver el estado de las migraciones en cualquier momento:

```bash
npx dotenv -e .env.production -- sequelize-cli db:migrate:status
```

---

## 6. Cargar los datos iniciales (seeds)

Ejecutar **una sola vez**, desde `backend/`. Corre `cargarSeeds()` y luego `seedChecklistItems()`, igual que lo hace `server.js` cuando `DB_SEED=true`:

```bash
NODE_ENV=production node --input-type=module -e "
import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });
const { cargarSeeds } = await import('./seedDB/cargarSeeds.js');
const { seedChecklistItems } = await import('./seedDB/seedChekListItems.js');
await cargarSeeds();
await seedChecklistItems();
process.exit(0);
"
```

Salida esperada:

```
🌱 Alimentaciones cargadas
🌱 Estados cargados
🌱 Roles cargados
🌱 Capacidades cargadas
🌱 Locaciones cargadas
🌱 Locaciones cargadas
👤 Usuario Administrador creado exitosamente
👤 Usuario Supervisor Teknik creado exitosamente
👤 Usuario Supervisor CSJN creado exitosamente
👤 Usuario Tecnico creado exitosamente
👤 Usuario Cliente creado exitosamente
👤 Usuario Preventivo creado exitosamente
✅ Ítems de checklist insertados y secuencia estable.
```

(El segundo "Locaciones cargadas" corresponde en realidad a los tipos de equipo; es solo un texto de log repetido en el código.)

> ⚠️ **Advertencia — `seedChecklistItems` borra datos.** Hace `TRUNCATE` de `chequeos`, `chequeos_detalles` y `checklist_items`. En una base nueva no importa, pero **una vez que el sistema está en uso, no volver a correr este seed ni dejar `DB_SEED=true`**, porque se pierde todo el historial de chequeos preventivos. `cargarSeeds()` en cambio es seguro de repetir (no duplica nada).

### Qué datos quedan cargados

| Tabla | Contenido |
|---|---|
| `roles` | 1 Administrador · 2 Supervisor Teknik · 3 Supervisor CSJN · 4 Técnico · 5 Cliente · 6 Preventivo |
| `usuarios` | 6 usuarios, uno por rol (ver sección 9) |
| `estados` | 1 OPERATIVO · 2 MANTENIMIENTO · 3 URGENTE · 4 FUERA DE SERVICIO |
| `alimentaciones` | 220V · 380V |
| `capacidades` | 2200 · 3000 · 4500 · 6000 · 3 TR · 6 TR |
| `locaciones` | CSJN |
| `tipoEquipos` | SPLIT |
| `checklist_items` | 23 ítems: 9 mensuales, 8 trimestrales, 4 semestrales, 2 anuales |

Los IDs de roles y estados están fijados en el código (`constants/roles.js`, `constants/estados.js`), por eso los seeds deben correrse sobre tablas vacías y recién creadas.

### Alternativa: cargar los seeds al arrancar el servidor

Equivale a lo anterior. Poner `DB_SEED=true` en `.env.production`, arrancar el servidor una vez, esperar el mensaje `🌱 seeders cargados`, y **volver a poner `DB_SEED=false`** y reiniciar.

---

## 7. Verificar

```bash
psql "postgres://${DB_USER}:${DB_PASS}@localhost:5432/${DB_NAME}" <<'SQL'
SELECT 'tablas'          AS control, count(*) AS cantidad FROM information_schema.tables WHERE table_schema='public'
UNION ALL SELECT 'roles',           count(*) FROM roles
UNION ALL SELECT 'usuarios',        count(*) FROM usuarios
UNION ALL SELECT 'estados',         count(*) FROM estados
UNION ALL SELECT 'alimentaciones',  count(*) FROM alimentaciones
UNION ALL SELECT 'capacidades',     count(*) FROM capacidades
UNION ALL SELECT 'locaciones',      count(*) FROM locaciones
UNION ALL SELECT 'tipoEquipos',     count(*) FROM "tipoEquipos"
UNION ALL SELECT 'checklist_items', count(*) FROM checklist_items;
SQL
```

Resultado esperado: `tablas` = 19, `roles` = 6, `usuarios` = 6, `estados` = 4, `alimentaciones` = 2, `capacidades` = 6, `locaciones` = 1, `tipoEquipos` = 1, `checklist_items` = 23.

---

## 8. Levantar el sistema

Primera prueba, en primer plano (cortar con `Ctrl+C`):

```bash
cd ~/termomecanicaCSJN-postgeSQL/backend
npm run start:prod
```

Debe mostrar `🚀 Servidor corriendo en el puerto: 5050` y `✅ Base de datos conectada`.

Dejarlo como servicio con PM2:

```bash
cd ~/termomecanicaCSJN-postgeSQL
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup          # ejecutar el comando que muestre
pm2 logs backend --lines 50
```

> `ecosystem.config.cjs` tiene fijada la ruta `cwd: "/root/termomecanicaCSJN-postgeSQL/backend"`. Si el proyecto está en otra carpeta, editar ese valor antes de arrancar.

En producción el backend también sirve el frontend desde `../frontend/dist`. Para generarlo:

```bash
cd ~/termomecanicaCSJN-postgeSQL/frontend && npm install && npm run build
```

Para publicarlo en un dominio con HTTPS, usar Nginx como proxy a `localhost:5050` (ejemplo completo en `backend/Readme.md`).

---

## 9. Usuarios iniciales y contraseñas

El seed crea estos usuarios (las contraseñas están guardadas encriptadas con bcrypt):

| Usuario | Rol |
|---|---|
| `Administrador` | Administrador (acceso total) |
| `Supervisor Teknik` | Supervisor Teknik |
| `Supervisor CSJN` | Supervisor CSJN |
| `Tecnico` | Técnico |
| `Cliente` | Cliente |
| `Preventivo` | Preventivo |

**Las contraseñas iniciales las entrega el desarrollador por separado** (no figuran en este documento). Se recomienda cambiarlas en el primer ingreso (existe el endpoint `PUT /actualizarPassword`).

### Si hace falta fijar una contraseña directamente en la base

Por ejemplo, para poder entrar con `Administrador` sin conocer la clave original. Editar `NUEVA_CLAVE` y `USUARIO`, desde `backend/`:

```bash
NUEVA_CLAVE="CambiarEstaClave123"
USUARIO="Administrador"

HASH=$(node -e "require('bcrypt').hash(process.argv[1],10).then(console.log)" "$NUEVA_CLAVE")

psql "postgres://${DB_USER}:${DB_PASS}@localhost:5432/${DB_NAME}" -v hash="$HASH" -v usr="$USUARIO" <<'SQL'
UPDATE usuarios SET password = :'hash' WHERE usuario = :'usr';
SQL
```

Debe responder `UPDATE 1`. Nota: el login tiene límite de 10 intentos cada 15 minutos por IP.

---

## 10. Datos que NO vienen cargados (se completan desde el sistema)

Los seeds no incluyen `marcas`, `modelos`, `potencias`, `gas_refrigerantes`, `equipos`, `equipos_instalados`, `reparaciones` ni `chequeos`. Quedan vacías. Marcas, modelos, potencias y gases refrigerantes se agregan desde la aplicación (endpoint `POST /select/:key`, con usuario con permisos) antes de poder dar de alta equipos. Los equipos instalados, reparaciones y chequeos se generan con el uso normal.

---

## 11. Volver a empezar de cero (solo bases de prueba)

> ⚠️ Borra **todas** las tablas y datos. No usar sobre una base con datos reales.

```bash
cd ~/termomecanicaCSJN-postgeSQL/backend
npm run db:undo        # elimina todas las tablas
npm run db:migrate     # las vuelve a crear
# luego repetir el paso 6 (seeds) y el paso 7 (verificación)
```

O, más drástico, borrar y recrear la base entera:

```bash
sudo -u postgres psql <<SQL
DROP DATABASE ${DB_NAME};
CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};
SQL
```

---

## 12. Problemas frecuentes

| Síntoma | Causa y solución |
|---|---|
| `The server does not support SSL connections` | PostgreSQL con `ssl = off`. El backend exige SSL en producción: activar `ssl = on` en `postgresql.conf` y reiniciar PostgreSQL. |
| `password authentication failed` | Clave mal escrita o con caracteres especiales sin codificar en `DATABASE_URL`. Usar una clave sin símbolos o codificarlos (`@` → `%40`). |
| `DATABASE_URL no está definida. Abortando.` | No se cargó `.env.production`. Ejecutar los comandos desde la carpeta `backend/` y verificar que el archivo existe. |
| `dotenv: not found` / `node.exe: not found` | `node_modules` viene de Windows. Borrarla y correr `npm install` (ver paso 3). |
| `relation "..." does not exist` al correr los seeds | Faltó el paso 5. Correr `npm run db:migrate`. |
| Error al correr migraciones por tablas ya existentes | La base ya tenía tablas. Ver `db:migrate:status`; para empezar limpio, usar la sección 11. |
| El frontend carga pero la API falla por CORS | El dominio no está en la lista `corsOptions` de `server.js` (ver nota del paso 4). |
| Los seeds no muestran error pero faltan datos | Los seeds capturan los errores y solo los imprimen (`❌ Error al cargar seeds`). Revisar el log y correr la verificación del paso 7. |
