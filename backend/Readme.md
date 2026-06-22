# termomecanicaCSJN — Backend

Sistema de gestión de equipos termomecánicos y aires acondicionados para el Palacio de Justicia. Permite administrar el inventario de equipos instalados, reparaciones, mantenimiento preventivo y generación de reportes.

---

## Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| Node.js | 20.x | Runtime |
| Express | 4.18 | Framework HTTP |
| Sequelize | 6.37 | ORM |
| PostgreSQL | 18.x | Base de datos |
| JWT | 9.x | Autenticación |
| Bcrypt | 6.x | Hash de contraseñas |
| Multer | 2.x | Upload de imágenes |
| Sharp | 0.34 | Compresión de imágenes |
| Helmet | 8.x | Headers de seguridad HTTP |
| express-rate-limit | 8.x | Rate limiting |
| Winston | 3.x | Logging rotativo |
| dotenv-cli | 10.x | Carga de variables por entorno |

---

## Estructura del proyecto

```
backend/
├── config/
│   ├── config.cjs          # Config de sequelize-cli (migraciones)
│   ├── config.js           # Config alternativa ES module
│   ├── database.js         # Conexión Sequelize con DATABASE_URL
│   └── env.js              # Re-exporta variables de entorno
├── constants/
│   ├── roles.js            # IDs de roles como constantes nombradas
│   └── estados.js          # IDs de estados de equipos como constantes
├── controllers/            # Lógica de negocio por entidad
│   ├── UsuarioController.js
│   ├── EquipoController.js
│   ├── EquipoInstaladoController.js
│   ├── ReparacionesController.js
│   ├── ReportesController.js
│   ├── EquiposInstaladosPreventivosController.js
│   └── ...
├── dataBase/
│   └── db.js               # Instancia de Sequelize
├── helpers/
│   ├── logger.js           # Winston con rotación diaria
│   ├── getLogs.js          # Lectura de logs para el visor
│   ├── compressAndSave.js  # Compresión de imágenes con Sharp
│   ├── mapEquipo.js        # Serialización de equipos
│   ├── mapReparaciones.js  # Serialización de reparaciones
│   └── ...
├── middleware/
│   ├── authMiddleware.js   # Verificación JWT en cada request
│   └── uploads.js          # Configuración de Multer + sanitize-filename
├── migrations/             # Migraciones de base de datos (sequelize-cli)
├── models/
│   ├── index.js            # Definición de todas las asociaciones
│   ├── Usuario.js
│   ├── Equipo.js
│   ├── EquipoInstalado.js
│   ├── Reparaciones.js
│   ├── chequeo.js
│   ├── chequeosdetalles.js
│   └── ...
├── routes/
│   └── Routes.js           # Definición de todas las rutas REST
├── seedDB/
│   ├── cargarSeeds.js      # Seeds de roles, estados, usuarios base
│   └── seedCheckListItems.js
├── uploads/
│   └── photos/             # Fotos de equipos (gitignored en producción)
├── utils/
│   ├── formatearFecha.js
│   ├── limpiarCampo.js
│   └── preventivoCalendar.js
├── _scripts/
│   ├── deploy.sh           # Script de deploy completo
│   └── deploy_frontend.sh  # Script de deploy solo frontend
├── server.js               # Entry point principal
├── ecosystem.config.cjs    # Configuración PM2
├── .env                    # Variables de desarrollo (no commiteado)
├── .env.production         # Variables de producción (no commiteado)
└── package.json
```

---

## Variables de entorno

### `.env` (desarrollo)

```dotenv
NODE_ENV=development
DATABASE_URL=postgres://postgres:TU_PASSWORD@localhost:5432/sch_termomecanicaCSJN
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sch_termomecanicaCSJN
DB_USER=postgres
DB_PASSWORD=TU_PASSWORD
DB_DIALECT=postgres

BACKEND_URL=http://localhost:5050
FRONTEND_URL=http://localhost:5173
PORT=5050

DB_SYNC=false
DB_SEED=false
JWT_SECRET=tu-clave-secreta-larga
```

### `.env.production` (producción)

```dotenv
NODE_ENV=production
DATABASE_URL=postgres://USUARIO:PASSWORD@localhost:5432/NOMBRE_DB
DB_HOST=localhost
DB_PORT=5432
DB_NAME=NOMBRE_DB
DB_USER=USUARIO
DB_PASSWORD=PASSWORD
DB_DIALECT=postgres
DB_SSL=true

BACKEND_URL=https://tu-dominio.com
FRONTEND_URL=https://tu-dominio.com
PORT=5050

DB_SEED=false
JWT_SECRET=clave-generada-con-crypto-randomBytes-64
```

> ⚠️ Ninguno de estos archivos debe estar en el repositorio. Están incluidos en `.gitignore`.

### Generar JWT_SECRET seguro

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## Scripts disponibles

```bash
# Desarrollo con hot-reload
npm run dev

# Producción (carga .env.production)
npm run start:prod

# Migraciones (sobre DB de producción)
npm run db:migrate

# Deshacer todas las migraciones
npm run db:undo

# Ejecutar seeds
npm run db:seed
```

---

## Roles del sistema

Definidos en `constants/roles.js` y cargados por el seed inicial:

| ID | Constante | Nombre | Acceso |
|---|---|---|---|
| 1 | `ROLES.ADMIN` | Administrador | Acceso total |
| 2 | `ROLES.SUPERVISOR_TEKNIK` | Supervisor Teknik | Gestión completa de equipos |
| 3 | `ROLES.SUPERVISOR_PALACIO` | Supervisor Palacio | Listado y reportes |
| 4 | `ROLES.TECNICO` | Técnico | Reparaciones y carga de equipos |
| 5 | `ROLES.CLIENTE` | Cliente | Solo lectura vía QR |
| 6 | `ROLES.PREVENTIVO` | Preventivo | Mantenimiento preventivo |

---

## Estados de equipos

Definidos en `constants/estados.js`:

| ID | Constante | Descripción |
|---|---|---|
| 1 | `ESTADOS.OPERATIVO` | Equipo funcionando correctamente |
| 2 | `ESTADOS.MANTENIMIENTO` | En mantenimiento programado |
| 3 | `ESTADOS.URGENTE` | Requiere atención urgente |
| 4 | `ESTADOS.FUERA_DE_SERVICIO` | Dado de baja |

---

## API — Endpoints

### Públicos (sin token)

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/login` | Autenticación de usuario |
| `GET` | `/oficinas/:oficina` | Equipos por oficina (QR público) |
| `GET` | `/equipoDetalle/:id` | Detalle de equipo por ID (QR público) |

### Protegidos (requieren Bearer token)

#### Usuarios
| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/createUser` | Crear usuario |
| `POST` | `/createRol` | Crear rol |
| `GET` | `/usuarios/habilitados` | Listar usuarios habilitados |
| `GET` | `/usuarios` | Listar técnicos |
| `GET` | `/usuariosTecnicos` | Listar técnicos habilitados |
| `PUT` | `/usuarios/:id` | Actualizar usuario |
| `PUT` | `/actualizarPassword` | Cambiar contraseña |

#### Equipos
| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/equipos` | Crear equipo base |
| `POST` | `/createEquipoInstalado` | Instalar equipo (con fotos) |
| `GET` | `/equiposInstalados` | Listar equipos instalados |
| `GET` | `/equipos/buscarMarcaModelo` | Buscar por marca/modelo |
| `GET` | `/equipos/obtenerCapacidadesPorModelo` | Capacidades por modelo |
| `PUT` | `/actualizarEstadoEquipo/:id` | Actualizar estado |
| `PUT` | `/equiposInstalados/:id/baja` | Dar de baja equipo |
| `PUT` | `/equipos_instalados/:id/fotos` | Actualizar fotos |

#### Reparaciones
| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/crearReparacion` | Iniciar reparación |
| `POST` | `/observacionesReparacion` | Agregar observación |
| `POST` | `/finalizarReparacion` | Finalizar reparación (con transacción) |
| `GET` | `/reparacionesConDetalles` | Listado con detalles |
| `PUT` | `/reparaciones/asignar` | Asignar técnico |

#### Preventivo
| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/accionesPreventivas` | Registrar chequeo preventivo |
| `GET` | `/checklistItems` | Items del checklist por frecuencia |
| `GET` | `/checklistItems/validar` | Validar duplicado por equipo/mes |
| `GET` | `/equipos/:equipoId/preventivo` | Planilla preventiva de un equipo |

#### Reportes
| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/fechas` | Informe por rango de fechas |
| `GET` | `/tecnico` | Informe por técnico |
| `GET` | `/oficina` | Informe por oficina |

