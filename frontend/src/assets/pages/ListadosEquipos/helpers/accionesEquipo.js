import axiosInstance from "../../../../utils/axiosInstance.js";

export const pedirReparacion = async ({ equipo, motivo, rolId, refrescar }) => {
  try {
    const idEquipo = equipo.idEquipoInstalado;
    await axiosInstance.put(`/actualizarEstadoEquipo/${idEquipo}`, {
      idEstado: 2,
      observaciones: motivo,
    });
    await axiosInstance.post(`/crearReparacion`, {
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
    await axiosInstance.put(
      `/equiposInstalados/${equipo.idEquipoInstalado}`,
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

