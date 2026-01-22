import { useState, useEffect } from "react";
import axios from "axios";
import { getRoles } from "../helpers/getRoles";
import { validateAltaUsuario } from "../helpers/validateAltaUsuario";

const API_URL = import.meta.env.VITE_API_URL;

  export function useAltaUsuarioForm(initialFormData, setModal) {
  const [formData, setFormData] = useState(initialFormData);
  const [showToast, setShowToast] = useState(false);
  const [roles, setRoles] = useState([]);
  const [idRolActual, setIdRolActual] = useState(null);

  useEffect(() => {
    const storedRolId = parseInt(sessionStorage.getItem("rolId"));
    if (!isNaN(storedRolId)) {
      setIdRolActual(storedRolId);
    }
  }, []);

  useEffect(() => {
    if (idRolActual === null) return;

    getRoles().then((allRoles) => {
      let filteredRoles = [];

      if (idRolActual === 1) {
        filteredRoles = allRoles;
      } else if (idRolActual === 2) {
        filteredRoles = allRoles.filter((r) => r.idRol === 4 || r.idRol === 5);
      }

      setRoles(filteredRoles);
    });
  }, [idRolActual]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateAltaUsuario(formData);
    if (error) {
      setModal({ message: error, type: "error" });
      return;
    }

    try {
      await axios.post(`${API_URL}/createUser`, {
        ...formData,
        rol: parseInt(formData.rol),
      });
      setShowToast(true);
      setFormData(initialFormData);
    } catch (error) {
      setModal({
        message:
          error.response?.data?.message ||
          "Hubo un problema al crear el usuario",
        type: "error",
      });
    }
  };

  return {
    formData,
    showToast,
    roles,
    handleChange,
    handleSubmit,
    setShowToast,
  };
}
