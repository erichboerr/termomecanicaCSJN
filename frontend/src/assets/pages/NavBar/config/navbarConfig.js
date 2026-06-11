export const NAVBAR_ITEMS = {
  admin: {
    Usuarios: [
      {
        label: "Nuevo Usuario",
        path: "/AltaUsuario",
        icon: "bi bi-people text primary",
      },
      {
        label: "Baja de usuario",
        path: "/BajaUsuario",
        icon: "bi bi-person-dash text-danger",
      },
      {
        label: "Actualizar contraseña",
        path: "/ActualizarPassword",
        icon: "bi bi-key text-warning",
      },
    ],
    Equipos: [
      {
        label: "Alta de Equipo",
        path: "/AltaEquipo",
        icon: "bi bi-clipboard-check",
      },
      {
        label: "Cargar Equipo",
        path: "/InstalarEquipo",
        icon: "bi bi-clipboard-minus",
      },
      {
        label: "Actualizar Fotos",
        path: "/ActualizarEquipo",
        icon: "bi bi-clipboard-check",
      },
      {
        label: "Listado de Equipos",
        path: "/ListadoEquipos",
        icon: "bi bi-clipboard-data",
      },
      {
        label: "Asignar Técnico",
        path: "/AsignarTecnico",
        icon: "bi bi-person-fill-gear",
      },
      {
        label: "Reparaciones Equipos",
        path: "/ReparacionesEquipos",
        icon: "bi bi-tools",
      },
      {
        label: "Baja Equipo",
        path: "/BajaEquipo",
        icon: "bi bi-clipboard2-x-fill text-danger",
      },
    ],
    Preventivo: [
      {
        label: "Listado de Equipos Preventivo",
        path: "/ListadoEquipoPreventivo",
        icon: "bi bi-clipboard-data",
      },
    ],
    Reportes: [
      {
        label: "Reportes",
        path: "/Reportes",
        icon: "bi bi-file-earmark-bar-graph",
      },

      {
        label: "Logs del sistema",
        path: "/logs",
        icon: "bi bi-file-earmark-text text-info",
      },
    ],
  },

  supervisorTekNet: {
    Usuarios: [
      {
        label: "Nuevo Usuario",
        path: "/AltaUsuario",
        icon: "bi bi-people text primary",
      },
      {
        label: "Actualizar contraseña",
        path: "/ActualizarPassword",
        icon: "bi bi-key text-warning",
      },
    ],
    Equipos: [
      {
        label: "Alta de Equipo",
        path: "/AltaEquipo",
        icon: "bi bi-clipboard-check",
      },
      {
        label: "Cargar Equipo",
        path: "/InstalarEquipo",
        icon: "bi bi-clipboard-minus",
      },
      {
        label: "Actualizar Fotos",
        path: "/ActualizarEquipo",
        icon: "bi bi-clipboard-check",
      },
      {
        label: "Listado de Equipos",
        path: "/ListadoEquipos",
        icon: "bi bi-clipboard-data",
      },
      {
        label: "Asignar Técnico",
        path: "/AsignarTecnico",
        icon: "bi bi-person-fill-gear",
      },
      {
        label: "Reparaciones Equipos",
        path: "/ReparacionesEquipos",
        icon: "bi bi-tools",
      },
      {
        label: "Baja Equipo",
        path: "/BajaEquipo",
        icon: "bi bi-clipboard2-x-fill text-danger",
      },
    ],
    Preventivo: [
      {
        label: "Listado de Equipos Preventivo",
        path: "/ListadoEquipoPreventivo",
        icon: "bi bi-clipboard-data",
      },
    ],
    Reportes: [
      {
        label: "Reportes",
        path: "/Reportes",
        icon: "bi bi-file-earmark-bar-graph",
      },
    ],
  },
  supervisorPalacio: {
    Equipos: [
      {
        label: "Listado de Equipos",
        path: "/ListadoEquipos",
        icon: "bi bi-clipboard-data",
      },
      {
        label: "Reportes",
        path: "/Reportes",
        icon: "bi bi-file-earmark-bar-graph",
      },
    ],
  },
  tecnico: {
    Equipos: [
      {
        label: "Cargar Equipo",
        path: "/InstalarEquipo",
        icon: "bi bi-clipboard-minus",
      },
      {
        label: "Reparaciones Equipos",
        path: "/ReparacionesEquipos",
        icon: "bi bi-tools",
      },
    ],
  }, 
  preventivo: {
    Preventivo: [
      {
        label: "Listado de Equipos Preventivo",
        path: "/ListadoEquipoPreventivo",
        icon: "bi bi-clipboard-data",
      },
    ],
  },
   cliente: {},
};
