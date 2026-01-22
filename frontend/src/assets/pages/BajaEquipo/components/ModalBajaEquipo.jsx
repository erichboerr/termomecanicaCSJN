import { useState } from 'react';
import "../css/ModalBajaEquipo.css";

const ModalBajaEquipo = ({ show, onClose, onConfirm }) => {
  const [motivo, setMotivo] = useState('');
  const [error, setError] = useState('');

  const handleConfirmar = () => {
    if (motivo.trim().length < 5) {
      setError('El motivo debe tener al menos 5 caracteres.');
      return;
    }
    setError('');
    onConfirm(motivo);
    setMotivo(''); // Limpiamos el input después de confirmar
  };

  const handleCerrar = () => {
    setMotivo('');
    setError('');
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmar baja de equipo</h5>
            <button type="button" className="btn-close" onClick={handleCerrar}></button>
          </div>
          <div className="modal-body">
            <p>Por favor, ingrese el motivo de la baja del equipo:</p>
            <textarea
              className="form-control"
              rows="3"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Ej: equipo obsoleto, reemplazo por nuevo modelo, etc."
            ></textarea>
            {error && <div className="text-danger mt-2">{error}</div>}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary me-2" onClick={handleCerrar}>
              Cancelar
            </button>
            <button type="button" className="btn btn-danger" onClick={handleConfirmar}>
              Dar de baja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalBajaEquipo;