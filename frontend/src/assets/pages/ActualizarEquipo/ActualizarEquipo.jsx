import { useActualizarEquipoFlow } from "./hooks/useActualizarEquipoFlow";
import ActualizarEquipoPage from "./components/ActualizarEquipoPage";
import EquipoModal from "./components/EquipoModal";

const ActualizarEquipo = () => {
  const {
    equipo,
    showModal,
    toast,
    buscarEquipo,
    actualizarFotos,
    setShowModal,
    clearToast,
  } = useActualizarEquipoFlow();

  return (
    <>
      <ActualizarEquipoPage
        onBuscar={buscarEquipo}
        toast={toast}
        clearToast={clearToast}
      />

      {showModal && equipo && (
        <EquipoModal
          show={showModal}
          onHide={() => setShowModal(false)}
          equipo={equipo}
          onUpdateFotos={actualizarFotos}
        />
      )}
    </>
  );
};

export default ActualizarEquipo;
