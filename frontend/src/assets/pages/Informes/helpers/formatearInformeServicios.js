import { formatearFecha, normalizarFechas } from "./formatearFecha.js";

export function formatearInformeServicios(data, fechaDesde, fechaHasta, filtro = {}) {
  const [fechaDesdeDate, fechaHastaDate] = normalizarFechas(fechaDesde, fechaHasta);

  let encabezado = `Reporte de servicios\nDesde: ${formatearFecha(fechaDesdeDate)}  Hasta: ${formatearFecha(fechaHastaDate)}\n`;

  if (filtro?.tipo && filtro?.valor) {
    encabezado += `Filtro por ${filtro.tipo}: ${filtro.valor}\n\n`;
  } else {
    encabezado += `\n`;
  }

  const cuerpo = data.map((servicio) => {
    const lineaPrincipal = `Fecha de Pedido: ${servicio.fecha}\nOficina: ${servicio.oficina}\nMarca: ${servicio.marca}   Modelo: ${servicio.modelo}\nPedido Reparación: ${servicio.pedido}\nTécnico Asignado: ${servicio.tecnicoAsignado}\n`;

    const observaciones = servicio.observaciones.map((obs, i) => {
      const estadoFinal = obs.estado ? `${obs.estado}` : "";
      return `${i + 1}) Fecha Visita: ${obs.fecha}. Técnico que revisó: ${obs.tecnico}. Observaciones: ${obs.observacion}. ${estadoFinal}`;
    }).join("\n");

    return `${lineaPrincipal}\n${observaciones}`;
  }).join("\n\n");

  return encabezado + cuerpo;
}