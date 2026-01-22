import Locacion from "../models/Locacion.js";
import logger from "../helpers/logger.js";

export const crearLocacion = async (req, res) => {
  try {
    const { locacion } = req.body;
    const nuevaLocacion = await Locacion.create({
      locacion,
    });
    res.status(201).json(nuevaLocacion);
  } catch (error) {
    logger.error(`Error al crear la locacion: ${error.message}`);
    res.status(500).json({ message: "Error al crear la locacion" });
  }
}