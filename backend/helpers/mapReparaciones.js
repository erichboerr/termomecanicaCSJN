export const mapReparaciones = (reparaciones) => {
  return reparaciones.map((r) => ({
    id: r.idReparaciones,
    pedido: r.ObservacionPedido,
    tecnico: r.tecnico?.usuario || 'Sin técnico',
    supervisor: r.supervisor?.usuario || 'Sin supervisor',
    equipo: r.equipoInstalado?.serie || 'Sin equipo',
    estado: r.equipoInstalado?.estado?.estado || 'Sin estado',
    marca: r.equipoInstalado?.equipo?.marca?.marca || 'Sin marca',
    modelo: r.equipoInstalado?.equipo?.modelo?.modelo || 'Sin modelo',
    observaciones: r.observaciones?.map(o => o.observaciones) || [],
    createdAt: r.createdAt,
  }));
};