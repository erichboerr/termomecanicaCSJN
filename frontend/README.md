# termomecanicaCSJN — Frontend

Aplicación React para la gestión de equipos termomecánicos y aires acondicionados del Palacio de Justicia. Permite administrar el inventario de equipos instalados, reparaciones, mantenimiento preventivo, reportes y acceso vía código QR.

---

## Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19.x | Framework UI |
| Vite | 7.x | Bundler y dev server |
| React Router DOM | 7.x | Navegación SPA |
| Axios | 1.x | HTTP client con interceptor JWT |
| Bootstrap | 5.3 | Estilos y componentes |
| Bootstrap Icons | 1.13 | Iconografía |
| React Bootstrap | 2.x | Componentes Bootstrap en React |
| jsPDF + autotable | 3.x | Generación de reportes PDF |
| html2pdf.js | 0.12 | Exportación HTML a PDF |
| ExcelJS | 3.x | Exportación a Excel |
| qrcode.react | 4.x | Generación de códigos QR |

---

## Estructura del proyecto

```
frontend/
├── public/
│   ├── favicon.png
│   └── _redirects          # Soporte SPA en hosting estático
├── src/
│   ├── App.jsx             # Raíz de la app — monta AuthProvider y Rutas
│   ├── main.jsx            # Entry point
│   ├── config/
│   │   └── env.js          # Variables de entorno centralizadas
│   ├── context/
│   │   ├── AuthContext.js      # Contexto de autenticación
│   │   ├── AuthProvider.jsx    # Proveedor — maneja estado global de auth
│   │   ├── useAuth.js          # Hook de acceso al contexto
│   │   └── helpers/
│   │       └── revalidateAuth.js  # Revalida token desde sessionStorage
│   ├── routes/
│   │   └── Rutas.jsx       # Definición de todas las rutas
│   ├── utils/
│   │   ├── axiosInstance.js    # Instancia global con interceptor JWT
│   │   └── clientLogger.js     # Logger de errores del cliente
│   └── assets/
│       ├── common/             # Componentes y helpers reutilizables
│       │   ├── components/
│       │   │   ├── RequireAuth.jsx     # Guard de rutas autenticadas
│       │   │   ├── ToastFeedback.jsx   # Notificaciones flotantes
│       │   │   └── FormRow.jsx         # Fila de formulario genérica
│       │   ├── modals/
│       │   │   ├── EquipoCard/         # Tarjeta de detalle de equipo
│       │   │   ├── ModalEquipoCard.jsx
│       │   │   ├── ModalMotivo.jsx
│       │   │   └── ModalQR.jsx
│       │   ├── helpers/
│       │   │   ├── authHelpers.js          # getRedirectPath según rol
│       │   │   ├── exportarExcel.jsx       # Exportación a Excel (ExcelJS)
│       │   │   ├── getEstadoClass.js       # Clase CSS según estado
│       │   │   └── getMarcaModelo.js
│       │   └── css/
│       └── pages/
│           ├── Header/             # Logo + subtítulo responsivo
│           ├── NavBar/             # Navbar con menú por rol
│           ├── Login/              # Formulario de login
│           ├── AltaUsuario/        # Crear usuario
│           ├── BajaUsuario/        # Deshabilitar usuario
│           ├── ModificacionUsuario/# Cambiar contraseña
│           ├── AltaEquipo/         # Crear equipo base
│           ├── InstalarEquipo/     # Instalar equipo en ubicación
│           ├── ActualizarEquipo/   # Actualizar fotos de equipo
│           ├── ListadosEquipos/    # Listado principal con filtros y QR
│           ├── ListadosEquiposPreventivo/ # Mantenimiento preventivo
│           ├── AsignarTecnico/     # Asignar técnico a reparación
│           ├── BajaEquipo/         # Dar de baja equipo
│           ├── ReparacionesEquipos/# Gestión de reparaciones
│           ├── Informes/           # Reportes PDF por fecha/técnico/oficina
│           ├── PedidoCliente/      # Vista pública acceso por QR
│           └── admin/              # Visor de logs (solo Admin)
├── .env                    # Variables de desarrollo (no commiteado)
├── .env.production         # Variables de producción (no commiteado)
├── vite.config.js
└── package.json
```

---

## Variables de entorno

### `.env` (desarrollo)

```dotenv
VITE_API_URL=http://localhost:5050
VITE_BACKEND_URL=http://localhost:5050
VITE_FRONT_URL=http://localhost:5173
```

### `.env.production` (producción — en el servidor)

