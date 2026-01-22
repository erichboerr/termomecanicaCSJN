//Encapsula la lógica de reparación y urgencia.
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const marcarComoFuncionando = async ({
  idReparaciones,
  idEquipoInstalado,
  idTecnico,
  texto,
  API_URL,
}) => {
  if (!idReparaciones || !idEquipoInstalado || !idTecnico || !texto) {
    throw new Error("Datos incompletos para marcar como funcionando");
  }

  // 1. Guardar observación técnica
  await axios.post(`${API_URL}/observacionesReparaciones`, {
    observaciones: texto,
    idReparaciones,
    idTecnicos: idTecnico,
  });

  // 2. Actualizar observación en reparaciones
  await axios.put(`${API_URL}/reparaciones/${idReparaciones}`, {
    ObservacionPedido: "Funcionando",
  });

  // 3. Actualizar estado del equipo
  await axios.put(`${API_URL}/equiposInstalados/${idEquipoInstalado}`, {
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
    await axios.post(`${API_URL}/observaciones-reparaciones`, {
      idReparacion,
      idTecnico,
      observacion,
      fecha: new Date().toISOString(),
    });

    // 2. Actualizar campo ObservacionPedido en reparaciones
    const observacionPedido =
      modo === "finalizado" ? "Funcionando" : observacion;
    await axios.put(`${API_URL}/reparaciones/${idReparacion}/observacion`, {
      observacion: observacionPedido,
    });

    // 3. Si es finalizado, actualizar estado del equipo
    if (modo === "finalizado") {
      await axios.put(`${API_URL}/equipos/${idEquipoInstalado}/estado`, {
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
    const res = await fetch(`${API_URL}/equipos/${idEquipo}/baja`, {
      method: "POST",
    });
    return res.ok;
  } catch (error) {
    console.error("Error al dar de baja:", error);
    return false;
  }
}
