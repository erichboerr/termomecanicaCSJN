import { useState } from "react";
import { fetchPorOficina } from "../helpers/reportes";
//import { formatearInformeServicios } from "../utils/formatearInformeServicios";
import ReporteModal from "../components/ReporteModal";

export default function InformePorEquipo() {
  const [oficina, setOficina] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [reporteData, setReporteData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchPorOficina(oficina, desde, hasta);
      if (!Array.isArray(data) || data.length === 0) {
        alert("No se encontraron servicios en ese rango");
        return;
      }
      setReporteData(data);
      setModalOpen(true);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="border p-3 rounded mb-4">
        <h5>Informe por Oficina</h5>
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <label className="form-label">Oficina:</label>
            <input
              type="text"
              className="form-control"
              value={oficina}
              onChange={(e) => setOficina(e.target.value)}
              required
            />
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label">Desde:</label>
            <input
              type="date"
              className="form-control"
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
              required
            />
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label">Hasta:</label>
            <input
              type="date"
              className="form-control"
              value={hasta}
              onChange={(e) => setHasta(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Generar Informe
        </button>
      </form>
      <ReporteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        data={reporteData}
        fechaDesde={desde}
        fechaHasta={hasta}
        filtro={{ tipo: "Oficina", valor: oficina }}
      />
    </>
  );
}
