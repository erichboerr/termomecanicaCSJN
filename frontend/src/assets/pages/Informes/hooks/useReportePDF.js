import jsPDF from "jspdf";
import logoBase64 from "../logoBase64";
function preprocesarEstado(texto) {
  const estadoRegex = /\((Equipo Reparado|Pendiente de reparación)\)/;
  const match = texto.match(estadoRegex);

  if (!match) return { texto, estado: null };

  const estado = match[0];
  const marcador = "[[ESTADO]]";
  const textoPreprocesado = texto.replace(estado, marcador);

  return { texto: textoPreprocesado, estado, marcador };
}
function renderBloqueConEstado(doc, bloque, x, y, estado, marcador) {
  if (estado && bloque.includes(marcador)) {
    const partes = bloque.split(marcador);

    // Antes del estado
    doc.setFont("helvetica", "normal");
    doc.text(partes[0], x, y);

    // Estado en negrita
    doc.setFont("helvetica", "bold");
    doc.text(estado, x + doc.getTextWidth(partes[0]), y);

    // Después del estado
    if (partes[1]) {
      doc.setFont("helvetica", "normal");
      doc.text(partes[1], x + doc.getTextWidth(partes[0] + estado), y);
    }
  } else {
    doc.setFont("helvetica", "normal");
    doc.text(bloque, x, y);
  }
}
export function useReportePDF(texto, filtro) {
  const descargarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(10);

    // 🖼️ Insertar logo arriba a la derecha
    doc.addImage(logoBase64, 'PNG', 160, 8, 30, 15); // X, Y, width, height

    const lineas = texto.split("\n");
    let y = 28; // bajamos el inicio para no pisar el logo

    // Encabezado
    let i = 0;
    while (i < lineas.length && lineas[i].trim() !== "") {
      const linea = lineas[i];
      doc.setFont("helvetica", "bold");
      doc.text(linea, 10, y);
      y += 6;
      i++;
    }

    // Filtro destacado
    if (filtro?.tipo && filtro?.valor) {
      const lineaFiltro = `${filtro.tipo}: ${filtro.valor}`;
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 102, 204);
      doc.text(lineaFiltro, 10, y);
      doc.setTextColor(0, 0, 0);
      y += 6;
    }

    y += 4;

    // Resto del contenido (sin cambios)
    for (; i < lineas.length; i++) {
      const linea = lineas[i];
      const esSubindice = /^\s*\d+\)/.test(linea);
      let margenX = esSubindice ? 30 : 10;
      let textoRender = linea;

      if (esSubindice) {
        const match = linea.match(/^(\s*\d+\))\s*(.*)/);
        if (match) {
          const [_, indice, resto] = match;
          doc.setFont("helvetica", "bold");
          doc.text(indice, 25, y);
          doc.setFont("helvetica", "normal");
          textoRender = resto;
        }
      }

      const {
        texto: textoRenderPreprocesado,
        estado,
        marcador,
      } = preprocesarEstado(textoRender);
      const bloques = doc.splitTextToSize(textoRenderPreprocesado, 160);

      bloques.forEach((bloque) => {
        renderBloqueConEstado(doc, bloque, margenX, y, estado, marcador);
        y += 5;
        if (y > 280) {
          doc.addPage();
          y = 10;
        }
      });

      if (esSubindice) y += 2;
    }

    doc.save("reporte_servicios.pdf");
  };

  return { descargarPDF };
}

export default useReportePDF;
