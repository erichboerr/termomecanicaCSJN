import { useState, useEffect } from "react";
import {
  fetchAllSelects,
  addSelectOption,
  createEquipo,
} from "../services/equipoService";
import { validateEquipoForm } from "../helpers/validateEquipoForm";
import { useModalFeedback } from "./useModalFeedback";
export function useAltaEquipoForm(initialFormData) {
  const { feedback, showFeedback, hideFeedback } = useModalFeedback();

  const [formData, setFormData] = useState(initialFormData);
  const [selectOptions, setSelectOptions] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalKey, setModalKey] = useState("");

  useEffect(() => {
    fetchAllSelects().then(setSelectOptions).catch(console.error);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const confirmarNuevoValor = async (valor) => {
    try {
      let nuevoItem;
      if (modalKey === "modelo") {
        const marcaObj = selectOptions.marca?.find(
          (m) => String(m.id) === String(formData.marca)
        );
        if (!marcaObj) {
          showFeedback(
            "Seleccioná una marca antes de agregar un modelo",
            "warning"
          );
          return;
        }
        nuevoItem = await addSelectOption(modalKey, {
          modelo: valor,
          idMarca: marcaObj.id,
        });
      } else {
        nuevoItem = await addSelectOption(modalKey, valor);
      }

      setSelectOptions((prev) => ({
        ...prev,
        [modalKey]: [...prev[modalKey], nuevoItem],
      }));

      setFormData((prev) => ({
        ...prev,
        [modalKey]: nuevoItem.id,
      }));
    } catch (err) {
      showFeedback(err.response?.data?.error || "Error al agregar", "error");
    } finally {
      setModalVisible(false);
    }
  };

  const handleSubmit = async () => {
    const error = validateEquipoForm(formData);
    if (error) {
      showFeedback(error, "warning");
      return;
    }

    try {
      await createEquipo(formData);
      setShowToast(true);
      setFormData(initialFormData);
    } catch (err) {
      console.error("Error al enviar equipo:", err);

      let errorMessage = "No se pudo guardar el equipo";

      if (err.response?.status === 409) {
        errorMessage = err.response.data?.error || "Equipo duplicado";
      }

      showFeedback(errorMessage, "error");
    }
  };

  return {
    formData,
    selectOptions,
    showToast,
    modalVisible,
    modalKey,
    setModalKey,
    setModalVisible,
    setShowToast,
    handleInputChange,
    confirmarNuevoValor,
    handleSubmit,
    feedback,
    hideFeedback,
  };
}
