import Marca from "../models/Marca.js";
import logger from "../helpers/logger.js";

export const crearMarca = async (req, res) => {
  try {
    const { marca } = req.body;
    const nuevaMarca = await Marca.create({
      marca,
    });
    res.status(201).json(nuevaMarca);
  } catch (error) {
    logger.error(`Error al crear la marca: ${error.message}`);
    res.status(500).json({ message: "Error al crear la marca" });
  }
}