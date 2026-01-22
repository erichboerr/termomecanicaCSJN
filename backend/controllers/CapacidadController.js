import Capacidad from "../models/Capacidad.js";
import logger from '../helpers/logger.js';

export const crearCapacidad = async (req, res) => {
  try {
    const { capacidad } = req.body;
    const nuevaCapacidad = await Capacidad.create({
      capacidad,
    });
    res.status(201).json(nuevaCapacidad);
  } catch (error) {
    logger.error(`[crear capasidad] POST | Usuario: ${req.user?.id || 'desconocido'} | Error: ${error.message}`);
    res.status(500).json({ message: "Error al crear la capacidad" });
  }
}