#### Admin
| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/logs` | Visor de logs (solo rol Admin) |

---

## Autenticación

JWT con expiración de **8 horas**. El token se envía en el header:

```
Authorization: Bearer <token>
```

El `authMiddleware` verifica el token en todas las rutas excepto `/login`, `/oficinas/:oficina` y `/equipoDetalle/:id`.

---

## Modelos y relaciones

```
Rol ──< Usuario
Equipo >── TipoEquipo
Equipo >── Marca
Equipo >── Modelo
Equipo >── Alimentacion
Equipo >── Potencia
Equipo >── Capacidad
Equipo >── GasRefrigerante
EquipoInstalado >── Equipo
EquipoInstalado >── Locacion
EquipoInstalado >── Estado
EquipoInstalado ──< Reparaciones
EquipoInstalado ──< Chequeo
Reparaciones ──< ObservacionesReparaciones
Chequeo >── EquipoInstalado     (FK normalizada)
Chequeo >── Usuario
Chequeo ──< ChequeoDetalle
ChequeoDetalle >── ChecklistItem
```

---

## Logging

Winston con rotación diaria en `backend/logs/YYYY-MM-DD.log`. Retención: 14 días. Formato:

```
[2026-06-10 14:23:01] WARN: Token inválido: jwt expired
```

El endpoint `GET /logs` permite al Administrador ver los logs desde la UI.

---

## Upload de imágenes

- Máximo 2 fotos por equipo
- Solo se aceptan archivos con `mimetype` que empiece con `image/`
- El nombre del archivo se sanitiza con `sanitize-filename`
- Las imágenes se comprimen con Sharp antes de guardarse
- Se almacenan en `backend/uploads/photos/`

---

## Instalación y desarrollo local

```bash
# 1. Clonar el repositorio
git clone https://github.com/erichboerr/termomecanicaCSJN.git
cd termomecanicaCSJN/backend

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env con las variables de desarrollo
cp .env.example .env   # o crearlo manualmente

# 4. Crear la base de datos en PostgreSQL
createdb sch_termomecanicaCSJN

# 5. Correr migraciones
npm run db:migrate

# 6. Arrancar en desarrollo
npm run dev
```

El servidor queda disponible en `http://localhost:5050`.

---

## Deploy en producción (Ubuntu Server + PM2 + Nginx)

### Primera vez

```bash
# En el servidor
cd /root/termomecanicaCSJN-postgeSQL
git pull origin main

# Instalar dependencias
cd backend && npm install

# Crear .env.production manualmente en el servidor
nano backend/.env.production

# Build del frontend
cd ../frontend && npm install && npm run build

# Levantar con PM2
cd ..
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup
```

### Deploy siguiente (usar script)

```bash
cd /root/termomecanicaCSJN-postgeSQL
bash _scripts/deploy.sh
```

### Comandos PM2 útiles

```bash
pm2 list                    # Estado de todos los procesos
pm2 logs backend            # Logs en tiempo real
pm2 logs backend --lines 100 # Últimas 100 líneas
pm2 restart backend         # Reiniciar (no recarga .env)
pm2 stop backend            # Detener
pm2 start ecosystem.config.cjs --env production  # Inicio con variables
```

---

## Configuración Nginx

```nginx
# Redirect HTTP → HTTPS
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;
    return 301 https://$host$request_uri;
}

# HTTPS principal
server {
    listen 443 ssl http2;
    server_name tu-dominio.com www.tu-dominio.com;

    ssl_certificate /etc/letsencrypt/live/tu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tu-dominio.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    location / {
        proxy_pass http://localhost:5050;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Renovación SSL (Let's Encrypt)

```bash
sudo certbot renew --dry-run   # Prueba
sudo certbot renew              # Renovar
sudo systemctl restart nginx
```

---

## Base de datos — operaciones útiles

```bash
# Conectar a la DB de producción
sudo -u postgres psql -d sch_termodinamicacsjn

# Backup
pg_dump -U postgres sch_termodinamicacsjn > backup_$(date +%Y%m%d).sql

# Restore
psql -U postgres -d sch_termodinamicacsjn < backup.sql
```

---

## Seguridad implementada

- ✅ JWT en todas las rutas excepto las públicas del QR
- ✅ Bcrypt para hash de contraseñas
- ✅ Helmet con CSP configurada
- ✅ Rate limiting en `/login` (10 intentos / 15 minutos)
- ✅ CORS restrictivo por entorno
- ✅ Validación de mimetype en uploads
- ✅ sanitize-filename en nombres de archivos subidos
- ✅ Transacciones en operaciones críticas (baja de equipo, finalizar reparación)
- ✅ `.env` excluidos del repositorio

---

## Ramas Git

| Rama | Propósito |
|---|---|
| `main` | Producción — lo que está corriendo en el servidor |
| `dev` | Desarrollo — cambios probados antes de mergear |
| `palacio` | Feature branch — rebrand y cambios específicos del Palacio |

```bash
# Flujo de trabajo
git checkout dev
# ... hacer cambios y probar ...
git checkout main
git merge dev
git push origin main
# ... deploy en servidor ...
```