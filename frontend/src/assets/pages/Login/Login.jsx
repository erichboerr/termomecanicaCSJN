import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";
import { useLoginForm } from "./hooks/useLoginForm";
import { getRedirectPath } from "../../common/helpers/authHelpers";
import LoginRow from "./components/LoginRow";
import ToastFeedback from "../../common/components/ToastFeedback";
import ModalFeedback from "../../common/components/modalFeedback/ModalFeedback";

function Login() {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [modal, setModal] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, isLoading } = useAuth();

  const { formData, showToast, handleChange, handleSubmit, setShowToast } =
    useLoginForm(setModal);

  useEffect(() => {
  if (!isLoading && isAuthenticated) {
    const redirectPath = getRedirectPath(redirect);

    if (redirectPath) {
      navigate(redirectPath, { replace: true });
      window.history.replaceState({}, "", window.location.origin + redirectPath);
    } else {
      console.error("Rol sin ruta definida");
    }
  }
}, [isAuthenticated, isLoading, location, navigate, redirect]);

  if (isLoading) return null; 

  return (
    <div className="crear-usuario-wrapper">
      {showToast && (
        <ToastFeedback
          message="✅ Inicio de sesión exitoso"
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
          <i className="bi bi-person-lock"></i> Iniciar Sesión
        </h2>
        <p className="text-muted">Accedé con tus credenciales</p>
      </div>

      <div className="container d-flex justify-content-center mt-4">
        <form className="form-box" onSubmit={handleSubmit}>
          <LoginRow
            keyName="user"
            label="Usuario"
            value={formData.user}
            onChange={handleChange}
          />
          <LoginRow
            keyName="password"
            label="Contraseña"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary">
              <i className="bi bi-box-arrow-in-right"></i> Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
