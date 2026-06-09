import { useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance.js";
import ModalFeedback from "../../../common/components/modalFeedback/ModalFeedback";
import styles from "../../../common/components/modalFeedback/ModalFeedback.module.css";

const ModalFinalizar = ({ show, onClose, reparacion, onSuccess }) => {
  const [observacion, setObservacion] = useState("");
  const [feedback, setFeedback] = useState({ show: false, message: "", type: "info" });
  const userId = parseInt(sessionStorage.getItem("userId"), 10);

  const handleFinalizar = async () => {
    if (!observacion.trim()) {
      setFeedback({
        show: true,
        message: "La observación no puede estar vacía.",
        type: "error",
      });
      return;
    }

    try {
      await axiosInstance.post(`/finalizarReparacion`, {
        idReparaciones: reparacion.idReparaciones,
        idEquipoInstalado: reparacion.idEquipoInstalado,
        idTecnico: userId,
        observaciones: observacion,
      });
      setFeedback({
        show: true,
        message: "Reparación finalizada con éxito.",
        type: "success",
      });
      setTimeout(() => {
        onClose();
        onSuccess();
      }, 1500);
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Error al finalizar la reparación.";
      setFeedback({ show: true, message: errorMessage, type: "error" });
    }
  };

  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h4>Finalizar Reparación</h4>
        <div className="mb-3">
          <label className="form-label">Observaciones:</label>
          <textarea
            className="form-control"
            rows="3"
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
          ></textarea>
        </div>
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-success" onClick={handleFinalizar}>
            Finalizar
          </button>
        </div>
        {feedback.show && (
          <ModalFeedback
            message={feedback.message}
            type={feedback.type}
            onClose={() => setFeedback({ ...feedback, show: false })}
          />
        )}
      </div>
    </div>
  );
};

export default ModalFinalizar;