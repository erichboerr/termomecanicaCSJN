import { useState, useEffect, useRef } from "react";
import { fetchAllSelects } from "../services/selectService";
import {
  buscarEquipoPorMarcaModelo,
  crearEquipoInstalado,
} from "../services/equipoInstaladoService";
import { useCapacidadesPorModelo } from "./useCapacidadPorModelo";
import { addSelectOption } from "../services/selectService";

export function useEquipoInstaladoForm() {
  const initialFormData = {
    locacion: "",
    marca: "",
    modelo: "",
    capacidad: "",
    serie: "",
    oficina: "",
    estado: "",
    observaciones: "",
    fotos: [],
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [modalKey, setModalKey] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [selectOptions, setSelectOptions] = useState({});
  const [feedback, setFeedback] = useState({
    show: false,
    message: "",
    type: "info",
  });
  const [equipoInstalado, setEquipoInstalado] = useState(null);
  const fileInputRef = useRef(null);

  const idMarca = Number(formData.marca);
  const idModelo = Number(formData.modelo);
  const { capacidades } = useCapacidadesPorModelo(idMarca, idModelo);

  useEffect(() => {
    const loadSelects = async () => {
      try {
        const options = await fetchAllSelects();
        setSelectOptions(options);
      } catch (err) {
        console.error("Error al cargar selects:", err);
      }
    };
    loadSelects();
  }, []);

  useEffect(() => {
    setSelectOptions((prev) => ({ ...prev, capacidad: capacidades }));
  }, [capacidades]);

  const confirmarNuevoValor = async (valor) => {
    try {
      const nuevoItem = await addSelectOption("locacion", { locacion: valor });
      setSelectOptions((prev) => ({
        ...prev,
        locacion: [...prev.locacion, nuevoItem],
      }));
      setFormData((prev) => ({
        ...prev,
        locacion: nuevoItem.id,
      }));
    } catch (err) {
      setFeedback({
        show: true,
        message: err.response?.data?.error || "Error al agregar locación",
        type: "error",
      });
    } finally {
      setModalVisible(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 2);
    setFormData((prev) => ({ ...prev, fotos: files }));
  };

  const handleCloseFeedback = () => {
    setFeedback({ show: false, message: "", type: "info" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposObligatorios = [
      "locacion",
      "marca",
      "modelo",
      "capacidad",
      "serie",
      "estado",
      "oficina",
    ];
    const camposIncompletos = camposObligatorios.filter(
      (key) => !formData[key]
    );
    if (camposIncompletos.length > 0) {
      setFeedback({
        show: true,
        message: `Faltan completar: ${camposIncompletos.join(", ")}`,
        type: "error",
      });
      return;
    }

    if (formData.fotos.length > 2) {
      setFeedback({
        show: true,
        message: "Solo puedes subir hasta 2 fotos.",
        type: "error",
      });
      return;
    }

    try {
      const equipo = await buscarEquipoPorMarcaModelo(
        formData.marca,
        formData.modelo
      );
      if (!equipo || !equipo.idEquipo) {
        setFeedback({
          show: true,
          message: "No se encontró el equipo con esa marca y modelo.",
          type: "error",
        });
        return;
      }

      const data = new FormData();
      data.append("idLocacion", formData.locacion);
      data.append("idEquipo", equipo.idEquipo);
      data.append("serie", formData.serie);
      data.append("oficina", formData.oficina);
      data.append("idEstado", formData.estado);
      data.append("observaciones", formData.observaciones.toLocaleUpperCase());
      formData.fotos.forEach((file) => data.append("fotos", file));

      const res = await crearEquipoInstalado(data);
      const equipoVisual = {
        idEquipoInstalado: res.data.idEquipoInstalado || null,
        marca: selectOptions.marca?.find((m) => m.id === Number(formData.marca))
          ?.value,
        modelo: selectOptions.modelo?.find(
          (m) => m.id === Number(formData.modelo)
        )?.value,
        capacidad: selectOptions.capacidad?.find(
          (c) => c.id === Number(formData.capacidad)
        )?.value,
        estado: selectOptions.estado?.find(
          (e) => e.id === Number(formData.estado)
        )?.value,
        oficina: formData.oficina,
        serie: formData.serie,
        observaciones: formData.observaciones,
        fotos: formData.fotos.map((f) => URL.createObjectURL(f)),
      };

      setEquipoInstalado(equipoVisual);

      setFeedback({
        show: true,
        message: "✅ Equipo instalado correctamente",
        type: "success",
      });

      setFormData(initialFormData);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      let errorMessage =
        err.response?.data?.error ||
        "No se pudo guardar el equipo. Inténtalo de nuevo.";
      if (err.response?.status === 409) {
        errorMessage = err.response.data?.error || "Equipo duplicado";
      }

      setFeedback({ show: true, message: errorMessage, type: "error" });
      console.error("Error en la solicitud:", err);
    }
  };

  return {
    formData,
    selectOptions,
    feedback,
    equipoInstalado,
    fileInputRef,
    handleInputChange,
    handleFileUpload,
    handleCloseFeedback,
    handleSubmit,
    modalVisible,
    modalKey,
    setModalKey,
    setModalVisible,
    confirmarNuevoValor,
  };
}
