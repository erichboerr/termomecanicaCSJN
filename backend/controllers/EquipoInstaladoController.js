import { validateEquipoInstalado } from "../helpers/validateEquipoInstalado.js";
import sequelize from "../dataBase/db.js";
import {
  EquipoInstalado,
  Equipo,
  Marca,
  Modelo,
  Estado,
  Reparaciones,
  Usuario,
  Locacion,
  TipoEquipo,
} from "../models/index.js";
import { UniqueConstraintError } from "sequelize";
import { deleteOldPhotos } from "../helpers/deleteOldPhotos.js";
import logger from "../helpers/logger.js";
import { log } from "console";
import { Chequeo, ChequeoDetalle, ChecklistItem } from "../models/index.js";

export async function createEquipoInstalado(req, res) {
  const { idEquipo, serie, oficina, observaciones, idEstado, idLocacion } =
    req.body;
  const fotos = req.files || [];
  const { esValido, errores } = validateEquipoInstalado({
    idEquipo,
    serie,
    oficina,
    observaciones,
    idEstado,
  });
  if (!esValido) {
    return res
      .status(400)
      .json({ error: "Validación fallida", detalles: errores });
  }

  const foto1Path = fotos[0] ? `/uploads/photos/${fotos[0].filename}` : null;
  const foto2Path = fotos[1] ? `/uploads/photos/${fotos[1].filename}` : null;

  try {
    const equipoExistente = await EquipoInstalado.findOne({
      where: {
        idEquipo,
        serie,
        oficina,
        flagHabilitado: true,
      },
    });

    if (equipoExistente) {
      return res.status(409).json({
        error: "Equipo existente",
        detalles:
          "Ya hay un equipo con esa combinación de serie, oficina e ID.",
      });
    }
    const nuevoEquipoInstalado = await EquipoInstalado.create({
      idEquipo,
      serie,
      oficina,
      observaciones,
      foto1Path,
      foto2Path,
      flagHabilitado: true,
      idEstado,
      idLocacion,
    });

    res.status(201).json({
      message: "Equipo instalado creado",
      id: nuevoEquipoInstalado.idEquipo,
      idEquipoInstalado: nuevoEquipoInstalado.idEquipoInstalado,
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      // Envía un error 409 (Conflict) y un mensaje claro al frontend
      logger.warn(`Intento de crear equipo con serie duplicada: ${serie}`);
      return res
        .status(409)
        .json({ error: "La serie ingresada ya existe en otro equipo." });
    }
    res.status(500).json({
      error: "No se pudo cargar el equipo en la oficina. Inténtelo de nuevo.",
    });
  }
}

export const getEquiposInstalados = async (req, res) => {
  try {
    const equipos = await EquipoInstalado.findAll({
      where: { flagHabilitado: true },
      include: [
        {
          model: Equipo,
          as: "equipo",
          include: [
            { model: Marca, as: "marca" },
            { model: Modelo, as: "modelo" },
            { model: TipoEquipo, as: "tipoEquipo" },
          ],
        },
        { model: Estado, as: "estado" },
        { model: Locacion, as: "locacion" },
        {
          model: Reparaciones,
          as: "reparaciones",
          required: false,
          include: [
            {
              model: Usuario,
              as: "tecnico",
              attributes: ["usuario"],
            },
          ],
        },
      ],
      order: [
        ["oficina", "asc"], // Ordena los equipos por fecha de creación
        [{ model: Reparaciones, as: "reparaciones" }, "createdAt", "DESC"],
        // Ordena las reparaciones de cada equipo por fecha de creación
      ],
    });

    res.json(equipos);
  } catch (err) {
    logger.error(`Error al obtener equipos instalados: ${err.message}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
/**********************************************************************************/

export const getEquipoInstaladoById = async (req, res) => {
  try {
    const equipo = await EquipoInstalado.findOne({
      where: { idEquipoInstalado: req.params.id, flagHabilitado: true },
      include: [
        {
          model: Equipo,
          as: "equipo",
          include: [
            { model: Marca, as: "marca" },
            { model: Modelo, as: "modelo" },
          ],
        },
        { model: Estado, as: "estado" },
        {
          model: Reparaciones,
          as: "reparaciones",
          required: false,
          include: [
            {
              model: Usuario,
              as: "tecnico",
              attributes: ["usuario"],
            },
          ],
        },
      ],
      order: [
        [{ model: Reparaciones, as: "reparaciones" }, "createdAt", "DESC"],
      ],
    });

    if (!equipo) {
      return res.status(404).json({ error: "Equipo no encontrado" });
    }

    res.json(equipo);
  } catch (err) {
    logger.error(`Error al obtener equipo por id: ${err.message}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
/**********************************************************************************/

export const aplicarAccion = async (req, res) => {
  const { idInstalacion, accion } = req.body;

  if (!idInstalacion || !accion) {
    return res
      .status(400)
      .json({ error: "Faltan parámetros: idInstalacion y/o acción" });
  }

  try {
    const equipo = await EquipoInstalado.findByPk(idInstalacion);

    if (!equipo) {
      return res.status(404).json({ error: "Equipo no encontrado" });
    }

    switch (accion) {
      case "Baja":
        equipo.estado = "Baja";
        equipo.flagHabilitado = false;
        equipo.deletedAt = new Date();
        await equipo.save();
        return res.json({ success: true, equipo });

      default:
        return res
          .status(400)
          .json({ error: `Acción no reconocida: ${accion}` });
    }
  } catch (err) {
    logger.error(`Error al aplicar acción: ${err.message}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const actualizarEstadoEquipo = async (req, res) => {
  const { id } = req.params;
  const { idEstado } = req.body;
  const { observaciones } = req.body;
  console.log("ID recibido:", id);
  console.log("ID Estado recibido:", idEstado);
  console.log("Observaciones recibidas:", observaciones);

  if (!idEstado) {
    return res.status(400).json({ error: "Falta el campo idEstado." });
  }

  try {
    const equipo = await EquipoInstalado.findByPk(id);
    if (!equipo) {
      return res.status(404).json({ error: "Equipo no encontrado." });
    }

    equipo.idEstado = idEstado;
    equipo.observaciones = observaciones;
    await equipo.save();

    res.status(200).json({ mensaje: "Estado actualizado correctamente." });
  } catch (error) {
    logger.error(`Error al actualizar estado: ${error.message}`);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
/*******************************************************************/

export const bajaEquiposInstalados = async (req, res) => {
  const { id } = req.params;
  const { motivo } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const equipo = await EquipoInstalado.findByPk(id, { transaction });

    if (!equipo) {
      await transaction.rollback();
      return res.status(404).json({ error: "Equipo no encontrado" });
    }

    // Actualiza el equipo
    equipo.flagHabilitado = false;
    equipo.observaciones = `Equipo dado de Baja: ${motivo}`;
    equipo.idEstado = 4; // Estado "Baja"
    await equipo.save({ transaction });

    // Actualiza las reparaciones asociadas al equipo
    await Reparaciones.update(
      { idTecnico: null },
      {
        where: { idEquipoInstalado: id },
        transaction,
      }
    );

    // Confirma la transacción
    await transaction.commit();

    res.json({
      message: "Equipo dado de baja y reparaciones actualizadas correctamente.",
    });
  } catch (err) {
    // Si hay un error, revierte todos los cambios
    await transaction.rollback();
    logger.error(`Error al dar de baja el equipo: ${err.message}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
/*********************************************************************** */

export const getEquipoPorOficina = async (req, res) => {
  try {
    const { oficina } = req.params;
    const equipo = await EquipoInstalado.findOne({
      where: { oficina, flagHabilitado: true },
      include: [
        {
          model: Equipo,
          as: "equipo",
          include: [
            { model: Marca, as: "marca" },
            { model: Modelo, as: "modelo" },
          ],
        },
        {
          model: Estado,
          as: "estado",
        },
      ],
    });

    if (!equipo)
      return res.status(404).json({ message: "Oficina no encontrada" });

    res.json(equipo);
  } catch (err) {
    logger.error(`Error al buscar oficina: ${err.message}`);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
/*********************************************************************** */

export const actualizarFotosEquipo = async (req, res) => {
  try {
    const { id } = req.params;
    const files = req.files || [];

    const equipo = await EquipoInstalado.findByPk(id);
    if (!equipo) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }

    // Si no hay fotos nuevas, no actualiza rutas ni elimina anteriores
    if (files.length === 0) {
      console.log(
        "No se recibieron fotos nuevas. Se mantiene el estado actual."
      );
      return res.json({
        message: "No se actualizaron fotos. Se mantuvieron las existentes.",
      });
    }

    // 🧹 Eliminar fotos anteriores
    deleteOldPhotos(equipo);

    // 📥 Guardar nuevas rutas
    const updateData = {};

    // Si hay al menos una foto
    if (files.length >= 1) {
      updateData.foto1Path = `/uploads/photos/${files[0].filename}`;
    }

    // Si hay dos fotos, actualizá la segunda
    if (files.length === 2) {
      updateData.foto2Path = `/uploads/photos/${files[1].filename}`;
    }

    // Si hay solo una, eliminá la segunda
    if (files.length === 1) {
      updateData.foto2Path = null;
    }
    await equipo.update(updateData);

    res.json({ message: "Fotos actualizadas correctamente" });
  } catch (err) {
    logger.error(`Error al actualizar fotos: ${err.message}`);
    res.status(500).json({ message: "Error al actualizar fotos" });
  }
};

/********************************************************************************** */
// controllers/EquipoInstaladoController.js
export const getPreventivoPlanilla = async (req, res) => {
  try {
    const { equipoId } = req.params;
    const { periodo } = req.query; // 👈 recibimos periodo por query

    // Traer todos los ítems del checklist
    const items = await ChecklistItem.findAll({
      attributes: ["id", "descripcion"],
      order: [["id", "ASC"]],
    });

    // Traer chequeos del equipo en el periodo
    const chequeos = await Chequeo.findAll({
      where: { equipoId, periodo },
      include: [
        {
          model: ChequeoDetalle,
          as: "detalles",
          include: [
            { model: ChecklistItem, as: "item", attributes: ["id", "descripcion"] },
          ],
        },
      ],
      order: [["fecha", "ASC"]],
    });

    // Si no hay chequeos, igual devolvemos todos los ítems vacíos
    if (!chequeos || chequeos.length === 0) {
      const planillaVacia = items.map(item => ({
        id: item.id,
        descripcion: item.descripcion,
        meses: [11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => ""),
      }));
      return res.json({ periodo, planilla: planillaVacia });
    }

    // Consolidar valores de chequeos
    const planillaMap = {};
    chequeos.forEach(ch => {
      ch.detalles.forEach(d => {
        if (!planillaMap[d.item.id]) {
          planillaMap[d.item.id] = {};
        }
        planillaMap[d.item.id][d.mes_aplicado] =
          d.estado === true ? "✔️" : d.estado === null && d.valor ? d.valor : "";
      });
    });

    // Construir planilla final con todos los ítems
    const meses = [11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const planillaFinal = items.map(item => ({
      id: item.id,
      descripcion: item.descripcion,
      meses: meses.map(m => planillaMap[item.id]?.[m] || ""),
    }));

    res.json({ periodo, planilla: planillaFinal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener planilla preventiva" });
  }
};