import { useState, useEffect } from "react";
import { getUsuarios } from "../helpers/getUsuarios";
import { updateUsuario } from "../helpers/updateUsuario";

export const useBajaUsuarioForm = () => {
  const [formData, setFormData] = useState({ user: "", flagHabilitado: true });
  const [usuarios, setUsuarios] = useState([]);
  const [toast, setToast] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [, setPendingSubmit] = useState(false);

  useEffect(() => {
    getUsuarios().then(setUsuarios);
  }, []);

  const handleChange = ({ target }) => {
    const { name, type, value } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? !prev.flagHabilitado : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.user)
      return setToast({ message: "Seleccione un usuario", type: "error" });
    if (formData.flagHabilitado)
      return setToast({
        message: "Debe tildar la opción para dar de baja",
        type: "error",
      });

    setShowModal(true);
    setPendingSubmit(true);
  };

  const confirmarBaja = async () => {
    try {
      await updateUsuario(formData.user, false);
      setToast({ message: "✅ Usuario dado de baja", type: "success" });
      setFormData({ user: "", flagHabilitado: true });
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      const msg = error?.response?.data?.message || "❌ Error al dar de baja";
      setToast({ message: msg, type: "error" });
    } finally {
      setShowModal(false);
      setPendingSubmit(false);
    }
  };

  const nombreUsuarioSeleccionado =
    usuarios.find((u) => u.idUsuario === parseInt(formData.user))?.usuario ||
    "";

  return {
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
  };
};