```dotenv
VITE_API_URL=https://tu-dominio.com
VITE_BACKEND_URL=https://tu-dominio.com
VITE_FRONT_URL=https://tu-dominio.com
```

> ⚠️ Estos archivos no están en el repositorio. Deben crearse manualmente en cada entorno.

Las variables están centralizadas en `src/config/env.js`:

```js
export const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5050';
export const frontendUrl = import.meta.env.VITE_FRONT_URL || 'http://localhost:5173';
export const isDev = import.meta.env.MODE === 'development';
export const isProd = import.meta.env.MODE === 'production';
```

---

## Scripts disponibles

```bash
# Desarrollo con hot-reload en localhost:5173
npm run dev

# Build de producción (genera /dist)
npm run build

# Preview del build de producción
npm run preview

# Linting
npm run lint
```

---

## Autenticación

La sesión se maneja con `sessionStorage` (se limpia al cerrar el navegador):

| Key | Contenido |
|---|---|
| `token` | JWT de 8 horas de expiración |
| `usuario` | Nombre del usuario logueado |
| `rolId` | ID numérico del rol |
| `userId` | ID del usuario |
| `expiresAt` | Timestamp de expiración (Date.now() + 8h) |

### Flujo de autenticación

```
Login → POST /login → guarda en sessionStorage → revalidateAuth() → AuthProvider actualiza estado global
```

`revalidateAuth.js` verifica en cada carga si el token expiró comparando `expiresAt` con `Date.now()`. Si expiró, limpia `sessionStorage` y desautentica.

### axiosInstance

Todas las llamadas al backend (excepto login) usan `axiosInstance` que agrega automáticamente el token:

```js
// src/utils/axiosInstance.js
axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

---

## Sistema de roles y navbar

El menú se construye dinámicamente según el `rolId` del usuario logueado.

### Mapeo rolId → key

```js
// src/assets/pages/NavBar/helpers/mapRolId.js
const map = {
  1: "admin",
  2: "supervisorTekNet",
  3: "supervisorPalacio",
  4: "tecnico",
  5: "cliente",
  6: "preventivo",
};
```

### Acceso por rol

| Rol | Acceso |
|---|---|
| **Admin** | Todo: usuarios, equipos, reparaciones, preventivo, reportes, logs |
| **Supervisor Teknik** | Equipos, reparaciones, preventivo, reportes, usuarios |
| **Supervisor Palacio** | Listado de equipos y reportes |
| **Técnico** | Cargar equipo y reparaciones |
| **Preventivo** | Listado de equipos preventivo |
| **Cliente** | Sin menú — solo acceso vía QR |

Los ítems de cada sección están definidos en `navbarConfig.js` como un objeto indexado por la key del rol.

---

## Rutas

### Públicas (sin login)

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Login` | Página de inicio |
| `/login` | `Login` | Login |
| `/equipoDetalle?id=X` | `EquipoDetalle` | Vista de equipo por QR (acceso directo) |

### Protegidas (requieren login — `RequireAuth`)

| Ruta | Componente | Rol mínimo |
|---|---|---|
| `/ListadoEquipos` | `ListadoEquipo` | Todos |
| `/AltaEquipo` | `AltaEquipo` | Admin / Sup. Teknik |
| `/InstalarEquipo` | `InstalarEquipo` | Admin / Sup. Teknik / Técnico |
| `/ActualizarEquipo` | `ActualizarEquipo` | Admin / Sup. Teknik |
| `/AsignarTecnico` | `AsignarTecnico` | Admin / Sup. Teknik |
| `/ReparacionesEquipos` | `ReparacionesEquipos` | Admin / Sup. Teknik / Técnico |
| `/BajaEquipo` | `BajaEquipo` | Admin |
| `/AltaUsuario` | `AltaUsuario` | Admin / Sup. Teknik |
| `/BajaUsuario` | `BajaUsuario` | Admin |
| `/ActualizarPassword` | `ActualizarPassword` | Admin |
| `/Reportes` | `ReportesPage` | Admin / Supervisores |
| `/listadoEquipoPreventivo` | `ListadoEquipoPreventivo` | Admin / Sup. Teknik / Preventivo |
| `/logs` | `LogsViewer` | Admin |
| `/entrada-qr` | `EntradaDesdeQR` | Todos |

### Guard `RequireAuth`

Redirige a `/Login?redirect=<ruta-original>` si el usuario no está autenticado. Después del login, navega automáticamente a la ruta original preservando los query params (ej: `?id=1`).

---

## Páginas principales

