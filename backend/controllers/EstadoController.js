import Equipo from "../models/Equipo.js";
import logger from "../helpers/logger.js";

export const buscarEstado = async (req, res) => {
  const { idEstado } = req.query;

  if (!idEstado) {
    return res.status(400).json({ error: "Falta el parámetro idEstado" });
  }

  try {
    const equipo = await Equipo.findOne({
      where: { idEstado },
      attributes: ["idEquipo"],
    });

    if (!equipo) {
      return res.status(404).json({ error: "Estado no encontrado" });
    }

    res.json({ idState: equipo.idEquipo });
  } catch (err) {
    logger.error(`Error al buscar estado: ${err.message}`); 
    res.status(500).json({ error: "Error interno del servidor" });
  }
};