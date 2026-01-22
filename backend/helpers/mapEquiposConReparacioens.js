export const mapEquiposConReparaciones = (equipos) => {
  return equipos.map((eq) => ({
    id: eq.idEquipoInstalado,
    serie: eq.serie || 'Sin serie',
    oficina: eq.oficina || 'Sin oficina',
    estado: eq.estado?.estado || 'Sin estado',
    marca: eq.equipo?.marca?.marca || 'Sin marca',
    modelo: eq.equipo?.modelo?.modelo || 'Sin modelo',
    potencia: eq.equipo?.potencia?.potencia || 'Sin potencia',
    capacidad: eq.equipo?.capacidad?.capacidad || 'Sin capacidad',
    gas: eq.equipo?.gasRefrigerante?.gasRefrigerante || 'Sin gas',
    alimentacion: eq.equipo?.alimentacion?.alimentacion || 'Sin alimentación',
    observaciones: eq.observaciones || '',
    foto1: eq.foto1Path || null,
    foto2: eq.foto2Path || null,
    habilitado: eq.flagHabilitado ?? true,
    reparaciones: (eq.reparaciones || []).map((r) => ({
      id: r.idReparaciones,
      pedido: r.ObservacionPedido || 'Sin pedido',
      tecnico: r.tecnico?.usuario || 'Sin técnico',
      supervisor: r.supervisor?.usuario || 'Sin supervisor',
      observaciones: r.observaciones?.map(o => o.observaciones) || [],
      creado: r.createdAt,
    })),
  }));
};