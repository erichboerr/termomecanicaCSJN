import { useState } from "react";
import "../css/ModalAgregarValor.css"; 

function ModalAgregarValor({ visible, label, onConfirm, onClose }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    const valor = inputValue.trim().toUpperCase();
    if (!valor) return;
    onConfirm(valor);
    setInputValue("");
  };

  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h5 className="fw-bold mb-3">Agregar nuevo valor a {label}</h5>
        <input
          type="text"
          className="form-control mb-3"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Nuevo valor para ${label}`}
        />
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAgregarValor;