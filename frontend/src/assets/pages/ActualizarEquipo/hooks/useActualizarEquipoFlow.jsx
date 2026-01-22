import { useState } from "react";
import { getOficinas } from "../helpers/getOficinas";
import { updateFotos } from "../helpers/updateFotos";

export const useActualizarEquipoFlow = () => {
  const [equipo, setEquipo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info") => setToast({ message, type });
  const clearToast = () => setToast(null);

  const buscarEquipo = async (oficina) => {
    try {
      const data = await getOficinas(oficina);
      if (!data || !data.idEquipoInstalado) {
        return showToast("❌ Oficina no encontrada", "error");
      }
      setEquipo(data);
      setShowModal(true);
    } catch (err) {
      showToast("❌ Error al buscar oficina", "error"+err);
    }
  };

  const actualizarFotos = async (formData) => {
    try {
      await updateFotos(equipo.idEquipoInstalado, formData);
      showToast("✅ Fotos actualizadas", "success");
      setShowModal(false);
      const updated = await getOficinas(equipo.oficina);
      setEquipo(updated);
    } catch (err) {
      showToast("❌ Error al actualizar fotos", "error"+err);
    }
  };

  return {
    equipo,
    showModal,
    toast,
    buscarEquipo,
    actualizarFotos,
    setShowModal,
    clearToast,
  };
};
