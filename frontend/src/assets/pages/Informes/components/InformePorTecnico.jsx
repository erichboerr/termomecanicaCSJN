import { useState } from "react";
import { useTecnicos } from "../hooks/useTecnicos";
import { useInformePorTecnico } from "../hooks/useInformePorTecnico";
import ReporteModal from "../components/ReporteModal";

export default function InformePorTecnico() {
  const [tecnico, setTecnico] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const { tecnicos, loading } = useTecnicos();
  const [modalOpen, setModalOpen] = useState(false);
  const [reporteData, setReporteData] = useState([]);
  const { generarInformeYTexto } = useInformePorTecnico();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await generarInformeYTexto(tecnico, desde, hasta);
    if (data) {
      setReporteData(data);
      setModalOpen(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="border p-3 rounded mb-4">
        <h5>Informe por Técnico</h5>
        <div className="row g-2">
          <div className="col-12 col-md-4">
            <label className="form-label">Técnico:</label>
            <select
              className="form-select"
              value={tecnico}
              onChange={(e) => setTecnico(e.target.value)}
              required
              disabled={loading}
            >
              <option value="">Seleccionar técnico</option>
              {tecnicos.map((t) => (
                <option key={t.idUsuario} value={t.usuario}>
                  {t.usuario}
                </option>
              ))}
            </select>
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
        <button type="submit" className="btn btn-primary mt-3">
          Generar Informe
        </button>
      </form>
      <ReporteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        data={reporteData}
        fechaDesde={desde}
        fechaHasta={hasta}
        filtro={{ tipo: "Técnico", valor: tecnico }}
      />
    </>
  );
}
