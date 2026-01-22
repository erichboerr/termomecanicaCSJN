const API_URL = import.meta.env.VITE_API_URL;

export async function fetchPorFechas(desde, hasta) {
  if (!desde || !hasta) throw new Error('Fechas requeridas')
  const res = await fetch(`${API_URL}/fechas?desde=${desde}&hasta=${hasta}`)
  if (!res.ok) throw new Error('Error al obtener informe por fechas')
  return await res.json()
}

 export async function fetchPorTecnico(tecnicoNombre, desde, hasta) {
  if (!tecnicoNombre || !desde || !hasta) throw new Error('Datos incompletos');
  const res = await fetch(`${API_URL}/tecnico?tecnico=${encodeURIComponent(tecnicoNombre)}&desde=${desde}&hasta=${hasta}`);
  if (!res.ok) throw new Error('Error al obtener informe por técnico');
  return await res.json();
}

export async function fetchPorOficina(oficinaId, desde, hasta) {
  if (!oficinaId || !desde || !hasta) throw new Error('Datos incompletos')
  const res = await fetch(`${API_URL}/oficina?oficina=${oficinaId}&desde=${desde}&hasta=${hasta}`)
  if (!res.ok) throw new Error('Error al obtener informe por equipo')
  return await res.json()
}