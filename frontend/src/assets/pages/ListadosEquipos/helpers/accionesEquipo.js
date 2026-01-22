import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export const pedirReparacion = async ({ equipo, motivo, rolId, refrescar }) => {
  try {
    const idEquipo = equipo.idEquipoInstalado;
    await axios.put(`${API_URL}/actualizarEstadoEquipo/${idEquipo}`, {
      idEstado: 2,
      observaciones: motivo,
    });
    await axios.post(`${API_URL}/crearReparacion`, {
      ObservacionPedido: motivo,
      idEquipoInstalado: idEquipo,
      idSupervisor: rolId,
    });
    await refrescar();
  } catch (err) {
    console.error("Error al registrar reparación:", err);
    alert("Hubo un error al registrar el pedido.");
  }
};

export const marcarUrgente = async ({ equipo, refrescar }) => {
  try {
    await axios.put(
      `${API_URL}/equiposInstalados/${equipo.idEquipoInstalado}`,
      {
        idEstado: 3,
      }
    );
    await refrescar();
  } catch (err) {
    console.error("Error al marcar como urgente:", err);
    alert("Hubo un error al actualizar el estado.");
  }
};

