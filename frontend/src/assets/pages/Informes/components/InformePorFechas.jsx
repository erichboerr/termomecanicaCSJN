import { useState } from "react"
import { fetchPorFechas } from "../helpers/reportes"
import ReporteModal from "../components/ReporteModal";
import { normalizarFechas } from "../helpers/formatearFecha";

export default function InformePorFechas() {
  const [desde, setDesde] = useState("")
  const [hasta, setHasta] = useState("")
  const [data, setData] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const [desdeDate, hastaDate] = normalizarFechas(desde, hasta);
      const resultado = await fetchPorFechas(desdeDate, hastaDate);
      setData(resultado)
      setModalOpen(true)
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="border p-3 rounded mb-4">
        <h5>Informe por Fechas</h5>
        <div className="row g-2">
          <div className="col-12 col-md-6">
            <label className="form-label">Desde:</label>
            <input
              type="date"
              className="form-control"
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
              required
            />
          </div>
          <div className="col-12 col-md-6">
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
        data={data}
        fechaDesde={desde}
        fechaHasta={hasta}
      />
    </>
  )
}