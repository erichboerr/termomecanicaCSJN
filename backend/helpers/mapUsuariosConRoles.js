export const mapUsuariosConRoles = (usuarios) => {
  return usuarios.map((u) => ({
    id: u.idUsuario,
    nombre: u.usuario || 'Sin nombre',
    rol: u.rol?.rol || 'Sin rol',
    permisos: u.rol?.permisos || [],
    habilitado: u.flagHabilitado ?? true,
    creado: u.createdAt,
  }));
};