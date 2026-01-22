import html2pdf from "html2pdf.js";
import { usePreventivo } from "../hooks/usePreventivo";
import "../css/estilos-pdf.css";

const ListadoModal = ({ onClose, equipoSeleccionado }) => {

const fecha = new Date().toISOString().split("T")[0];
const year = calcularPeriodoPreventivo(fecha);

function calcularPeriodoPreventivo(fecha) {
  const [y, m] = fecha.split("-").map(Number);
  // Si el mes es noviembre (11) o diciembre (12), pertenece al periodo siguiente
  return m >= 11 ? y + 1 : y;
}
 

  const { planilla, loading, error } = usePreventivo(
    equipoSeleccionado?.idEquipoInstalado,
    true,
    year
  );

  const exportarPDF = () => {
    const element = document.getElementById("pdf-content");
    const opt = {
      margin: 1,
      filename: `PreventivoAnual-Oficina-${
        equipoSeleccionado?.oficina || "equipo"
      }.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, letterRendering: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };
    html2pdf().set(opt).from(element).save();
  };

  if (loading) return <p>Cargando planilla...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-xxl">
        <div className="modal-content">
          <div className="modal-header bg-light shadow-sm">
            <h5 className="fs-6 fw-light">Listado Preventivo Anual</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div id="pdf-content">
              {equipoSeleccionado && (
                <div className="mb-3">
                  <p className="fs-6">
                    Periodo: {year}
                    <br />
                    Oficina: {equipoSeleccionado.oficina} <br />
                    Marca: {equipoSeleccionado.equipo?.marca?.marca}
                    {",  "}
                    Modelo: {equipoSeleccionado.equipo?.modelo?.modelo} {",  "}
                    Serie: {equipoSeleccionado.serie} <br />
                    Tipo: {equipoSeleccionado.equipo?.tipoEquipo?.tipoEquipo}
                    <br />
                    Empresa: TEKNIK S.R.L. https://tekniksrl.com.ar/<br />
                    Responsable tecnico: Waldo A. Obispo
                    <br />
                  </p>
                </div>
              )}

              <div className="table-responsive">
                <table className="table table-sm align-middle pdf-table">
                  <thead className="table-light sticky-top">
                    <tr>
                      <th className="text-center text-uppercase fw-medium fs-5">
                        Actividad
                      </th>
                      <th className="text-center text-uppercase fw-medium fs-5">
                        Nov
                      </th>
                      <th className="text-center text-uppercase fw-medium fs-5">
                        Dic
                      </th>
                      <th className="text-center text-uppercase fw-medium fs-5">
                        Ene
                      </th>
                      <th className="text-center text-uppercase fw-medium fs-5">
                        Feb
                      </th>
                      <th className="text-center text-uppercase fw-medium fs-5">
                        Mar
                      </th>
                      <th className="text-center text-uppercase fw-medium fs-5">
                        Abr
                      </th>
                      <th className="text-center text-uppercase fw-medium fs-5">
                        May
                      </th>
                      <th className="text-center text-uppercase fw-medium fs-5">
                        Jun
                      </th>
                      <th className="text-center text-uppercase fw-medium fs-5">
                        Jul
                      </th>
                      <th className="text-center text-uppercase fw-medium fs-5">
                        Ago
                      </th>
                      <th className="text-center text-uppercase fw-medium fs-5">
                        Sep
                      </th>
                      <th className="text-center text-uppercase fw-medium fs-5">
                        Oct
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {planilla.map((item) => (
                      <tr key={item.id}>
                        <td className="text-uppercase fw-medium fs-7">
                          {item.descripcion}
                        </td>
                        {item.meses.map((valor, idx) => (
                          <td key={idx} className="text-center">
                            {valor}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="modal-footer bg-light shadow-sm">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={exportarPDF}
            >
              Exportar PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListadoModal;
