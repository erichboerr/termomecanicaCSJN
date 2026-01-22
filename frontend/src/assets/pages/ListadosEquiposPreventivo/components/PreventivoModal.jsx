import { useState, useEffect } from "react";
import axios from "axios";
import { getPreventivoRevision } from "../helpers/preventivoCalendar";
import {
  getChecklistByFrecuencia,
} from "../helpers/checklistHelpers";

const API_URL = import.meta.env.VITE_API_URL;

const PreventivoModal = ({ equipo, onClose, setToast }) => {
 // console.log("Oficina recibida:", equipo?.oficina);
 // console.log("Equipo serie recibida:", equipo?.serie);  
  
  const { tipo, year } = getPreventivoRevision(new Date());
 // console.log("year recibida:", year);
 // console.log("tipo recibida:", tipo);


  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().slice(0, 10), // 🔒 siempre hoy
    //fecha: "2026-04-15", 
    oficina: equipo?.oficina,
    frecuencia: tipo,
    yearPreventivo: year,
    serie: equipo?.serie,
    checklist: equipo?.checklistItems || [],
    valores: {},
  });

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const { tipo, year } = getPreventivoRevision(new Date(formData.fecha));
        setFormData((prev) => ({
          ...prev,
          frecuencia: tipo,
          yearPreventivo: year,
        }));

        const items = await getChecklistByFrecuencia(tipo);
        setFormData((prev) => ({ ...prev, checklist: items }));
      } catch (err) {
        console.error("❌ Error cargando checklist:", err);
      }
    };

    fetchChecklist();
  }, [formData.fecha]);

  const handleChange = (orden, value) => {
    setFormData((prev) => ({
      ...prev,
      valores: { ...prev.valores, [orden]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validar duplicados antes de enviar
      console.log("formData.oficina:", formData.oficina);
      console.log("formData.fecha:", formData.fecha);
      console.log("formData.frecuencia:", formData.frecuencia);
      console.log("formData.serie:", formData.serie);
      
      // Armar payload
      const payload = {
        fecha: formData.fecha,
        oficina: equipo.oficina,
        marca: equipo.equipo?.marca?.marca,
        modelo: equipo.equipo?.modelo?.modelo,
        serie: equipo.serie,
        tipo: equipo.equipo?.tipoEquipo?.tipoEquipo,
        usuarioId: Number(sessionStorage.getItem("userId") || 6),
        equipoId: equipo.equipoId,
        frecuencia_aplicada: formData.frecuencia,
        year: formData.yearPreventivo,
        detalles: formData.checklist.map((item) => {
          const v = formData.valores[item.orden];
          return {
            itemId: item.id,
            estado: typeof v === "boolean" ? v : null,
            valor: typeof v === "string" ? v : null,
            mes_aplicado: new Date(formData.fecha).getMonth() + 1,
          };
        }),
      };

      console.log("payload:", payload);


      await axios.post(`${API_URL}/accionesPreventivas`, payload);

      setToast({
        visible: true,
        message: "Acción preventiva registrada correctamente",
        type: "success",
      });
      onClose();
    } catch (err) {
      console.error("❌ Error al registrar acción preventiva:", err);
      setToast({
        visible: true,
        message: "Error al registrar la acción preventiva",
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-light shadow-sm">
              <h5 className="modal-subtitle fs-6">
                Oficina: {equipo?.oficina} <br />
                Equipo Marca: {equipo?.equipo?.marca?.marca} <br />
                Modelo: {equipo?.equipo?.modelo?.modelo} <br />
                Serie: {equipo?.serie} <br />
                Tipo: {equipo?.equipo?.tipoEquipo?.tipoEquipo} <br />
                Frecuencia: ({formData.frecuencia}) <br />
                Fecha: {formData.fecha}
              </h5>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {formData.checklist.length === 0 ? (
                  <p className="text-muted">
                    No hay ítems para esta frecuencia.
                  </p>
                ) : (
                  <div
                    className="table-responsive"
                    style={{ maxHeight: "60vh" }}
                  >
                    <table className="table table-sm table-bordered align-middle">
                      <thead className="table-light sticky-top">
                        <tr>
                          <th>Actividad</th>
                          <th>Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.checklist.map((item) => {
                          const isAmp = item.descripcion
                            .toLowerCase()
                            .includes("amp");
                          const val =
                            formData.valores[item.orden] ||
                            (isAmp ? "" : false);
                          return (
                            <tr key={item.id}>
                              <td>{item.descripcion} </td>
                              <td className="text-center">
                                {isAmp ? (
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={val}
                                    onChange={(e) =>
                                      handleChange(item.orden, e.target.value)
                                    }
                                    placeholder="Ej: 12.5"
                                  />
                                ) : (
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={Boolean(val)}
                                    onChange={(e) =>
                                      handleChange(item.orden, e.target.checked)
                                    }
                                  />
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
                <button type="submit" className="btn btn-primary mt-3">
                  Guardar
                </button>
              </form>
            </div>
            <div className="modal-footer bg-light shadow-sm">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  );
};

export default PreventivoModal;
