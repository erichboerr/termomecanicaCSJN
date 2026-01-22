import TipoEquipo from "../models/TipoEquipo.js";
import logger from "../helpers/logger.js";

export const crearTipoEquipo = async (req, res) => {
  try {
    const { tipoEquipo } = req.body;
    const nuevoTipoEquipo = await TipoEquipo.create({
      tipoEquipo,
    });
    res.status(201).json(nuevoTipoEquipo);
  } catch (error) {
    logger.error(`Error al crear tipo de equipo: ${error.message}`);
    res.status(500).json({ message: "Error al crear tipo de equipo" });
  }
}