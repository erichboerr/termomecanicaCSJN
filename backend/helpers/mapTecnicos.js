export const mapTecnicos = (tecnicos) => {
  return tecnicos.map((t) => ({
    id: t.idUsuario,
    nombre: t.usuario || 'Sin nombre',
    rol: t.rol?.rol || 'Sin rol',
    habilitado: t.flagHabilitado ?? true,
  }));
};
