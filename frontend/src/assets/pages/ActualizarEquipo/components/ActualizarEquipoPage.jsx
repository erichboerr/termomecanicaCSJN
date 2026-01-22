import { useState } from "react";
import ToastFeedback from "../../../common/components/ToastFeedback";
import FormRow from "../../../common/components/FormRow";

const ActualizarEquipoPage = ({ onBuscar, toast, clearToast }) => {
  const [formData, setFormData] = useState({ oficina: "" });

  const handleChange = ({ target }) => {
    setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.oficina.trim()) return;
    onBuscar(formData.oficina);
    setFormData({ oficina: "" });
  };

  return (
    <div className="crear-usuario-wrapper">
      {toast && (
        <ToastFeedback
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={clearToast}
        />
      )}

      <div className="mb-3 mt-3 text-center">
        <h2 className="fw-bold">
          <i className="bi bi-pencil-square"></i> Ingresar número de oficina
        </h2>
        <p className="text-muted">Ingresá el número de oficina Para cambiar las fotos</p>
      </div>

      <div className="container d-flex justify-content-center mt-4">
        <form className="form-box" onSubmit={handleSubmit}>
          <FormRow
            type="input"
            label="Oficina"
            name="oficina"
            value={formData.oficina}
            onChange={handleChange}
          />
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary">
              <i className="bi bi-check-circle"></i> Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActualizarEquipoPage;
