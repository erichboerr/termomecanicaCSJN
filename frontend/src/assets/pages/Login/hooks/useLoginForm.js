import { useState, useContext } from "react";
import axios from "axios";
import { getCamposIncompletos } from "../helpers/validateForm";
import { AuthContext } from "../../../../context/AuthContext";
import { revalidateAuth } from "../../../../context/helpers/revalidateAuth";

const API_URL = import.meta.env.VITE_API_URL;

export function useLoginForm(setModal) {
  const [formData, setFormData] = useState({ user: "", password: "" });
  const [showToast, setShowToast] = useState(false);
  const { setAuthState } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposIncompletos = getCamposIncompletos(formData);

    if (camposIncompletos.length > 0) {
      setModal({
        message: `Faltan completar: ${camposIncompletos.join(", ")}`,
        type: "error",
      });

      return;
    }

    try {
      const { data } = await axios.post(`${API_URL}/login`, formData); 

      if (data.success) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("usuario", data.usuario);       
        sessionStorage.setItem("rolId", data.rolId);
        sessionStorage.setItem("userId", data.userId);        
        sessionStorage.setItem("expiresAt", Date.now() + 1000 * 60 * 60); // 1 hora
        revalidateAuth(setAuthState); 
        setShowToast(true);                
      } else {
        setModal({
          message: data.message || "Usuario o contraseña incorrectos",
          type: "error",
        });
      }
    } catch (error) {
      setModal({
        message: "Hubo un problema al loguearse",
        type: "error" + error,
      });
    }
  };

  return { formData, showToast, handleChange, handleSubmit, setShowToast };
}
