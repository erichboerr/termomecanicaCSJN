export const mapEquipo = (equipos) => {
  return equipos.map((e) => ({
    id: e.idEquipo,
    marca: e.marca?.marca || 'Sin marca',
    modelo: e.modelo?.modelo || 'Sin modelo',
    potencia: e.potencia?.potencia || 'Sin potencia',
    capacidad: e.capacidad?.capacidad || 'Sin capacidad',
    gas: e.gasRefrigerante?.gasRefrigerante || 'Sin gas',
    alimentacion: e.alimentacion?.alimentacion || 'Sin alimentación',
    flagHabilitado: e.flagHabilitado ?? true,
    createdAt: e.createdAt,
  }));
};