### Login
Formulario con validación. Después del login exitoso navega al `redirect` guardado o a `/ListadoEquipos`. Usa `axios` directo (sin token) apuntando a `VITE_API_URL`.

### Listado de Equipos
Tabla con filtros por locación, oficina, tipo de equipo, marca y estado. Permite:
- Ver detalle del equipo (modal con fotos)
- Generar QR por equipo
- Exportar a Excel (ExcelJS)
- Aplicar acciones (cambiar estado, observaciones)

### Instalación de Equipo
Formulario en pasos para instalar un equipo existente en una ubicación. Sube hasta 2 fotos (comprimidas en el backend con Sharp).

### Reparaciones
Listado de equipos con reparaciones activas. Permite asignar técnico, agregar observaciones y finalizar la reparación. La finalización es atómica (transacción en el backend).

### Preventivo
Listado de equipos habilitados para mantenimiento preventivo. Al hacer clic abre un modal con el checklist según la frecuencia calculada automáticamente (mensual/trimestral/semestral/anual). Valida que no exista un chequeo duplicado para el mismo equipo en el mismo mes.

### Reportes
Tres tipos de informe exportables a PDF:
- Por rango de fechas
- Por técnico
- Por oficina

Generados con jsPDF + autotable con logo y formato institucional.

### Acceso por QR
Cada equipo instalado tiene un QR que apunta a `/equipoDetalle?id=<idEquipoInstalado>`. Al escanearlo:
1. Si el usuario no está logueado → redirige al login preservando la URL con el ID
2. Después del login → muestra el detalle del equipo con fotos y botón de pedido de revisión

### Logs del sistema
Visor en tiempo real de los logs del servidor (Winston). Solo accesible para el rol Admin.

---

## Exportación a Excel

```js
// src/assets/common/helpers/exportarExcel.jsx
// Usa ExcelJS — genera el archivo en el browser y dispara la descarga
await wb.xlsx.writeBuffer() → Blob → URL.createObjectURL → <a>.click()
```

Incluye encabezado con fecha de exportación, autofilter y anchos de columna configurados.

---

## Generación de PDF

```js
// src/assets/pages/Informes/utils/pdfGenerator.js
// Usa jsPDF + jspdf-autotable
// Logo institucional en base64 (logoBase64.js)
// Tabla con estilos personalizados por tipo de informe
```

---

## Instalación y desarrollo local

```bash
# 1. Clonar el repositorio
git clone https://github.com/erichboerr/termomecanicaCSJN.git
cd termomecanicaCSJN/frontend

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env
# Crear manualmente con:
# VITE_API_URL=http://localhost:5050
# VITE_BACKEND_URL=http://localhost:5050
# VITE_FRONT_URL=http://localhost:5173

# 4. Arrancar en desarrollo
npm run dev
```

El frontend queda disponible en `http://localhost:5173`.  
El backend debe estar corriendo en `http://localhost:5050`.

---

## Build y deploy

```bash
# Generar el build de producción
npm run build
# Genera la carpeta /dist que el backend sirve como estático en producción
```

En producción el backend Express sirve `/dist` directamente — no se necesita Nginx para el frontend, solo para el proxy HTTPS → backend.

### Deploy en servidor

```bash
cd /root/termomecanicaCSJN-postgeSQL/frontend
npm install
npm run build
pm2 restart backend
```

---

## Convenciones del proyecto

### Estructura por página
Cada página sigue el patrón:
```
NombrePagina/
├── NombrePagina.jsx     # Componente raíz de la página
├── components/          # Subcomponentes específicos
├── hooks/               # Custom hooks (lógica de estado)
├── helpers/             # Funciones puras (llamadas API, utils)
├── services/            # Llamadas a la API agrupadas
└── css/                 # Estilos scoped
```

### HTTP
- Todas las llamadas autenticadas usan `axiosInstance` (agrega token automáticamente)
- El login usa `axios` directo con URL completa
- Las imágenes de equipos usan URL directa con `backendUrl` de `env.js`

### Estado de autenticación
- Global via `AuthContext` / `AuthProvider`
- Persistido en `sessionStorage` (no `localStorage` — se limpia al cerrar el tab)
- Revalidado en cada montaje del `AuthProvider`

---

## Ramas Git

| Rama | Propósito |
|---|---|
| `main` | Producción |
| `dev` | Desarrollo — cambios probados antes de mergear |
| `palacio` | Feature branch — rebrand y cambios específicos del Palacio |

```bash
# Flujo de trabajo
git checkout dev
# ... hacer cambios y probar ...
git checkout main
git merge dev
git push origin main
# ... rebuild frontend en servidor ...
```