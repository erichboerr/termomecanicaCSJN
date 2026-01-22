import { useState } from "react";
import { addSelectOption } from "../services/selectService";

function ModalAltaLocacion({ show, onClose, onSuccess }) {
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGuardar = async () => {
    if (!nombre.trim()) return;
    setLoading(true);
    try {
      const nueva = await addSelectOption("locacion", nombre.trim());
      onSuccess(nueva);
    } catch (err) {
      console.error("❌ Error al crear locación:", err.message);
    } finally {
      setLoading(false);
      setNombre("");
    }
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Agregar nueva locación</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control"
              placeholder="Locación"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button
              className="btn btn-primary"
              onClick={handleGuardar}
              disabled={loading}
            >
              <i className="bi bi-save"></i> Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAltaLocacion;