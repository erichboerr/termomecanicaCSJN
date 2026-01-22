import Alimentacion from "../models/Alimentacion.js";
import logger from "../helpers/logger.js";

export const crearAlimentacion = async (req, res) => {
  try {
    const { alimentacion } = req.body;
    const nuevaAlimentacion = await Alimentacion.create({
      alimentacion,
    });
    res.status(201).json(nuevaAlimentacion);
  } catch (error) {
    logger.error(`[crear alimentacion] POST | Usuario: ${req.user?.id || 'desconocido'} | Error: ${error.message}`);
    res.status(500).json({ message: "Error al crear la alimentacion" });
  }
};
