import Modelo from "../models/Modelo.js";
import logger from "../helpers/logger.js";

export const crearModelo = async (req, res) => {
  try {
    const { modelo } = req.body;
    const nuevoModelo = await Modelo.create({
      modelo,
    });
    res.status(201).json(nuevoModelo);
  } catch (error) {
    logger.error(`Error al crear el modelo: ${error.message}`);
    res.status(500).json({ message: "Error al crear el modelo" });
  }
}

export const getModelos = async (req, res) => {
  try {
    const modelos = await Modelo.findAll({
      attributes: ['id', 'modelo', 'idMarca']
    });
    const modelosFormateados = modelos.map(m => ({
      id: m.id,
      value: m.modelo,
      idMarca: m.idMarca
    }));
    res.json(modelosFormateados);
  } catch (error) {
    logger.error(`Error al obtener los modelos: ${error.message}`);
    res.status(500).json({ message: "Error al obtener los modelos" });
  }
};