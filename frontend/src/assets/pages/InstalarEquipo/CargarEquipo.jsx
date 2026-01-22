import { useState, useEffect } from "react";
import { useEquipoInstaladoForm } from "./hooks/useEquipoInstaladoForm";
import ModalFeedback from "../../common/components/modalFeedback/ModalFeedback";
import FormularioInstalacion from "./components/FormularioInstalacion";
import ModalQR from "../../common/modals/ModalQR";
import LocacionRow from "./components/locationRow";
import ModalAgregarValor from "../AltaEquipo/components/ModalAgregarValor";

function InstalarEquipo() {
  const {
    formData,
    selectOptions,
    feedback,
    fileInputRef,
    equipoInstalado,
    handleInputChange,
    handleFileUpload,
    handleCloseFeedback,
    handleSubmit,
    modalVisible,
    setModalVisible,
    confirmarNuevoValor,
    setModalKey,
  } = useEquipoInstaladoForm();
  const [showQRModal, setShowQRModal] = useState(false);
useEffect(() => {
  if (equipoInstalado) {
    setShowQRModal(true);
  }
}, [equipoInstalado]);


  return (
    <div className="crear-usuario-wrapper">
      {feedback.show && (
        <ModalFeedback
          message={feedback.message}
          type={feedback.type}
          onClose={handleCloseFeedback}
        />
      )}

      <div className="mb-3 mt-3 text-center">
        <h2 className="fw-bold">
          <i className="bi bi-clipboard-minus"></i> Cargar equipo en oficina
        </h2>
        <p className="text-muted">Completá los campos para cargar un equipo en uma oficina</p>
      </div>

      <div className="container d-flex justify-content-center mt-4">
  <div className="form-box w-100">
    {/* Select de Locación con botón agregar */}
    <LocacionRow
      value={formData.locacion}
      options={selectOptions.locacion}
      onChange={handleInputChange}
      onAdd={() => {
        setModalKey("locacion");
        setModalVisible(true);
      }}
    />

    {/* Modal para agregar nueva locación */}
    <ModalAgregarValor
      visible={modalVisible}
      label="Locación"
      onConfirm={confirmarNuevoValor}
      onClose={() => setModalVisible(false)}
    />

    {/* Formulario principal */}
    <FormularioInstalacion
      formData={formData}
      selectOptions={selectOptions}
      fileInputRef={fileInputRef}
      handleInputChange={handleInputChange}
      handleFileUpload={handleFileUpload}
      handleSubmit={handleSubmit}
    />
  </div>

  {/* Modal QR */}
  <ModalQR
    show={showQRModal}
    onClose={() => setShowQRModal(false)}
    equipo={equipoInstalado}
  />
</div>
    </div>
  );
}

export default InstalarEquipo;
