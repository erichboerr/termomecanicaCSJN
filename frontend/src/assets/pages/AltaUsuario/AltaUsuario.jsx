import { useState } from "react";
import "../../common/css/AltaEquipo.css";
import ToastFeedback from "../../common/components/ToastFeedback";
import FormRow from "../../common/components/FormRow";
import ModalFeedback from "../../common/components/modalFeedback/ModalFeedback";
import { useAltaUsuarioForm } from "./hooks/useAltaUsuarioForm";

const initialFormData = { user: "", password: "", rol: "0" };
//const idRolActual = parseInt(sessionStorage.getItem("rolId"));
//console.log(idRolActual);

function CrearUsuario() {
  const [modal, setModal] = useState(null);
  const {
    formData,
    showToast,
    roles,
    handleChange,
    handleSubmit,
    setShowToast,
  } = useAltaUsuarioForm(initialFormData, setModal);

  return (
    <div className="crear-usuario-wrapper">
      {showToast && (
        <ToastFeedback
          message="✅ Usuario creado correctamente"
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
          <i className="bi bi-person-fill-lock"></i> Nuevo usuario
        </h2>
        <p className="text-muted">
          Completá los campos para dar de alta un Usuario
        </p>
      </div>

      <div className="container d-flex justify-content-center mt-4">
        <form className="form-box" onSubmit={handleSubmit}>
          <FormRow
            type="input"
            label="Usuario"
            name="user"
            value={formData.user}
            onChange={handleChange}
          />
          <FormRow
            type="input"
            label="Contraseña"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {roles.length > 0 && (
            <FormRow
              type="select"
              label="Rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              options={roles.map((r) => ({ id: r.idRol, value: r.rol }))}
            />
          )}

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary">
              <i className="bi bi-person-plus"></i> Agregar Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrearUsuario;
