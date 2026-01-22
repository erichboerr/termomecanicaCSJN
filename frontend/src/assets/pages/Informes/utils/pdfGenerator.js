import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function generarPDFPorFechas(data) {
  const doc = new jsPDF()
  doc.text('Informe por Fechas', 14, 20)

  const columnas = ['ID', 'Fecha', 'Descripción']
  const filas = data.map(item => [item.id, item.fecha, item.descripcion])

  autoTable(doc, {
    startY: 30,
    head: [columnas],
    body: filas,
  })

  doc.save('informe_por_fechas.pdf')
}

export function generarPDFPorTecnico(data, tecnicoId) {
  const doc = new jsPDF()
  doc.text(`Informe por Técnico: ${tecnicoId}`, 14, 20)

  const columnas = ['ID', 'Fecha', 'Tarea', 'Estado']
  const filas = data.map(item => [item.id, item.fecha, item.tarea, item.estado])

  autoTable(doc, {
    startY: 30,
    head: [columnas],
    body: filas,
  })

  doc.save(`informe_tecnico_${tecnicoId}.pdf`)
}

export function generarPDFPorEquipo(data, equipoId, oficinaId) {
  const doc = new jsPDF()
  doc.text(`Informe por Equipo ${equipoId} en Oficina ${oficinaId}`, 14, 20)

  const columnas = ['ID', 'Fecha', 'Actividad', 'Responsable']
  const filas = data.map(item => [item.id, item.fecha, item.actividad, item.responsable])

  autoTable(doc, {
    startY: 30,
    head: [columnas],
    body: filas,
  })

  doc.save(`informe_equipo_${equipoId}_oficina_${oficinaId}.pdf`)
}
