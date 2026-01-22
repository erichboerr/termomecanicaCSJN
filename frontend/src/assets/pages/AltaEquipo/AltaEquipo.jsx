import { useAltaEquipoForm } from "./hooks/useAltaEquipoForm";
import EquipoRow from "./components/EquipoRow";
import ModalAgregarValor from "./components/ModalAgregarValor";
import ToastFeedback from "../../common/components/ToastFeedback";
import ModalFeedback from "../../common/components/modalFeedback/ModalFeedback"
import "./css/altaEquipo.module.css";

const initialFormData = {
  tipoEquipo:"",
  marca: "",
  modelo: "",
  alimentacion: "",
  potencia: "",
  capacidad: "",
  gasRefrigerante: "",
};

function AltaEquipo() {
  const {
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
} = useAltaEquipoForm(initialFormData);



  const renderRow = (key, label, isInput = false) => {
    const options =
      key === "modelo"
        ? selectOptions.modelo?.filter(
            (opt) => opt.idMarca === Number(formData.marca)
          )
        : selectOptions[key];

    return (
      <EquipoRow
        keyName={key}
        label={label}
        isInput={isInput}
        value={formData[key]}
        onChange={handleInputChange}
        options={options}
        disabled={key === "modelo" && !formData.marca}
        onAdd={() => {
          setModalKey(key);
          setModalVisible(true);
        }}
      />
    );
  };

  return (
    <div className="crear-usuario-wrapper">
      {showToast && (
        <ToastFeedback
          message="✅ Formulario enviado correctamente"
          type="success"
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}

    {feedback.visible && (
  <ModalFeedback
    message={feedback.message}
    type={feedback.type}
    onClose={hideFeedback}
  />
)}
      <div className="mb-3 mt-3 text-center">
        <h2 className="fw-bold">
          <i className="bi bi-person-lock"></i> Nuevo equipo
        </h2>
        <p className="text-muted">Seleccioná los datos del nuevo equipo</p>
      </div>

      <div className="container d-flex justify-content-center mt-4">
        <form className="form-box" onSubmit={(e) => e.preventDefault()}>
          {renderRow("tipoEquipo", "Tipo de Equipo")}
          {renderRow("marca", "Marca")}
          {renderRow("modelo", "Modelo")}
          {renderRow("alimentacion", "Alimentación")}
          {renderRow("potencia", "Potencia (W)")}
          {renderRow("capacidad", "Capacidad (F)")}
          {renderRow("gasRefrigerante", "Gas Refrigerante")}
          <div className="text-center mt-2">
            <button
              type="submit"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              <i className="bi bi-save"></i> Agregar Equipo
            </button>
          </div>
        </form>
      </div>

      <ModalAgregarValor
        visible={modalVisible}
        label={modalKey.charAt(0).toUpperCase() + modalKey.slice(1)}
        onConfirm={confirmarNuevoValor}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
}

export default AltaEquipo;
