export function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO)
  const dia = String(fecha.getDate()).padStart(2, '0')
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const año = fecha.getFullYear()
  return `${dia}/${mes}/${año}`
}

export const normalizarFechas = (desde, hasta) => {
  const desdeDate = new Date(`${desde}T00:00:00`)
  const hastaDate = new Date(`${hasta}T23:59:59`)
  return [desdeDate, hastaDate]
}