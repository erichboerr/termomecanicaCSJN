import * as XLSX from "xlsx";

export const exportarEquiposAExcel = (equipos) => {
  if (!equipos || equipos.length === 0) return;

  const fecha = new Date().toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const encabezado = [
    ["Equipos Instalados"],
    [],
    [`Fecha de exportación: ${fecha}`],
  ];

  const tabla = equipos.map((e) => ({
    Locación: e.locacion?.locacion || "-",
    Oficina: e.oficina || "-",
    "Tipo de Equipo": e.equipo?.tipoEquipo?.tipoEquipo || "-",
    Marca: e.equipo?.marca?.marca || "-",
    Modelo: e.equipo?.modelo?.modelo || "-",
    Serie: e.serie || "-",
    Estado: e.estado?.estado || "-",
    Observaciones: e.observaciones || "-",
  }));

  const hoja = XLSX.utils.aoa_to_sheet(encabezado);
  XLSX.utils.sheet_add_json(hoja, tabla, { origin: "A4", skipHeader: false });

  hoja["!autofilter"] = { ref: `A4:H4` };
  hoja["!cols"] = [
    { wch: 15 },
    { wch: 20 },
    { wch: 20 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 25 },
    { wch: 30 },
  ];

  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Equipos Instalados");

  const timestamp = new Date()
    .toISOString()
    .replace(/[:\-T]/g, "_")
    .slice(0, 16); // yyyy_mm_dd_hh_mm

  XLSX.writeFile(libro, `equipos_instalados_${timestamp}.xlsx`);
};
