export default function getTecnicoAsignadoActivo(equipo) {
  if (!equipo?.reparaciones || !Array.isArray(equipo.reparaciones)) return null;

  const activas = equipo.reparaciones.filter(r => r.Finalizado === false);

  if (activas.length === 0) return null;

  const ordenadas = activas.sort((a, b) => {
    const fechaA = new Date(a.createdAt || 0);
    const fechaB = new Date(b.createdAt || 0);
    return fechaB - fechaA;
  });

  const actual = ordenadas[0];

  return actual?.idTecnico ? actual?.tecnico?.usuario : null;
}