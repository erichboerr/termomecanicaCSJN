import Potencia from "../models/Potencia.js";
import logger from "../helpers/logger.js";

export const crearPotencia = async (req, res) => {
  try {
    const { potencia } = req.body;
    const nuevaPotencia = await Potencia.create({
      potencia,
    });
    res.status(201).json(nuevaPotencia);
  } catch (error) {
    logger.error(`Error al crear la potencia: ${error.message}`);
    res.status(500).json({ message: "Error al crear la potencia" });
  }
}