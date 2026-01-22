import { useState } from "react";
import "../../common/css/AltaEquipo.css";
import ToastFeedback from "../../common/components/ToastFeedback";
import FormRow from "../../common/components/FormRow";
import ModalFeedback from "../../common/components/modalFeedback/ModalFeedback";
import useUsuariosHabilitados from "./hooks/useUsuariosHabilitados";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function ActualizarPassword() {
  const [formData, setFormData] = useState({ idUsuario: "", password: "" });
  const [showToast, setShowToast] = useState(false);
  const [modal, setModal] = useState(null);

  const { usuarios } = useUsuariosHabilitados();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.idUsuario || !formData.password) return;

    try {
      await axios.put(`${API_URL}/actualizarPassword`, {
        idUsuario: formData.idUsuario,
        password: formData.password,
      });

      setShowToast(true);
      setFormData({ idUsuario: "", password: "" });
    } catch (err) {
      console.error("Error al actualizar contraseña", err);
      setModal({
        message: "No se pudo actualizar la contraseña",
        type: "error",
      });
    }
  };

  return (
    <div className="crear-usuario-wrapper">
      {showToast && (
        <ToastFeedback
          message="✅ Contraseña actualizada correctamente"
          type="success"
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}
      {modal && (
        <ModalFeedback
          message={modal.message}
          type={modal.type}
          onClose={() => setModal(null)}
        />
      )}

      <div className="mb-3 mt-3 text-center">
        <h2 className="fw-bold">
          <i className="bi bi-key-fill"></i> Actualizar contraseña
        </h2>
        <p className="text-muted">
          Seleccioná un usuario y asignale una nueva contraseña
        </p>
      </div>

      <div className="container d-flex justify-content-center mt-4">
        <form className="form-box" onSubmit={handleSubmit}>
          <FormRow
            type="select"
            label="Usuario"
            name="idUsuario"
            value={formData.idUsuario}
            onChange={handleChange}
            options={usuarios.map((u) => ({
              id: u.idUsuario,
              value: u.usuario,
            }))}
          />
          <FormRow
            type="input"
            label="Nueva contraseña"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-warning">
              <i className="bi bi-arrow-repeat"></i> Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ActualizarPassword;
