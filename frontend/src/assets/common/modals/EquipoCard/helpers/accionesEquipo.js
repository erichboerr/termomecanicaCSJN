import axiosInstance from "../../../../utils/axiosInstance.js";

export const marcarComoFuncionando = async ({
  idReparaciones,
  idEquipoInstalado,
  idTecnico,
  texto,
}) => {
  if (!idReparaciones || !idEquipoInstalado || !idTecnico || !texto) {
    throw new Error("Datos incompletos para marcar como funcionando");
  }

  // 1. Guardar observación técnica
  await axiosInstance.post(`/observacionesReparacion`, {
    observaciones: texto,
    idReparaciones,
    idTecnicos: idTecnico,
  });

  // 2. Actualizar observación en reparaciones
  await axiosInstance.put(`/reparaciones/${idReparaciones}`, {
    ObservacionPedido: "Funcionando",
  });

  // 3. Actualizar estado del equipo
  await axiosInstance.put(`/equiposInstalados/${idEquipoInstalado}`, {
    idEstado: 1,
  });
};

/***************************************************************************/

export const guardarObservacionReparacion = async ({
  modo = "revision", // "finalizado"
  texto,
  idReparacion,
  idEquipoInstalado,
  idTecnico,
  refrescar,
  onClose,
}) => {
  if (!texto?.trim()) {
    alert("La observación no puede estar vacía.");
    return;
  }

  try {
    const observacion = texto.trim();

    // 1. Guardar en observaciones_reparaciones
    await axiosInstance.post(`/observaciones-reparaciones`, {
      idReparacion,
      idTecnico,
      observacion,
      fecha: new Date().toISOString(),
    });

    // 2. Actualizar campo ObservacionPedido en reparaciones
    const observacionPedido =
      modo === "finalizado" ? "Funcionando" : observacion;
    await axiosInstance.put(`/reparaciones/${idReparacion}/observacion`, {
      observacion: observacionPedido,
    });

    // 3. Si es finalizado, actualizar estado del equipo
    if (modo === "finalizado") {
      await axiosInstance.put(`/equipos/${idEquipoInstalado}/estado`, {
        idEstado: 1, // Funcionando
      });
    }

    refrescar?.();
    onClose?.();
  } catch (error) {
    console.error("Error al guardar observación:", error);
    alert("No se pudo guardar la observación.");
  }
};

/********************************************************************/

export async function confirmarBajaEquipo(idEquipo) {
  if (!idEquipo) return false;

  try {
    await axiosInstance.put(`/equiposInstalados/${idEquipo}/baja`,);
    return true;
  } catch (error) {
    console.error("Error al dar de baja:", error);
    return false;
  }
}