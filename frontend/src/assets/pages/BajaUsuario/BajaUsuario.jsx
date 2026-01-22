import { useBajaUsuarioForm } from "./hooks/useBajaUsuarioForm";
import ToastFeedback from "../../common/components/ToastFeedback";
import FormRow from "../../common/components/FormRow";
import "../../common/css/AltaEquipo.css";

const BajaUsuario = () => {
  const {
    formData,
    usuarios,
    toast,
    showModal,
    nombreUsuarioSeleccionado,
    handleChange,
    handleSubmit,
    confirmarBaja,
    setToast,
    setShowModal,
  } = useBajaUsuarioForm();

  return (
    <>
      <div className="crear-usuario-wrapper">
        {toast && (
          <ToastFeedback
            message={toast.message}
            type={toast.type}
            duration={3000}
            onClose={() => setToast(null)}
          />
        )}

        <div className="mb-3 mt-3 text-center">
          <h2 className="fw-bold">
            <i className="bi bi-person-x-fill"></i> Baja de Usuario
          </h2>
          <p className="text-muted">Seleccioná el usuario y confirmá la baja</p>
        </div>

        <div className="container d-flex justify-content-center mt-4">
          <form className="form-box" onSubmit={handleSubmit}>
            <FormRow
              type="select"
              label="Usuario"
              name="user"
              value={formData.user}
              onChange={handleChange}
              options={usuarios.map((u) => ({
                id: u.idUsuario,
                value: u.usuario,
              }))}
            />

            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="flagHabilitado"
                checked={!formData.flagHabilitado}
                onChange={handleChange}
                id="flagHabilitado"
              />
              <label
                className="form-check-label"
                htmlFor="flagHabilitado"
                style={{ color: formData.flagHabilitado ? "green" : "red" }}
              >
                {formData.flagHabilitado
                  ? "Tildar para dar de baja"
                  : "Usuario se dará de baja"}
              </label>
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-danger">
                <i className="bi bi-person-dash"></i> Dar de baja
              </button>
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-confirmacion">
            <h5 className="fw-bold text-danger">
              <i className="bi bi-exclamation-triangle-fill"></i> Confirmar baja
            </h5>
            <p>
              ¿Está seguro de dar de baja a <strong>{nombreUsuarioSeleccionado}</strong>?
            </p>

            <div className="d-flex justify-content-end gap-2 mt-3">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button className="btn btn-danger" onClick={confirmarBaja}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BajaUsuario;