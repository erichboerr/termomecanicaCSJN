import {
  Reparaciones,
  EquipoInstalado,
  Equipo,
  Estado,
  Marca,
  Modelo,
  Usuario,
  ObservacionesReparaciones,
} from "../models/index.js";
import logger from "../helpers/logger.js";

export const crearReparacion = async (req, res) => {
  const { ObservacionPedido, idEquipoInstalado, idSupervisor } = req.body;

  if (!ObservacionPedido || !idEquipoInstalado || !idSupervisor) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }

  try {
    const equipo = await EquipoInstalado.findByPk(idEquipoInstalado);
    if (!equipo) {
      return res.status(404).json({ error: "Equipo no encontrado." });
    }

    const nuevaReparacion = await Reparaciones.create({
      ObservacionPedido,
      idEquipoInstalado,
      idSupervisor,
      createdAt: new Date(),
    });

    res.status(201).json(nuevaReparacion);
  } catch (error) {
    logger.error(`Error al registrar reparación: ${error.message}`);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
/**************************************************************/

export const asignarTecnico = async (req, res) => {
  try {
    const { idEquipoInstalado, idTecnico, idSupervisor } = req.body;
    //console.log("Body recibido:", req.body);

    if (!idEquipoInstalado || !idTecnico) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    // Buscamos una reparación que no esté finalizada
    const reparacionExistente = await Reparaciones.findOne({
      where: {
        idEquipoInstalado,
        Finalizado: false, // Filtra solo las reparaciones activas
      },
    });

    if (reparacionExistente) {
      // Si existe una reparación activa, solo la actualizamos
      reparacionExistente.idTecnico = idTecnico;
      await reparacionExistente.save();
    } else {
      // Si no existe una reparación activa, creamos una nueva
      const equipo = await EquipoInstalado.findByPk(idEquipoInstalado);
      const observacion =
        equipo?.observaciones?.trim() || "Revisar que le sucede al equipo";
      await Reparaciones.create({
        idEquipoInstalado,
        idTecnico,
        idSupervisor,
        ObservacionPedido: observacion,
        Finalizado: false,
      });
    }

    return res.status(200).json({ message: "Técnico asignado correctamente" });
  } catch (error) {
    logger.error(`Error al asignar técnico: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Error interno al asignar técnico" });
  }
};
/***************************************************************/

export const reparacionConDetalles = async (req, res) => {
  try {
    const reparaciones = await Reparaciones.findAll({
      include: [
        {
          model: EquipoInstalado,
          as: "equipoInstalado",
          required: false,
          include: [
            {
              model: Equipo,
              as: "equipo",
              required: false,
              include: [
                { model: Marca, as: "marca", required: false },
                { model: Modelo, as: "modelo", required: false },
              ],
            },
            { model: Estado, as: "estado", required: false },
          ],
        },
        {
          model: Usuario,
          as: "tecnico",
          required: false,
        },
      ],
    });

    res.status(200).json(reparaciones);
  } catch (error) {
    logger.error(`Error al obtener reparaciones: ${error.message}`);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const createObservacionesReparaciones = async (req, res) => {
  const { idReparaciones, idTecnico, observaciones } = req.body;

  // ⚠️ Paso de validación: Comprobar que los datos son correctos
  if (!idReparaciones || !idTecnico || !observaciones) {
    return res.status(400).json({ error: "Faltan datos requeridos." });
  }

  try {
    // ⚠️ Paso de validación adicional: Verificar si la reparación existe
    const reparacionExistente = await Reparaciones.findByPk(idReparaciones);
    if (!reparacionExistente) {
      return res
        .status(404)
        .json({ error: "La reparación especificada no existe." });
    }

    await ObservacionesReparaciones.create({
      idReparaciones,
      idTecnicos: idTecnico,
      observaciones,
    });

    res
      .status(201)
      .json({ message: "Observación de reparación guardada con éxito." });
  } catch (error) {
    logger.error(
      `Error al guardar la observación de reparación: ${error.message}`
    );
    // ⚠️ Importante: Devuelve el error para que el frontend pueda manejarlo
    res
      .status(500)
      .json({ error: "Error interno del servidor al guardar la observación." });
  }
};
/***************************************************************/

export const finalizarReparacion = async (req, res) => {
  const { idReparaciones, idEquipoInstalado, idTecnico, observaciones } =
    req.body;

  try {
    // 1. Guardar la observación final
    await ObservacionesReparaciones.create({
      idReparaciones,
      idTecnicos: idTecnico,
      observaciones,
      EstadoReparacion: true,
    });

    // 2. Actualizar el estado del equipo instalado a "Funcionando"
    await EquipoInstalado.update(
      { idEstado: 1, observaciones: "EQUIPO OPERATIVO" },
      { where: { idEquipoInstalado: idEquipoInstalado } }
    );
    // 3. Marcar la reparación como finalizada
    await Reparaciones.update(
      { Finalizado: true },
      { where: { idReparaciones: idReparaciones } }
    );

    res.status(200).json({ message: "Reparación finalizada con éxito." });
  } catch (error) {
    logger.error(`Error al finalizar la reparación: ${error.message}`);
    res.status(500).json({ error: "No se pudo finalizar la reparación." });
  }
};
