export const mapEstadoEquipo = (estado) => {
  switch (estado?.toLowerCase()) {
    case 'operativo':
      return { texto: 'Operativo', color: 'green', icono: '✅' };
    case 'Mantenimiento':
      return { texto: 'En Mantenimiento', color: 'orange', icono: '🛠️' };
    case 'Fuera de servicio':
      return { texto: 'Fuera de servicio', color: 'red', icono: '❌' };
    case 'sin estado':
    default:
      return { texto: 'Sin estado', color: 'gray', icono: '❓' };
  }
};
