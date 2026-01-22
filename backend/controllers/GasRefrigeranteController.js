import GasRefrigerante from "../models/GasRefrigerante.js";
import logger from "../helpers/logger.js";

export const crearGasRefrigerante = async (req, res) => {
  try {
    const { gasRefrigerante } = req.body;
    const nuevoGasRefrigerante = await GasRefrigerante.create({
      gasRefrigerante,
    });
    res.status(201).json(nuevoGasRefrigerante);
  } catch (error) {
    logger.error(`Error al crear el gas refrigerante: ${error.message}`);
    res.status(500).json({ message: "Error al crear el gas refrigerante" });
  }
}