import { formatearFecha, normalizarFechas } from "../helpers/formatearFecha.js";

export function formatearInformeServicios(data, fechaDesde, fechaHasta) {
  const [fechaDesdeDate, fechaHastaDate] = normalizarFechas(fechaDesde, fechaHasta);

  const encabezado = `Reporte de servicios\nDesde: ${formatearFecha(fechaDesdeDate)}  Hasta: ${formatearFecha(fechaHastaDate)}\n\n`;

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