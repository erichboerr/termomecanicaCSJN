export const getLoginRedirect = (role) => {
  switch (role) {
    case 'admin': return '/admin/dashboard';
    case 'tecnico': return '/tecnico/reportes';
    default: return '/login';
  }
};

export const getReportUrl = (fecha, tecnicoId) =>
  `/reportes?fecha=${fecha}&tecnico=${tecnicoId}`;