import { Equipo } from "../models/index.js";
import { getCapacidadesPorModelo } from "../helpers/getCapacidadesPorModelo.js";
import logger from "../helpers/logger.js";

export async function createEquipo(req, res) {
  const {
    tipoEquipo,
    marca,
    modelo,
    alimentacion,
    potencia,
    capacidad,
    gasRefrigerante,
    idEstado,
  } = req.body;

  try {
    const equipoExistente = await Equipo.findOne({
      where: {
        idTipoEquipo: tipoEquipo,
        idMarca: marca,
        idModelo: modelo,
        idAlimentacion: alimentacion,
        idPotencia: potencia,
        idCapacidad: capacidad,
        idGasRefrigerante: gasRefrigerante,
        flagHabilitado: true,
      },
    });

    if (equipoExistente) {
      logger.warn(
        `Intento de crear equipo duplicado: ${JSON.stringify(req.body)}`
      );
      return res.status(409).json({
        error: "Equipo existente",
        detalles: "Ya hay un equipo con esa combinación de características.",
      });
    }
    const nuevoEquipo = await Equipo.create({
      idTipoEquipo: tipoEquipo,
      idMarca: marca,
      idModelo: modelo,
      idAlimentacion: alimentacion,
      idPotencia: potencia,
      idCapacidad: capacidad,
      idGasRefrigerante: gasRefrigerante,
      flagHabilitado: true,
      idEstado: idEstado,
    });

    res
      .status(201)
      .json({ message: "Equipo creado", id: nuevoEquipo.idEquipo });
  } catch (err) {
    logger.error(`Error al crear equipo: ${err.message}`);
    res.status(500).json({ error: "No se pudo crear el equipo" });
  }
}

export const buscarEquipoPorMarcaModelo = async (idMarca, idModelo) => {
  console.log("Buscando equipo con marca:", idMarca, "modelo:", idModelo);
  const equipo = await Equipo.findOne({
    where: {
      idMarca,
      idModelo,
    },
  });

  if (!equipo) throw new Error("Equipo no encontrado");
  return equipo.idEquipo;
};

export const buscarPorMarcaModelo = async (req, res) => {
  const { idMarca, idModelo } = req.query;

  if (!idMarca || !idModelo) {
    return res
      .status(400)
      .json({ error: "Faltan parámetros: idMarca y/o idModelo" });
  }

  try {
    const equipo = await Equipo.findOne({
      where: {
        idMarca,
        idModelo,
      },
      attributes: ["idEquipo"],
    });

    if (!equipo) {
      return res
        .status(404)
        .json({ error: "No se encontró equipo con esa marca y modelo" });
    }

    res.json({ idEquipo: equipo.idEquipo });
  } catch (err) {
    logger.error(`Error al buscar equipo por marca y modelo: ${err.message}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const obtenerCapacidadesPorModelo = async (req, res) => {
  const { idMarca, idModelo } = req.query;

  try {
    const capacidades = await getCapacidadesPorModelo({ idMarca, idModelo });
    
    if (!capacidades.length) {
      return res
        .status(404)
        .json({ error: "No se encontraron capacidades para ese modelo" });
    }

    res.json(capacidades);
  } catch (err) {
    logger.error(`Error al obtener capacidades: ${err.message}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
