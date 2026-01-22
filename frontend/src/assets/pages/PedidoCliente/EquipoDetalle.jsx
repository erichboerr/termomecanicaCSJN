import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import EquipoCard from "../../common/modals/EquipoCard";
function EquipoDetalle() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [equipo, setEquipo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`${API_URL}/equipoDetalle/${id}`)
      .then((res) => setEquipo(res.data))
      .catch(() => setError("No se encontró el equipo o hubo un error"));
  }, [id, API_URL]);

  if (error) return <p className="text-danger mt-4 text-center">{error}</p>;
  if (!equipo) return <p className="mt-4 text-center">Cargando equipo...</p>;

  return (
    <>
      <div className="container mt-4">
        <div className="listado-wrapper container-fluid mt-4">
          <h2 className="text-center fw-bold mb-4">
            <i className="bi bi-pc-display-horizontal me-2"></i>Equipo Instalado
          </h2>
        </div>
        <EquipoCard equipo={equipo} />
        <div>
          <p>
            <button
              className="btn btn-warning btn-sm mt-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseWidthExample"
              aria-expanded="false"
              aria-controls="collapseWidthExample"
            >
              Pedido de Revisión
            </button>
          </p>

          <div style={{ minHeight: "120px" }}>
            <div
              className="collapse collapse-horizontal"
              id="collapseWidthExample"
            >
              <div
                className="card card-body"
                style={{ width: "200px", height: "150px" }}
              >
                <p>
                  <i className="bi bi-telephone-fill mt-1"></i> 1143704706
                </p>
                <p>
                  <i className="bi bi-envelope-fill"> doperativo@csjn.gov.ar</i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EquipoDetalle;
